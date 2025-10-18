# Netlify Edge Functions 路径配置详解

## 三种路径匹配策略

### 方式1: 匹配所有路径（包括静态资源）

```toml
[[edge_functions]]
  function = "auth"
  path = "/*"                 # 匹配所有请求
```

**影响范围**：
- ✅ HTML 页面：`/`, `/about`, `/blog/post-1`
- ✅ API 路由：`/api/users`, `/api/posts`
- ✅ 静态资源：`/images/logo.png`, `/styles/main.css`
- ✅ Next.js 资源：`/_next/static/...`, `/_next/image/...`
- ✅ 所有其他文件

**适用场景**：
- 全局安全策略（CORS、CSP headers）
- 全局分析和监控
- 请求日志记录
- A/B 测试和特性开关

**⚠️ 注意事项**：
- 会增加静态资源的响应时间（每个请求都经过中间件）
- 需要确保中间件性能足够好
- 可能影响缓存策略

---

### 方式2: 只匹配特定路径

```toml
[[edge_functions]]
  function = "auth"
  path = "/api/*"             # 只匹配 API 路径
```

**影响范围**：
- ✅ API 路由：`/api/users`, `/api/posts/123`
- ❌ HTML 页面：不匹配
- ❌ 静态资源：不匹配

**其他常见路径模式**：

```toml
# 只处理特定路径
path = "/admin/*"           # 管理后台
path = "/dashboard/*"       # 用户面板
path = "/protected/*"       # 受保护的路径

# 精确匹配
path = "/login"             # 只匹配登录页

# 多段路径
path = "/api/v2/*"          # API v2版本
```

**适用场景**：
- API 认证和授权
- 特定功能的中间件
- 性能敏感的应用（避免不必要的中间件执行）

---

### 方式3: 排除特定路径（推荐）⭐

```toml
[[edge_functions]]
  function = "auth"
  path = "/*"
  excluded_path = "/_next/*"  # 排除 Next.js 静态资源
```

**排除多个路径**：

```toml
[[edge_functions]]
  function = "auth"
  path = "/*"
  excluded_path = [
    "/_next/*",               # Next.js 静态资源
    "/static/*",              # 静态文件目录
    "/images/*",              # 图片
    "/favicon.ico",           # 网站图标
    "*.css",                  # CSS 文件
    "*.js",                   # JavaScript 文件（构建产物）
    "*.woff*",                # 字体文件
  ]
```

**适用场景**：
- 需要全局中间件，但要排除静态资源
- 在性能和功能之间取得平衡
- 复杂的路径控制需求

---

## 实际配置示例

### 示例1: 全局安全 Headers（包括静态资源）

```toml
[[edge_functions]]
  function = "security-headers"
  path = "/*"
```

```typescript
// netlify/edge-functions/security-headers.ts
export default async (request: Request, context: Context) => {
  const response = await context.next();
  
  // 所有响应都添加安全 headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
};
```

---

### 示例2: API 认证 + 静态资源性能优化

```toml
# 认证中间件：只处理 API
[[edge_functions]]
  function = "auth"
  path = "/api/*"

# 安全 headers：处理所有 HTML，排除静态资源
[[edge_functions]]
  function = "security"
  path = "/*"
  excluded_path = [
    "/_next/*",
    "/static/*",
    "/images/*",
    "*.css",
    "*.js",
    "*.png",
    "*.jpg",
    "*.svg",
    "*.woff*"
  ]
```

---

### 示例3: 分层中间件（推荐架构）

```toml
# 1. 日志记录：所有请求（包括静态资源）
[[edge_functions]]
  function = "logging"
  path = "/*"

# 2. 认证：只处理需要认证的路径
[[edge_functions]]
  function = "auth"
  path = "/api/*"

# 3. 数据转换：只处理 API 响应
[[edge_functions]]
  function = "transform"
  path = "/api/*"
```

**执行流程**：

```
静态资源请求 (/images/logo.png):
  → logging.ts (记录日志)
  → 直接返回静态文件

API 请求 (/api/users):
  → logging.ts (记录日志)
  → auth.ts (认证)
  → transform.ts (转换)
  → API 处理器
```

---

## 路径匹配规则详解

### 通配符 `*`

```toml
path = "/api/*"
```

- 匹配：`/api/users`, `/api/posts/123`, `/api/v2/users`
- 不匹配：`/api`（没有后续路径）

### 精确匹配

```toml
path = "/login"
```

- 匹配：`/login`
- 不匹配：`/login/`, `/login/callback`

### 多段匹配

```toml
path = "/admin/*/settings"
```

- 匹配：`/admin/users/settings`, `/admin/posts/settings`
- 不匹配：`/admin/settings`（缺少中间段）

---

## 性能优化建议

### 1. 按需匹配，避免过度覆盖

```toml
❌ 不推荐：所有静态资源都经过中间件
[[edge_functions]]
  function = "auth"
  path = "/*"

✅ 推荐：只处理需要的路径
[[edge_functions]]
  function = "auth"
  path = "/api/*"
```

### 2. 使用排除路径优化性能

```toml
✅ 推荐：排除静态资源
[[edge_functions]]
  function = "global-middleware"
  path = "/*"
  excluded_path = [
    "/_next/*",
    "/static/*",
    "*.css",
    "*.js",
    "*.png",
    "*.jpg",
    "*.svg"
  ]
```

### 3. 轻量化静态资源处理

如果必须处理静态资源，保持中间件极简：

```typescript
export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // 静态资源快速通过
  if (url.pathname.startsWith('/_next/') || 
      url.pathname.startsWith('/static/')) {
    return context.next();  // 直接返回，不做额外处理
  }
  
  // 其他请求的复杂逻辑
  // ...
};
```

---

## 调试和验证

### 1. 查看哪些路径被匹配

```bash
# 测试不同路径
curl -I https://your-site.netlify.app/
curl -I https://your-site.netlify.app/api/hello
curl -I https://your-site.netlify.app/_next/static/css/app.css
curl -I https://your-site.netlify.app/images/logo.png
```

### 2. 检查响应头

所有经过中间件的请求都应该有相应的自定义 header：

```
# 经过 auth 中间件
X-Auth-Middleware: executed

# 经过 transform 中间件
X-Transform-Middleware: executed
```

### 3. 查看执行日志

在 Netlify 控制台的 Functions 日志中：

```
✅ [Auth Middleware] 执行中...    # 说明该请求被匹配
```

---

## 常见问题

### Q1: 静态资源为什么要经过中间件？

**场景1：全局安全 Headers**
```typescript
// 所有响应（包括静态资源）都需要安全 headers
response.headers.set('X-Frame-Options', 'DENY');
response.headers.set('Content-Security-Policy', '...');
```

**场景2：访问控制**
```typescript
// 某些静态文件需要认证才能访问
if (url.pathname.startsWith('/protected-docs/')) {
  const isAuthorized = checkAuth(request);
  if (!isAuthorized) {
    return new Response('Forbidden', { status: 403 });
  }
}
```

**场景3：流量分析**
```typescript
// 记录所有资源的访问情况
logAccess({
  path: url.pathname,
  type: getResourceType(url.pathname),
  userAgent: request.headers.get('user-agent')
});
```

### Q2: 如何平衡功能和性能？

**推荐策略**：

1. **分层设计**：
   - 日志中间件：`/*`（轻量，影响小）
   - 认证中间件：`/api/*`（只处理需要的）
   - 业务逻辑：特定路径

2. **使用排除路径**：
   ```toml
   path = "/*"
   excluded_path = ["/_next/*", "/static/*"]
   ```

3. **中间件内部判断**：
   ```typescript
   if (isStaticResource(url)) {
     return context.next();  // 快速返回
   }
   ```

### Q3: 排除路径的优先级？

```toml
[[edge_functions]]
  function = "middleware"
  path = "/api/*"
  excluded_path = "/api/public/*"
```

- ✅ `/api/users` → 匹配（符合 path）
- ❌ `/api/public/status` → 不匹配（被排除）
- ❌ `/home` → 不匹配（不符合 path）

**规则**：`excluded_path` 优先级高于 `path`

---

## 推荐配置模板

### 模板1: 纯 API 应用

```toml
[[edge_functions]]
  function = "cors"
  path = "/api/*"

[[edge_functions]]
  function = "auth"
  path = "/api/*"

[[edge_functions]]
  function = "rate-limit"
  path = "/api/*"
```

### 模板2: 全栈应用（带静态资源）

```toml
# 全局：安全 headers（排除静态资源）
[[edge_functions]]
  function = "security"
  path = "/*"
  excluded_path = ["/_next/*", "/static/*", "*.css", "*.js"]

# API：认证和业务逻辑
[[edge_functions]]
  function = "auth"
  path = "/api/*"
```

### 模板3: 复杂多租户应用

```toml
# 租户识别：所有请求
[[edge_functions]]
  function = "tenant-resolver"
  path = "/*"

# 租户权限：排除公共资源
[[edge_functions]]
  function = "tenant-auth"
  path = "/*"
  excluded_path = ["/public/*", "/_next/*", "/login"]

# API 处理
[[edge_functions]]
  function = "api-handler"
  path = "/api/*"
```

---

**总结**：

- 🎯 **默认推荐**：`path = "/*"` + `excluded_path` 排除静态资源
- ⚡ **性能优先**：`path = "/api/*"` 只处理必要路径
- 🔒 **安全优先**：`path = "/*"` 全覆盖（接受性能损耗）

根据您的实际需求选择合适的配置！🚀

