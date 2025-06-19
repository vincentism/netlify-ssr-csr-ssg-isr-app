// pages/posts/[id].js

export const revalidate = 10
export default async function Post(params) {
  const data = await fetch(`https://netlify-ssr-csr-ssg-isr-app.netlify.app/api/stockss`)
  const posts = await data.json()
  return (
    <div>
      <h1>test stocks</h1>
      <h1>{JSON.stringify(posts)}</h1>
    </div>
  );
}
// 替代 getStaticProps + ISR
export async function generateStaticParams() {
  return [
    { id: 'isrid1' }, // 预生成 ID 为 1 的页面
    { id: 'isrid2' }, // 预生成 ID 为 2 的页面
  ];
}

// 替代 getStaticProps
export async function generateMetadata({ params }) {
  // const post = await fetchPost(params.id);

  // console.log('post', post);

  return { title: 'test' };
}

// async function fetchPost(id) {
//   // 调用同项目的 API Route
//   const res = await fetch(`http://localhost:8888/api/stockss?id=${id}`); // 开发环境

//   // 生产环境用绝对路径或相对路径（`/api/post?id=${id}`）
//   const result = res.json();
//   // console.log('res', result);
//   return result;
// }

// 核心 ISR 配置
// export const dynamicParams = true; // 替代 fallback: true/blocking