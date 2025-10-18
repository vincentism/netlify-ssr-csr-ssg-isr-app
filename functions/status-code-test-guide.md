# HTTP 状态码测试指南 - Netlify Functions

## 概述
本指南提供了完整的 HTTP 状态码测试方案，用于验证 Netlify Functions 在各种异常情况下的状态码设计规范。

## 测试场景和预期状态码

### 1. 成功响应测试 (2xx)

#### 200 OK - 正常完成
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=short"
```
**预期响应**:
```json
{
  "status": 200,
  "message": "超时测试完成: short",
  "executionTime": 5000,
  "success": true,
  "requestId": "req-123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### 202 Accepted - 后台任务
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=background"
```
**预期响应**:
```json
{
  "status": 202,
  "message": "后台任务已启动，将在20秒后完成",
  "taskId": "task-1234567890",
  "requestId": "req-123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### 2. 客户端错误测试 (4xx)

#### 400 Bad Request - 参数错误
```bash
# 无效的测试类型
curl "https://your-site.netlify.app/.netlify/functions/hello?type=invalid_type"

# 缺少必需参数
curl "https://your-site.netlify.app/.netlify/functions/hello?type=custom"

# 无效的超时参数
curl "https://your-site.netlify.app/.netlify/functions/hello?type=custom&timeout=abc"
```
**预期响应**:
```json
{
  "status": 400,
  "error": "VALIDATION_PARAMETER_INVALID",
  "message": "无效的测试类型",
  "details": {
    "provided": "invalid_type",
    "validTypes": ["short", "medium", "long", "extreme", "custom", ...]
  },
  "requestId": "req-123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### 429 Too Many Requests - 速率限制
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=rate-limit"
```
**预期响应**:
```json
{
  "status": 429,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "请求过于频繁，请稍后重试",
  "details": {
    "retryAfter": 60
  },
  "requestId": "req-123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### 3. 服务器错误测试 (5xx)

#### 500 Internal Server Error - 内部错误
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=error"
```
**预期响应**:
```json
{
  "status": 500,
  "error": "SYSTEM_INTERNAL_ERROR",
  "message": "服务器内部错误",
  "details": {
    "executionTime": 5000,
    "testType": "error",
    "error": "模拟错误：在超时前抛出异常"
  },
  "requestId": "req-123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### 503 Service Unavailable - 维护模式
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?maintenance=true"
```
**预期响应**:
```json
{
  "status": 503,
  "error": "SYSTEM_MAINTENANCE",
  "message": "服务正在维护中，请稍后重试",
  "details": {
    "estimatedRecovery": "2024-01-01T12:00:00Z"
  },
  "requestId": "req-123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### 507 Insufficient Storage - 内存超限
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=memory"
```
**预期响应**:
```json
{
  "status": 507,
  "error": "RESOURCE_MEMORY_EXCEEDED",
  "message": "内存使用超限",
  "details": {
    "memoryUsage": "1024MB",
    "limit": "1024MB"
  },
  "requestId": "req-123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### 524 Timeout Occurred - 函数超时
```bash
# 免费计划超时测试
curl "https://your-site.netlify.app/.netlify/functions/hello?type=extreme"
```
**预期响应**:
```json
{
  "status": 524,
  "error": "RESOURCE_TIMEOUT_EXCEEDED",
  "message": "函数执行超时",
  "details": {
    "executionTime": 10000,
    "timeoutLimit": 10000,
    "testType": "extreme"
  },
  "requestId": "req-123",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## 自动化测试脚本

### 完整状态码测试脚本
```bash
#!/bin/bash

# 状态码测试脚本
BASE_URL="https://your-site.netlify.app/.netlify/functions/hello"

echo "🧪 HTTP 状态码测试开始"
echo "========================"

# 测试用例数组: "描述:类型:预期状态码"
declare -a tests=(
    "正常完成测试:short:200"
    "后台任务测试:background:202"
    "参数验证测试:validation:400"
    "速率限制测试:rate-limit:429"
    "内部错误测试:error:500"
    "维护模式测试:maintenance=true:503"
    "内存超限测试:memory:507"
    "超时测试:extreme:524"
)

for test in "${tests[@]}"; do
    IFS=':' read -r description type expected_status <<< "$test"
    
    echo ""
    echo "🔍 测试: $description"
    echo "类型: $type"
    echo "预期状态码: $expected_status"
    
    # 执行请求
    response=$(curl -s -w "\n%{http_code}" "$BASE_URL?type=$type")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n -1)
    
    # 验证状态码
    if [ "$http_code" = "$expected_status" ]; then
        echo "✅ 状态码正确: $http_code"
    else
        echo "❌ 状态码错误: 期望 $expected_status, 实际 $http_code"
    fi
    
    # 解析并显示错误代码
    error_code=$(echo "$body" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
    if [ ! -z "$error_code" ]; then
        echo "错误代码: $error_code"
    fi
    
    echo "响应: $body"
    echo "----------------------------------------"
done

echo ""
echo "📊 测试完成！"
```

### 状态码验证脚本
```bash
#!/bin/bash

# 状态码验证函数
validate_status_code() {
    local url=$1
    local expected_status=$2
    local test_name=$3
    
    echo "�� 测试: $test_name"
    echo "URL: $url"
    echo "预期状态码: $expected_status"
    
    response=$(curl -s -w "\n%{http_code}" "$url")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$http_code" = "$expected_status" ]; then
        echo "✅ 通过: 状态码 $http_code"
        return 0
    else
        echo "❌ 失败: 期望 $expected_status, 实际 $http_code"
        echo "响应: $body"
        return 1
    fi
}

BASE_URL="https://your-site.netlify.app/.netlify/functions/hello"

echo "🚀 开始状态码验证测试"
echo "======================"

# 成功响应测试
validate_status_code "$BASE_URL?type=short" "200" "短超时测试"
validate_status_code "$BASE_URL?type=background" "202" "后台任务测试"

# 客户端错误测试
validate_status_code "$BASE_URL?type=invalid" "400" "无效参数测试"
validate_status_code "$BASE_URL?type=custom" "400" "缺少参数测试"
validate_status_code "$BASE_URL?type=rate-limit" "429" "速率限制测试"

# 服务器错误测试
validate_status_code "$BASE_URL?type=error" "500" "内部错误测试"
validate_status_code "$BASE_URL?maintenance=true" "503" "维护模式测试"
validate_status_code "$BASE_URL?type=memory" "507" "内存超限测试"
validate_status_code "$BASE_URL?type=extreme" "524" "超时测试"

echo ""
echo "🎯 验证完成！"
```

## 响应头验证

### 检查响应头
```bash
# 检查错误代码头
curl -I "https://your-site.netlify.app/.netlify/functions/hello?type=validation"

# 预期响应头:
# HTTP/1.1 400 Bad Request
# Content-Type: application/json
# X-Error-Code: VALIDATION_PARAMETER_INVALID
# X-Request-ID: req-123456
```

### 响应头验证脚本
```bash
#!/bin/bash

BASE_URL="https://your-site.netlify.app/.netlify/functions/hello"

echo "🔍 响应头验证测试"
echo "=================="

# 检查错误响应头
echo "检查错误响应头..."
headers=$(curl -s -I "$BASE_URL?type=validation")

echo "响应头:"
echo "$headers"

# 验证关键头部
if echo "$headers" | grep -q "X-Error-Code"; then
    echo "✅ 包含错误代码头"
else
    echo "❌ 缺少错误代码头"
fi

if echo "$headers" | grep -q "X-Request-ID"; then
    echo "✅ 包含请求ID头"
else
    echo "❌ 缺少请求ID头"
fi

if echo "$headers" | grep -q "Content-Type: application/json"; then
    echo "✅ 内容类型正确"
else
    echo "❌ 内容类型错误"
fi
```

## 错误代码验证

### 错误代码测试
```bash
#!/bin/bash

BASE_URL="https://your-site.netlify.app/.netlify/functions/hello"

echo "🔍 错误代码验证测试"
echo "===================="

# 错误代码映射
declare -A error_codes=(
    ["validation"]="VALIDATION_PARAMETER_INVALID"
    ["rate-limit"]="RATE_LIMIT_EXCEEDED"
    ["error"]="SYSTEM_INTERNAL_ERROR"
    ["maintenance=true"]="SYSTEM_MAINTENANCE"
    ["memory"]="RESOURCE_MEMORY_EXCEEDED"
    ["extreme"]="RESOURCE_TIMEOUT_EXCEEDED"
)

for test_type in "${!error_codes[@]}"; do
    expected_code="${error_codes[$test_type]}"
    
    echo ""
    echo "🧪 测试类型: $test_type"
    echo "预期错误代码: $expected_code"
    
    response=$(curl -s "$BASE_URL?type=$test_type")
    actual_code=$(echo "$response" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
    
    if [ "$actual_code" = "$expected_code" ]; then
        echo "✅ 错误代码正确: $actual_code"
    else
        echo "❌ 错误代码错误: 期望 $expected_code, 实际 $actual_code"
    fi
done
```

## 性能测试

### 状态码响应时间测试
```bash
#!/bin/bash

BASE_URL="https://your-site.netlify.app/.netlify/functions/hello"

echo "⏱️  状态码响应时间测试"
echo "======================"

# 测试不同状态码的响应时间
declare -a status_tests=(
    "200:short"
    "202:background"
    "400:validation"
    "429:rate-limit"
    "500:error"
    "503:maintenance=true"
)

for test in "${status_tests[@]}"; do
    IFS=':' read -r expected_status test_type <<< "$test"
    
    echo ""
    echo "🔍 测试: $test_type (预期状态码: $expected_status)"
    
    # 测量响应时间
    start_time=$(date +%s.%N)
    response=$(curl -s -w "\n%{http_code}\n%{time_total}" "$BASE_URL?type=$test_type")
    end_time=$(date +%s.%N)
    
    http_code=$(echo "$response" | tail -n2 | head -n1)
    time_total=$(echo "$response" | tail -n1)
    
    echo "状态码: $http_code"
    echo "响应时间: ${time_total}秒"
    
    if [ "$http_code" = "$expected_status" ]; then
        echo "✅ 状态码正确"
    else
        echo "❌ 状态码错误"
    fi
done
```

## 监控和告警

### 状态码监控脚本
```bash
#!/bin/bash

# 状态码监控脚本
BASE_URL="https://your-site.netlify.app/.netlify/functions/hello"

echo "📊 状态码监控报告"
echo "=================="

# 统计不同状态码的出现频率
declare -A status_counts
total_requests=0

# 执行多次请求并统计
for i in {1..10}; do
    response=$(curl -s -w "\n%{http_code}" "$BASE_URL?type=short")
    http_code=$(echo "$response" | tail -n1)
    
    ((status_counts[$http_code]++))
    ((total_requests++))
done

echo "总请求数: $total_requests"
echo ""
echo "状态码分布:"

for status in "${!status_counts[@]}"; do
    count=${status_counts[$status]}
    percentage=$(echo "scale=2; $count * 100 / $total_requests" | bc)
    echo "  $status: $count 次 ($percentage%)"
done

# 检查错误率
error_count=0
for status in "${!status_counts[@]}"; do
    if [ "$status" -ge 400 ]; then
        error_count=$((error_count + status_counts[$status]))
    fi
done

error_rate=$(echo "scale=2; $error_count * 100 / $total_requests" | bc)
echo ""
echo "错误率: $error_rate%"

if (( $(echo "$error_rate > 10" | bc -l) )); then
    echo "⚠️  错误率过高，需要关注"
else
    echo "✅ 错误率正常"
fi
```

## 最佳实践总结

### 1. 状态码选择原则
- **2xx**: 请求成功处理
- **4xx**: 客户端错误，需要客户端修改请求
- **5xx**: 服务器错误，服务器端问题

### 2. 错误响应格式
- 包含错误代码和描述
- 提供请求ID用于追踪
- 包含时间戳和详细信息

### 3. 响应头设计
- 使用 `X-Error-Code` 头传递错误代码
- 使用 `X-Request-ID` 头传递请求ID
- 设置正确的 `Content-Type`

### 4. 监控和告警
- 监控不同状态码的出现频率
- 设置错误率告警阈值
- 记录详细的错误日志

这个测试指南确保了 HTTP 状态码的一致性和可预测性，帮助开发者和用户更好地理解和处理各种异常情况。
