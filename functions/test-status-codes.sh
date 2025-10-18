#!/bin/bash

# HTTP 状态码测试脚本
# 使用方法: ./test-status-codes.sh [your-site-url]

DEFAULT_URL="https://your-site.netlify.app"
BASE_URL="${1:-$DEFAULT_URL}/.netlify/functions/hello"

echo "🧪 HTTP 状态码测试"
echo "==================="
echo "测试URL: $BASE_URL"
echo ""

# 检查URL是否已设置
if [ "$BASE_URL" = "$DEFAULT_URL/.netlify/functions/hello" ]; then
    echo "⚠️  请提供你的站点URL作为参数:"
    echo "   用法: ./test-status-codes.sh https://your-site.netlify.app"
    echo ""
    echo "或者修改脚本中的 DEFAULT_URL 变量"
    exit 1
fi

# 测试函数
run_status_test() {
    local test_name=$1
    local test_type=$2
    local expected_status=$3
    local description=$4
    
    echo "🔍 测试: $test_name"
    echo "描述: $description"
    echo "类型: $test_type"
    echo "预期状态码: $expected_status"
    echo "URL: $BASE_URL?type=$test_type"
    
    start_time=$(date +%s.%N)
    
    # 执行请求
    response=$(curl -s -w "\n%{http_code}\n%{time_total}" "$BASE_URL?type=$test_type" 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        http_code=$(echo "$response" | tail -n2 | head -n1)
        time_total=$(echo "$response" | tail -n1)
        body=$(echo "$response" | head -n -2)
        
        end_time=$(date +%s.%N)
        duration=$(echo "$end_time - $start_time" | bc -l)
        
        echo "实际状态码: $http_code"
        echo "响应时间: ${time_total}秒"
        echo "总耗时: $(printf "%.2f" $duration)秒"
        
        # 验证状态码
        if [ "$http_code" = "$expected_status" ]; then
            echo "✅ 状态码正确"
        else
            echo "❌ 状态码错误: 期望 $expected_status, 实际 $http_code"
        fi
        
        # 解析错误代码
        error_code=$(echo "$body" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
        if [ ! -z "$error_code" ]; then
            echo "错误代码: $error_code"
        fi
        
        # 解析请求ID
        request_id=$(echo "$body" | grep -o '"requestId":"[^"]*"' | cut -d'"' -f4)
        if [ ! -z "$request_id" ]; then
            echo "请求ID: $request_id"
        fi
        
        # 显示响应内容（截断长响应）
        if [ ${#body} -gt 200 ]; then
            echo "响应内容: ${body:0:200}..."
        else
            echo "响应内容: $body"
        fi
        
    else
        echo "❌ 请求失败"
    fi
    
    echo "----------------------------------------"
}

# 执行状态码测试
echo "开始执行状态码测试..."
echo ""

# 成功响应测试 (2xx)
echo "📋 成功响应测试 (2xx)"
echo "======================"
run_status_test "短超时测试" "short" "200" "5秒超时，应该成功完成"
run_status_test "后台任务测试" "background" "202" "后台任务启动，立即返回"

echo ""

# 客户端错误测试 (4xx)
echo "📋 客户端错误测试 (4xx)"
echo "========================"
run_status_test "参数验证测试" "validation" "400" "无效参数，应该返回400"
run_status_test "无效类型测试" "invalid_type" "400" "不存在的测试类型"
run_status_test "缺少参数测试" "custom" "400" "自定义超时但缺少timeout参数"
run_status_test "速率限制测试" "rate-limit" "429" "模拟速率限制"

echo ""

# 服务器错误测试 (5xx)
echo "📋 服务器错误测试 (5xx)"
echo "========================"
run_status_test "内部错误测试" "error" "500" "模拟内部错误"
run_status_test "维护模式测试" "maintenance=true" "503" "服务维护模式"
run_status_test "内存超限测试" "memory" "507" "内存使用超限"
run_status_test "超时测试" "extreme" "524" "函数执行超时"

echo ""

# 响应头验证
echo "📋 响应头验证测试"
echo "=================="
echo "🔍 检查错误响应头..."

headers=$(curl -s -I "$BASE_URL?type=validation" 2>/dev/null)

echo "响应头:"
echo "$headers"

# 验证关键头部
if echo "$headers" | grep -q "X-Error-Code"; then
    echo "✅ 包含错误代码头 (X-Error-Code)"
else
    echo "❌ 缺少错误代码头 (X-Error-Code)"
fi

if echo "$headers" | grep -q "X-Request-ID"; then
    echo "✅ 包含请求ID头 (X-Request-ID)"
else
    echo "❌ 缺少请求ID头 (X-Request-ID)"
fi

if echo "$headers" | grep -q "Content-Type: application/json"; then
    echo "✅ 内容类型正确 (application/json)"
else
    echo "❌ 内容类型错误"
fi

echo ""

# 错误代码验证
echo "📋 错误代码验证测试"
echo "===================="

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
    
    echo "🧪 测试类型: $test_type"
    echo "预期错误代码: $expected_code"
    
    response=$(curl -s "$BASE_URL?type=$test_type" 2>/dev/null)
    actual_code=$(echo "$response" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
    
    if [ "$actual_code" = "$expected_code" ]; then
        echo "✅ 错误代码正确: $actual_code"
    else
        echo "❌ 错误代码错误: 期望 $expected_code, 实际 $actual_code"
    fi
    echo "----------------------------------------"
done

echo ""

# 性能测试
echo "📋 性能测试"
echo "============"

echo "🔍 测试不同状态码的响应时间..."

declare -a performance_tests=(
    "200:short"
    "202:background"
    "400:validation"
    "429:rate-limit"
    "500:error"
    "503:maintenance=true"
)

for test in "${performance_tests[@]}"; do
    IFS=':' read -r expected_status test_type <<< "$test"
    
    echo ""
    echo "🧪 测试: $test_type (预期状态码: $expected_status)"
    
    # 测量响应时间
    start_time=$(date +%s.%N)
    response=$(curl -s -w "\n%{http_code}\n%{time_total}" "$BASE_URL?type=$test_type" 2>/dev/null)
    end_time=$(date +%s.%N)
    
    if [ $? -eq 0 ]; then
        http_code=$(echo "$response" | tail -n2 | head -n1)
        time_total=$(echo "$response" | tail -n1)
        
        echo "状态码: $http_code"
        echo "响应时间: ${time_total}秒"
        
        if [ "$http_code" = "$expected_status" ]; then
            echo "✅ 状态码正确"
        else
            echo "❌ 状态码错误"
        fi
    else
        echo "❌ 请求失败"
    fi
done

echo ""
echo "🎯 测试结果总结"
echo "================"
echo ""
echo "✅ 成功响应 (2xx): 应该返回正确的状态码和响应内容"
echo "❌ 客户端错误 (4xx): 应该返回400/429等状态码和错误信息"
echo "💥 服务器错误 (5xx): 应该返回500/503/507/524等状态码和错误信息"
echo ""
echo "📊 关键验证点:"
echo "  - 状态码正确性"
echo "  - 错误代码一致性"
echo "  - 响应头完整性"
echo "  - 响应时间合理性"
echo "  - 请求ID追踪"
echo ""
echo "📈 测试完成！"
echo "请查看上面的结果并与预期结果对比。"
