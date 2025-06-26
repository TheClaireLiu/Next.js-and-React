// lib/meals.ts

import sql from 'better-sqlite3';
import slugify from "slugify";
import xss from "xss";
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({ region: 'us-east-1' });
const db = sql('meals.db');

export type NewMeal = {
  title: string;
  image: File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export type StoredMeal = {
  id: number;
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export async function getMeals(): Promise<StoredMeal[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare('SELECT * FROM meals').all() as StoredMeal[];
}

export function getMeal(slug: string): StoredMeal {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as StoredMeal;
}

export async function saveMeal(meal: NewMeal): Promise<void> {
  const slug = slugify(meal.title, { lower: true, strict: true });
  const extension = meal.image.name.split('.').pop();
  const fileName = `${slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: 'claire-nextjs-demo-users-image',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  db.prepare(`
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `).run({
    ...meal,
    instructions: xss(meal.instructions), //  清洗一次
    image: fileName,
    slug,
  });
}