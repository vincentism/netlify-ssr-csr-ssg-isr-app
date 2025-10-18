// netlify/edge-functions/transform.ts
// @ts-ignore - Netlify Edge Functions types are available at runtime
import type { Context } from '@netlify/edge-functions';

const handler = async (request: Request, context: Context) => {
  console.log('✅ [Transform Middleware] 执行中...');
  
  // 获取下一个中间件/路由的响应
  const response = await context.next();
  
  // 修改响应头，添加转换信息
  response.headers.set('X-Transform-Middleware', 'executed');
  response.headers.set('X-Transform-Method', request.method);
  response.headers.set('X-Transform-Path', new URL(request.url).pathname);
  response.headers.set('X-Transform-Timestamp', new Date().toISOString());
  
  console.log('✅ [Transform Middleware] 已添加响应头');
  
  return response;
};

export default handler;