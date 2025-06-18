export const revalidate = 10; // ISR 每 60 秒重新生成组件

export default async function Timestamp() {
  const time = new Date().toLocaleString("zh-CN");
  return <div>渲染时间: {time}</div>;
}
