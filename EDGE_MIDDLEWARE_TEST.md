# Netlify Edge Functions 链式调用测试说明

## 配置概览

根据 `netlify.toml` 配置，对 `/api/*` 路径设置了两个 Edge Functions：

```toml
[[edge_functions]]
  function = "auth"           # 第1个中间件
  path = "/api/*"

[[edge_functions]]
  function = "transform"      # 第2个中间件
  path = "/api/*"
```

## 执行顺序

```
请求 /api/* 
    ↓
1. auth.ts (添加认证相关 headers)
    ↓
2. transform.ts (添加转换相关 headers)
    ↓
3. 实际的 API 路由
    ↓
返回响应（包含所有中间件添加的 headers）
```

## 测试方法

### 1. 部署到 Netlify

```bash
# 如果还没有安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod
```

### 2. 测试请求

部署成功后，访问任意 API 路径，例如：

```bash
# 方式1：使用 curl（推荐，可以看到响应头）
curl -I https://your-site.netlify.app/api/hello

# 方式2：带 Authorization header
curl -I -H "Authorization: Bearer test-token-123" https://your-site.netlify.app/api/hello

# 方式3：使用浏览器开发者工具
# 打开 https://your-site.netlify.app/api/hello
# F12 → Network → 查看响应头
```

### 3. 预期响应头

如果链式调用成功，您应该看到以下响应头：

```
✅ 来自 auth.ts 的 headers：
X-Auth-Middleware: executed
X-Auth-Token: Bearer test-token-123  (如果提供了 token)
X-Auth-Timestamp: 2025-10-13T10:30:00.000Z

✅ 来自 transform.ts 的 headers：
X-Transform-Middleware: executed
X-Transform-Method: GET
X-Transform-Path: /api/hello
X-Transform-Timestamp: 2025-10-13T10:30:00.001Z
```

### 4. 查看日志

在 Netlify 控制台查看实时日志：

```
✅ [Auth Middleware] 执行中...
✅ [Auth Middleware] 已添加响应头
✅ [Transform Middleware] 执行中...
✅ [Transform Middleware] 已添加响应头
```

## 验证要点

1. **执行顺序**：auth → transform（按 netlify.toml 中的声明顺序）
2. **响应头累积**：两个中间件的 headers 都应该存在
3. **时间戳**：transform 的时间戳应该略晚于 auth

## 修改测试

### 测试执行顺序

您可以调换 netlify.toml 中的顺序：

```toml
# 调换顺序
[[edge_functions]]
  function = "transform"      # 现在先执行
  path = "/api/*"

[[edge_functions]]
  function = "auth"           # 后执行
  path = "/api/*"
```

重新部署后，时间戳的顺序应该反过来。

### 测试中断链条

修改 `auth.ts`，添加条件返回：

```typescript
export default async (request: Request, context: Context) => {
  const token = request.headers.get('Authorization');
  
  // 如果没有 token，直接返回，不调用 next()
  if (!token) {
    return new Response('需要认证', { 
      status: 401,
      headers: { 'X-Auth-Middleware': 'blocked' }
    });
  }
  
  // 有 token，继续执行
  const response = await context.next();
  response.headers.set('X-Auth-Middleware', 'passed');
  return response;
}
```

这样没有 token 的请求就不会执行 transform.ts。

## 快速测试命令

```bash
# 测试1：不带 token（如果添加了拦截逻辑，会被拦截）
curl -I https://your-site.netlify.app/api/hello

# 测试2：带 token（应该看到所有 headers）
curl -I -H "Authorization: Bearer test123" https://your-site.netlify.app/api/hello

# 测试3：查看完整响应（包含 body 和 headers）
curl -v https://your-site.netlify.app/api/hello
```

## 故障排查

### 问题1：看不到自定义 headers

**可能原因**：
- Edge Functions 没有正确部署
- 路径不匹配
- CORS 限制

**解决方案**：
```bash
# 查看部署日志
netlify deploy --prod --debug

# 检查 Edge Functions 是否生效
netlify functions:list
```

### 问题2：只看到一个中间件的 headers

**可能原因**：
- 某个中间件返回了响应而没有调用 next()
- toml 配置有误

**解决方案**：
- 检查每个中间件是否都调用了 `context.next()`
- 确认 netlify.toml 中两个 edge_functions 都配置了相同的 path

## 成功标志

✅ 响应头中同时包含：
- `X-Auth-Middleware: executed`
- `X-Transform-Middleware: executed`

✅ 控制台日志显示两个中间件都执行了

✅ 时间戳显示正确的执行顺序

---

**祝测试顺利！** 🚀

