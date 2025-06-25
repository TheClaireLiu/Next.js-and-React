'use client';
//只会处理与此错误位于同一文件夹下的page.js中发生的错误，可以放在根目录下用来catch 任何错误。
export default function Error(){
  // 在globals.css中有设置error
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to create meal.</p>
    </main>
  );

}

