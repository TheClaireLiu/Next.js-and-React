import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from "slugify";
import xss from "xss";
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  region: 'us-east-1'
});
const db = sql('meals.db');

export async function getMeals(){
  await new Promise((resolve) => setTimeout(resolve,2000));
  // throw new Error('Loading meals failed.')
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug){
  return db.prepare('select * from meals where slug = ?').get(slug);
}

export async function saveMeal(meal){
  // 1️⃣ 生成 slug，用于命名图片文件和 URL
  meal.slug = slugify(meal.title, {lower: true});
  // 2️⃣ 清洗用户输入，防止 XSS
  meal.instructions = xss(meal.instructions);
  // 3️⃣ 提取图片文件扩展名
  const extension = meal.image.name.split('.').pop(); //it will pop file extension

  // 4️⃣ 构造最终保存的文件名
  const cleanSlug = slugify(meal.title, { lower: true, strict: true }); // ✅ 严格清洗
  const fileName = `${cleanSlug}.${extension}`; // 不会出现 decilious!.png 了
  const filePath = `public/images/${fileName}`; // ✅ 添加这一行，filePath 就有值了

  // const fileName = `${meal.slug}.${extension}`

  // 5️⃣ 创建可写入的文件流，准备把图片写入 public/images 目录
  //create a stream to allow us to write data to a certain file.
  // const stream = fs.createWriteStream(filePath);
  // 6️⃣ 把上传的图片转换成 buffer
  const bufferedImage = await meal.image.arrayBuffer();// arrayBuffer will give you a promise, that eventually resolves to that buffer 最终解析到该缓冲区的promise

  // ✅ 上传到 S3
  await s3.putObject({
    Bucket: 'claire-nextjs-demo-users-image', // ← 你的 bucket 名字
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });
  meal.image = fileName;

  // await new Promise((resolve, reject) => {
  //   const stream = fs.createWriteStream(filePath); // ✅ 使用 filePath
  //
  //   stream.write(Buffer.from(bufferedImage), (error) => {
  //     if (error) {
  //       reject(new Error("Save image failed!"));
  //       return;
  //     }
  //     stream.end();
  //   });
  //
  //   stream.on("finish", () => resolve());
  //   stream.on("error", (err) => reject(err));
  // });
  // // 更新 meal 对象中的 image 字段为图片的相对路径，用于后续数据库插入
  // meal.image = `/images/${fileName}`;

  db.prepare(`
    INSERT INTO meals
      (title,summary,instructions,creator,creator_email,image,slug)
    VALUES (    
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug        
    )
  `).run(meal);

  // await saveMeal();
}