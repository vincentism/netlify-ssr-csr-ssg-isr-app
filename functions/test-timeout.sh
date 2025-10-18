#!/bin/bash

# Netlify Functions 超时测试脚本
# 使用方法: ./test-timeout.sh [your-site-url]

# 设置默认URL（需要替换为你的实际站点URL）
DEFAULT_URL="https://your-site.netlify.app"
BASE_URL="${1:-$DEFAULT_URL}/.netlify/functions/hello"

echo "🚀 Netlify Functions 超时测试"
echo "================================"
echo "测试URL: $BASE_URL"
echo ""

# 检查URL是否已设置
if [ "$BASE_URL" = "$DEFAULT_URL/.netlify/functions/hello" ]; then
    echo "⚠️  请提供你的站点URL作为参数:"
    echo "   用法: ./test-timeout.sh https://your-site.netlify.app"
    echo ""
    echo "或者修改脚本中的 DEFAULT_URL 变量"
    exit 1
fi

# 测试函数
run_test() {
    local type=$1
    local description=$2
    local expected_timeout=$3
    
    echo "🧪 测试: $description"
    echo "URL: $BASE_URL?type=$type"
    
    start_time=$(date +%s.%N)
    
    if [ "$type" = "stream" ]; then
        # 流式响应测试
        echo "流式响应测试 (15秒超时):"
        timeout 15 curl -s "$BASE_URL?type=$type" | head -10
        echo ""
    else
        # 普通请求测试
        response=$(curl -s -w "\n%{http_code}\n%{time_total}" "$BASE_URL?type=$type" 2>/dev/null)
        
        if [ $? -eq 0 ]; then
            http_code=$(echo "$response" | tail -n2 | head -n1)
            time_total=$(echo "$response" | tail -n1)
            body=$(echo "$response" | head -n -2)
            
            end_time=$(date +%s.%N)
            duration=$(echo "$end_time - $start_time" | bc -l)
            
            echo "HTTP状态码: $http_code"
            echo "响应时间: ${time_total}秒"
            echo "总耗时: $(printf "%.2f" $duration)秒"
            
            if [ "$http_code" = "200" ]; then
                echo "✅ 测试成功"
                # 解析JSON响应中的执行时间
                execution_time=$(echo "$body" | grep -o '"executionTime":[0-9]*' | cut -d':' -f2)
                if [ ! -z "$execution_time" ]; then
                    echo "函数执行时间: ${execution_time}ms"
                fi
            elif [ "$http_code" = "500" ]; then
                echo "❌ 服务器错误"
                echo "错误信息: $body"
            else
                echo "⚠️  意外状态码: $http_code"
            fi
        else
            echo "❌ 请求失败或超时"
        fi
    fi
    
    echo "----------------------------------------"
}

# 执行测试
echo "开始执行超时测试..."
echo ""

# 基础超时测试
run_test "short" "短超时测试 (5秒)" 5
run_test "medium" "中等超时测试 (15秒)" 15
run_test "long" "长超时测试 (25秒)" 25
run_test "extreme" "极端超时测试 (35秒)" 35

# 自定义超时测试
echo "自定义超时测试:"
run_test "custom&timeout=8000" "自定义8秒超时" 8
run_test "custom&timeout=12000" "自定义12秒超时" 12
run_test "custom&timeout=20000" "自定义20秒超时" 20

# 错误处理测试
run_test "error" "错误处理测试" 5

# 性能测试
run_test "memory" "内存密集型测试" 10
run_test "async" "异步操作测试" 2

# 流式响应测试
run_test "stream" "流式响应测试" 10

# 后台任务测试
run_test "background" "后台任务测试" 1

echo ""
echo "🎯 测试结果分析:"
echo "=================="
echo ""
echo "免费计划预期结果:"
echo "  ✅ 5秒测试: 应该成功"
echo "  ❌ 15秒测试: 应该超时 (10秒限制)"
echo "  ❌ 25秒测试: 应该超时 (10秒限制)"
echo "  ❌ 35秒测试: 应该超时 (10秒限制)"
echo ""
echo "付费计划预期结果:"
echo "  ✅ 5秒测试: 应该成功"
echo "  ✅ 15秒测试: 应该成功"
echo "  ✅ 25秒测试: 应该成功"
echo "  ❌ 35秒测试: 应该超时 (30秒限制)"
echo ""
echo "📊 测试完成！"
echo "请查看上面的结果并与预期结果对比。"
