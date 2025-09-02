// app/isr2/[id]/page.tsx
import { sleep } from "@/lib/utils"

export const revalidate = 60

export default async function Post({ params }: { params: { id: string } }) {
  const response = await fetch('http://playvideo.vodplayvideo.net/getplayinfo/v4/1306264703/243791576943072647?psign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMwNjI2NDcwMywiZmlsZUlkIjoiMjQzNzkxNTc2OTQzMDcyNjQ3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY3MDQ2OTk3MSwiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJQcm90ZWN0ZWRBZGFwdGl2ZSIsImRybUFkYXB0aXZlSW5mbyI6eyJwcml2YXRlRW5jcnlwdGlvbkRlZmluaXRpb24iOjEyfX0sInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTMwNjI2NDcwMy52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.FOcmChHfrGY9tYCDn20MSQi-IqvQ9U_U6qLNgx9MhLg&cipheredOverlayKey=3519690ca80be6a27f0bd21d87b64b081b43769a7298f19a017a36a7173850bef262ddf3d1725c0a544d3186a079f489c31c41d9f004a523d22587c69b1c4aa1ee832d583afa9eb2ad08d5d871d54b185601f6217ce8ee8ca2d9e88d47c102a7f8cce1e07f74793a1b1edf2ef20b4f6c195467fd54afa2cb6560b6223c2b3afb&cipheredOverlayIv=181ef82265cee43d4b4fae5cf84c0b2f6606cde26e8c29f4ce55851102f29d8b87bb701ae18336d2749a901c554d186cbf9908f40b695cba5140f116dbbfeb7cb4da74f909df2607ddf1b65bb0120fc91bbe095e77df9da4850df0b96fe400e1e4b2e62321ac2005765832784d5f8b4beba2405095263e50b2d90ce5f15db6ae&keyId=1', {
    next: { tags: ['posts'] },
  });


  await sleep(3000, 5000);

  const posts = await response.json();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ISR 页面 - {params.id}</h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">API 数据:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(posts, null, 2)}
        </pre>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>页面 ID: {params.id}</p>
        <p>重新验证时间: 60秒</p>
        <p>生成时间: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}

// 预生成 isrid1 和 isrid2 两个页面
export async function generateStaticParams() {
  return [
    { id: 'isrid1' }, // 预生成 ID 为 isrid1 的页面
    { id: 'isrid2' }, // 预生成 ID 为 isrid2 的页面
  ];
}

// // 生成页面元数据
// export async function generateMetadata({ params }: { params: { id: string } }) {
//   return { 
//     title: `ISR 页面 ${params.id}`,
//     description: `这是预生成的 ISR 页面 ${params.id}`
//   };
// } 