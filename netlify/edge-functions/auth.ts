// netlify/edge-functions/auth.ts
// @ts-ignore - Netlify Edge Functions types are available at runtime
import type { Context } from '@netlify/edge-functions';

const handler = async (request: Request, context: Context) => {
  console.log('✅ [Auth Middleware] 执行中...');
  
  const token = request.headers.get('Authorization');
  
  // 获取下一个中间件/路由的响应
  const response = await context.next();
  
  // 修改响应头，添加认证信息
  response.headers.set('X-Auth-Middleware', 'executed');
  response.headers.set('X-Auth-Token', token || 'none');
  response.headers.set('X-Auth-Timestamp', new Date().toISOString());
  
  console.log('✅ [Auth Middleware] 已添加响应头');
  
  return response;
};

export default handler;