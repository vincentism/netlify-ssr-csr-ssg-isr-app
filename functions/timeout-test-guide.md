# Netlify Functions 超时测试指南

## 概述
这个测试指南提供了全面的 Netlify Functions 超时测试方案，用于验证不同超时场景的表现。

## Netlify Functions 超时限制

### 免费计划
- **同步函数**: 10秒超时限制
- **请求/响应大小**: 6MB限制

### 付费计划 (Pro/Enterprise)
- **同步函数**: 30秒超时限制
- **后台函数**: 15分钟超时限制
- **请求/响应大小**: 6MB限制

## 测试场景

### 1. 基础超时测试

#### 短超时测试 (5秒)
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=short"
```
**预期结果**: 成功完成，执行时间约5秒

#### 中等超时测试 (15秒)
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=medium"
```
**预期结果**: 
- 免费计划: 超时错误 (10秒限制)
- 付费计划: 成功完成，执行时间约15秒

#### 长超时测试 (25秒)
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=long"
```
**预期结果**: 
- 免费计划: 超时错误 (10秒限制)
- 付费计划: 成功完成，执行时间约25秒

#### 极端超时测试 (35秒)
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=extreme"
```
**预期结果**: 所有计划都会超时错误

### 2. 自定义超时测试

#### 自定义超时时间
```bash
# 8秒超时
curl "https://your-site.netlify.app/.netlify/functions/hello?type=custom&timeout=8000"

# 12秒超时
curl "https://your-site.netlify.app/.netlify/functions/hello?type=custom&timeout=12000"

# 20秒超时
curl "https://your-site.netlify.app/.netlify/functions/hello?type=custom&timeout=20000"
```

### 3. 错误处理测试

#### 超时前错误
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=error"
```
**预期结果**: 5秒后返回500错误，包含错误信息

### 4. 性能测试

#### 内存密集型操作
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=memory"
```
**预期结果**: 测试内存使用和性能表现

#### 异步操作测试
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=async"
```
**预期结果**: 测试并发异步操作的处理能力

### 5. 流式响应测试

#### 流式数据
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=stream"
```
**预期结果**: 返回流式响应，每秒输出一个数据块

### 6. 后台任务测试

#### 后台函数
```bash
curl "https://your-site.netlify.app/.netlify/functions/hello?type=background"
```
**预期结果**: 立即返回响应，后台任务继续执行

## 测试脚本

### 自动化测试脚本
```bash
#!/bin/bash

BASE_URL="https://your-site.netlify.app/.netlify/functions/hello"

echo "开始 Netlify Functions 超时测试"
echo "=================================="

# 测试用例数组
declare -a tests=(
    "short:5秒超时测试"
    "medium:15秒超时测试"
    "long:25秒超时测试"
    "extreme:35秒超时测试"
    "error:错误处理测试"
    "memory:内存密集型测试"
    "async:异步操作测试"
    "stream:流式响应测试"
    "background:后台任务测试"
)

for test in "${tests[@]}"; do
    IFS=':' read -r type description <<< "$test"
    echo ""
    echo "🧪 测试: $description"
    echo "URL: $BASE_URL?type=$type"
    
    start_time=$(date +%s)
    
    if [ "$type" = "stream" ]; then
        # 流式响应需要特殊处理
        timeout 15 curl -s "$BASE_URL?type=$type" | head -5
    else
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL?type=$type")
        http_code=$(echo "$response" | tail -n1)
        body=$(echo "$response" | head -n -1)
        
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        
        echo "HTTP状态码: $http_code"
        echo "响应时间: ${duration}秒"
        echo "响应内容: $body"
    fi
    
    echo "----------------------------------"
done

echo ""
echo "测试完成！"
```

### 并发测试
```bash
#!/bin/bash

BASE_URL="https://your-site.netlify.app/.netlify/functions/hello"

echo "开始并发超时测试"
echo "=================="

# 并发测试不同超时时间
for timeout in 5 10 15 20; do
    echo ""
    echo "🚀 并发测试: ${timeout}秒超时"
    
    # 启动5个并发请求
    for i in {1..5}; do
        (
            start_time=$(date +%s)
            response=$(curl -s -w "\n%{http_code}" "$BASE_URL?type=custom&timeout=$timeout")
            end_time=$(date +%s)
            duration=$((end_time - start_time))
            http_code=$(echo "$response" | tail -n1)
            echo "请求 $i: HTTP $http_code, 耗时 ${duration}秒"
        ) &
    done
    
    # 等待所有请求完成
    wait
    echo "----------------------------------"
done
```

## 监控和日志

### 1. 查看函数日志
在 Netlify 控制台中：
1. 进入你的站点
2. 点击 "Functions" 标签
3. 选择 "hello" 函数
4. 查看实时日志

### 2. 关键日志信息
- 函数开始执行时间
- 执行完成时间
- 错误信息
- 后台任务状态

### 3. 性能指标
- 执行时间
- 内存使用
- 错误率
- 超时率

## 预期结果分析

### 免费计划预期结果
- ✅ 5秒测试: 成功
- ❌ 15秒测试: 超时错误
- ❌ 25秒测试: 超时错误
- ❌ 35秒测试: 超时错误

### 付费计划预期结果
- ✅ 5秒测试: 成功
- ✅ 15秒测试: 成功
- ✅ 25秒测试: 成功
- ❌ 35秒测试: 超时错误

### 错误处理预期结果
- ✅ 错误测试: 返回500状态码和错误信息
- ✅ 流式响应: 正常流式输出
- ✅ 后台任务: 立即返回，后台继续执行

## 优化建议

### 1. 超时处理策略
- 对于长时间运行的任务，使用后台函数
- 实现任务队列机制
- 使用流式响应减少等待时间

### 2. 错误处理
- 实现重试机制
- 添加超时检测
- 提供用户友好的错误信息

### 3. 性能优化
- 减少内存使用
- 优化异步操作
- 使用缓存机制

## 注意事项

1. **测试环境**: 确保在正确的环境中测试
2. **计划限制**: 了解你的 Netlify 计划限制
3. **成本考虑**: 长时间运行的函数会增加成本
4. **用户体验**: 考虑超时对用户体验的影响
5. **监控**: 设置适当的监控和告警

这个测试指南可以帮助你全面了解 Netlify Functions 的超时行为和限制。
