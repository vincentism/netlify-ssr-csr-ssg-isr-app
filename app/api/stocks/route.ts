
import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache'

// 移除 edge runtime，使用默认的 Node.js runtime
// export const runtime = 'edge';

// var path = require("path");
// var fs = require("fs");
// console.log('fs.readdir', __dirname, fs.readdir);
// var pathName = __dirname;
// var dirsList = [];
// fs.readdir(pathName, function(err, files){
//     var dirs = [];
//     (function iterator(i){
//       if(i == files.length) {
//         console.log(dirs);
//         dirsList = dirs;
//         return ;
//       }
//       fs.stat(path.join(pathName, files[i]), function(err, data){     
//         if(data.isFile()){               
//             dirs.push(files[i]);
//         }
//         iterator(i+1);
//        });   
//     })(0);
// });

// let count = 1;
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // const response = await fetch('https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=sz002095&scale=60&ma=no&datalen=2', {
  const response = await fetch('http://playvideo.vodplayvideo.net/getplayinfo/v4/1306264703/243791576943072647?psign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTMwNjI2NDcwMywiZmlsZUlkIjoiMjQzNzkxNTc2OTQzMDcyNjQ3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY3MDQ2OTk3MSwiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJQcm90ZWN0ZWRBZGFwdGl2ZSIsImRybUFkYXB0aXZlSW5mbyI6eyJwcml2YXRlRW5jcnlwdGlvbkRlZmluaXRpb24iOjEyfX0sInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTMwNjI2NDcwMy52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.FOcmChHfrGY9tYCDn20MSQi-IqvQ9U_U6qLNgx9MhLg&cipheredOverlayKey=3519690ca80be6a27f0bd21d87b64b081b43769a7298f19a017a36a7173850bef262ddf3d1725c0a544d3186a079f489c31c41d9f004a523d22587c69b1c4aa1ee832d583afa9eb2ad08d5d871d54b185601f6217ce8ee8ca2d9e88d47c102a7f8cce1e07f74793a1b1edf2ef20b4f6c195467fd54afa2cb6560b6223c2b3afb&cipheredOverlayIv=181ef82265cee43d4b4fae5cf84c0b2f6606cde26e8c29f4ce55851102f29d8b87bb701ae18336d2749a901c554d186cbf9908f40b695cba5140f116dbbfeb7cb4da74f909df2607ddf1b65bb0120fc91bbe095e77df9da4850df0b96fe400e1e4b2e62321ac2005765832784d5f8b4beba2405095263e50b2d90ce5f15db6ae&keyId=1', {
      next: { tags: ['posts'] },
  });

  const data = await response.json();
  console.log('ddd1', JSON.stringify(revalidatePath));
  
  // 重新验证 ISR 页面
  revalidatePath('/isr')
  revalidatePath('/isr2/[id]')
  // revalidatePath('/a/b/c')
  // revalidatePath('/a/1')
  // revalidatePath('/a?a=1')
  // revalidatePath('/data-center')
  // revalidatePath('/data_center')
  
  // revalidateTag('posts')

  // const id = (await params).id;
  // e.g. Query a database for user with ID `id`
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}