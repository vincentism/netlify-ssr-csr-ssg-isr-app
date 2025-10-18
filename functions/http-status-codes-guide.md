# HTTP 状态码设计规范 - Netlify Functions 异常处理

## 概述
本文档定义了在 Netlify Functions 中处理各种异常情况时应该使用的 HTTP 状态码规范，确保 API 的一致性和可预测性。

## 状态码分类

### 2xx 成功状态码

#### 200 OK
- **用途**: 请求成功处理
- **场景**: 正常完成所有操作
- **示例**: 超时测试成功完成

```json
{
  "status": 200,
  "message": "超时测试完成: short",
  "executionTime": 5000,
  "success": true
}
```

#### 202 Accepted
- **用途**: 请求已接受，但处理尚未完成
- **场景**: 后台任务已启动，异步处理中
- **示例**: 后台函数已启动

```json
{
  "status": 202,
  "message": "后台任务已启动，将在20秒后完成",
  "taskId": "task-123",
  "estimatedCompletion": "2024-01-01T12:00:00Z"
}
```

### 4xx 客户端错误状态码

#### 400 Bad Request
- **用途**: 请求参数错误
- **场景**: 
  - 无效的测试类型
  - 超时参数超出范围
  - 请求格式错误

```json
{
  "status": 400,
  "error": "INVALID_PARAMETER",
  "message": "无效的测试类型: invalid_type",
  "validTypes": ["short", "medium", "long", "extreme", "custom"]
}
```

#### 401 Unauthorized
- **用途**: 未授权访问
- **场景**: 
  - 缺少认证信息
  - 认证令牌无效
  - 权限不足

```json
{
  "status": 401,
  "error": "UNAUTHORIZED",
  "message": "需要有效的认证令牌"
}
```

#### 403 Forbidden
- **用途**: 禁止访问
- **场景**: 
  - 访问被拒绝
  - 资源不可用
  - 操作被限制

```json
{
  "status": 403,
  "error": "FORBIDDEN",
  "message": "当前计划不支持此操作"
}
```

#### 404 Not Found
- **用途**: 资源未找到
- **场景**: 
  - 函数路径不存在
  - 测试类型不存在
  - 资源已被删除

```json
{
  "status": 404,
  "error": "NOT_FOUND",
  "message": "测试类型 'nonexistent' 不存在"
}
```

#### 408 Request Timeout
- **用途**: 请求超时
- **场景**: 
  - 客户端请求超时
  - 连接超时
  - 读取超时

```json
{
  "status": 408,
  "error": "REQUEST_TIMEOUT",
  "message": "请求超时，请重试"
}
```

#### 413 Payload Too Large
- **用途**: 请求体过大
- **场景**: 
  - 请求数据超过限制
  - 文件上传过大
  - 参数过多

```json
{
  "status": 413,
  "error": "PAYLOAD_TOO_LARGE",
  "message": "请求数据超过6MB限制"
}
```

#### 429 Too Many Requests
- **用途**: 请求过于频繁
- **场景**: 
  - 速率限制
  - 并发限制
  - 配额超限

```json
{
  "status": 429,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "请求过于频繁，请稍后重试",
  "retryAfter": 60
}
```

### 5xx 服务器错误状态码

#### 500 Internal Server Error
- **用途**: 服务器内部错误
- **场景**: 
  - 未预期的异常
  - 代码执行错误
  - 系统错误

```json
{
  "status": 500,
  "error": "INTERNAL_SERVER_ERROR",
  "message": "服务器内部错误",
  "requestId": "req-123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### 502 Bad Gateway
- **用途**: 网关错误
- **场景**: 
  - 上游服务不可用
  - 代理错误
  - 网络连接问题

```json
{
  "status": 502,
  "error": "BAD_GATEWAY",
  "message": "上游服务暂时不可用"
}
```

#### 503 Service Unavailable
- **用途**: 服务不可用
- **场景**: 
  - 服务维护中
  - 临时过载
  - 计划限制

```json
{
  "status": 503,
  "error": "SERVICE_UNAVAILABLE",
  "message": "服务暂时不可用，请稍后重试",
  "retryAfter": 300
}
```

#### 504 Gateway Timeout
- **用途**: 网关超时
- **场景**: 
  - 上游服务超时
  - 代理超时
  - 网络超时

```json
{
  "status": 504,
  "error": "GATEWAY_TIMEOUT",
  "message": "上游服务响应超时"
}
```

## Netlify Functions 特定状态码

### 超时相关状态码

#### 524 Timeout Occurred
- **用途**: Netlify 特定的超时错误
- **场景**: 函数执行超时
- **说明**: Netlify 平台返回的状态码

```json
{
  "status": 524,
  "error": "FUNCTION_TIMEOUT",
  "message": "函数执行超时",
  "timeoutLimit": 10000,
  "executionTime": 10000
}
```

### 资源限制状态码

#### 507 Insufficient Storage
- **用途**: 存储空间不足
- **场景**: 
  - 内存使用超限
  - 磁盘空间不足
  - 临时文件过多

```json
{
  "status": 507,
  "error": "INSUFFICIENT_STORAGE",
  "message": "内存使用超限",
  "memoryUsage": "1024MB",
  "limit": "1024MB"
}
```

## 错误响应格式规范

### 标准错误响应结构

```json
{
  "status": 400,
  "error": "ERROR_CODE",
  "message": "用户友好的错误描述",
  "details": {
    "field": "具体字段信息",
    "value": "问题值"
  },
  "requestId": "req-123456",
  "timestamp": "2024-01-01T12:00:00Z",
  "path": "/api/endpoint",
  "method": "GET"
}
```

### 错误代码命名规范

#### 格式: `CATEGORY_SUBJECT_ACTION`

- **CATEGORY**: 错误类别 (VALIDATION, AUTH, RESOURCE, SYSTEM)
- **SUBJECT**: 错误主体 (PARAMETER, TOKEN, MEMORY, TIMEOUT)
- **ACTION**: 错误动作 (INVALID, EXPIRED, EXCEEDED, MISSING)

#### 示例错误代码

```javascript
const ERROR_CODES = {
  // 验证错误
  VALIDATION_PARAMETER_INVALID: 'VALIDATION_PARAMETER_INVALID',
  VALIDATION_PARAMETER_MISSING: 'VALIDATION_PARAMETER_MISSING',
  VALIDATION_PARAMETER_OUT_OF_RANGE: 'VALIDATION_PARAMETER_OUT_OF_RANGE',
  
  // 认证错误
  AUTH_TOKEN_MISSING: 'AUTH_TOKEN_MISSING',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  
  // 资源错误
  RESOURCE_MEMORY_EXCEEDED: 'RESOURCE_MEMORY_EXCEEDED',
  RESOURCE_TIMEOUT_EXCEEDED: 'RESOURCE_TIMEOUT_EXCEEDED',
  RESOURCE_QUOTA_EXCEEDED: 'RESOURCE_QUOTA_EXCEEDED',
  
  // 系统错误
  SYSTEM_INTERNAL_ERROR: 'SYSTEM_INTERNAL_ERROR',
  SYSTEM_SERVICE_UNAVAILABLE: 'SYSTEM_SERVICE_UNAVAILABLE',
  SYSTEM_MAINTENANCE: 'SYSTEM_MAINTENANCE'
};
```

## 状态码选择决策树

```
请求开始
    ↓
是否有参数错误？
    ↓ 是
400 Bad Request
    ↓ 否
是否认证失败？
    ↓ 是
401 Unauthorized
    ↓ 否
是否有权限问题？
    ↓ 是
403 Forbidden
    ↓ 否
资源是否存在？
    ↓ 否
404 Not Found
    ↓ 是
是否请求超时？
    ↓ 是
408 Request Timeout
    ↓ 否
是否负载过大？
    ↓ 是
413 Payload Too Large
    ↓ 否
是否频率限制？
    ↓ 是
429 Too Many Requests
    ↓ 否
是否函数超时？
    ↓ 是
524 Timeout Occurred
    ↓ 否
是否资源限制？
    ↓ 是
507 Insufficient Storage
    ↓ 否
是否有系统错误？
    ↓ 是
500 Internal Server Error
    ↓ 否
200 OK
```

## 最佳实践

### 1. 状态码一致性
- 相同类型的错误使用相同的状态码
- 避免混用相似的状态码
- 保持状态码的语义清晰

### 2. 错误信息设计
- 提供用户友好的错误描述
- 包含必要的技术细节
- 避免暴露敏感信息

### 3. 错误处理
- 实现全局错误处理中间件
- 记录详细的错误日志
- 提供错误追踪ID

### 4. 客户端处理
- 根据状态码进行相应处理
- 实现重试机制
- 提供用户友好的错误提示

### 5. 监控和告警
- 监控不同状态码的出现频率
- 设置异常状态码的告警
- 分析错误趋势和模式

## 示例实现

### 错误处理中间件

```javascript
const createErrorResponse = (status, errorCode, message, details = {}) => {
  return new Response(JSON.stringify({
    status,
    error: errorCode,
    message,
    details,
    requestId: context.requestId,
    timestamp: new Date().toISOString()
  }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Error-Code': errorCode
    }
  });
};

// 使用示例
if (!testType || !VALID_TEST_TYPES.includes(testType)) {
  return createErrorResponse(
    400,
    'VALIDATION_PARAMETER_INVALID',
    '无效的测试类型',
    { validTypes: VALID_TEST_TYPES }
  );
}
```

这个状态码设计规范确保了 API 的一致性和可预测性，帮助开发者和用户更好地理解和处理各种异常情况。
