// const hello = async (request, context) => {
//   var a = requ 
//   const path = context.geo?.country?.code === 'AU' ? '/edge/australia' : '/edge/not-australia';
//   return new URL(path, request.url);
// };

// // export const config = {
// //   path: '/edge'
// // };

// export default hello;



import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response("Hello, world!")
}

export const config: Config = {
  path: ["/cats", "/dogs"]
};