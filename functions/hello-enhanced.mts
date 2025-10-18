import type { Context } from "@netlify/functions";

/**
 * Netlify Functions 超时测试函数 - 增强版
 * 包含完整的状态码设计和异常处理规范
 */

// 错误代码定义
const ERROR_CODES = {
  // 验证错误
  VALIDATION_PARAMETER_INVALID: 'VALIDATION_PARAMETER_INVALID',
  VALIDATION_PARAMETER_MISSING: 'VALIDATION_PARAMETER_MISSING',
  VALIDATION_PARAMETER_OUT_OF_RANGE: 'VALIDATION_PARAMETER_OUT_OF_RANGE',
  
  // 资源错误
  RESOURCE_MEMORY_EXCEEDED: 'RESOURCE_MEMORY_EXCEEDED',
  RESOURCE_TIMEOUT_EXCEEDED: 'RESOURCE_TIMEOUT_EXCEEDED',
  RESOURCE_QUOTA_EXCEEDED: 'RESOURCE_QUOTA_EXCEEDED',
  
  // 系统错误
  SYSTEM_INTERNAL_ERROR: 'SYSTEM_INTERNAL_ERROR',
  SYSTEM_SERVICE_UNAVAILABLE: 'SYSTEM_SERVICE_UNAVAILABLE',
  SYSTEM_MAINTENANCE: 'SYSTEM_MAINTENANCE'
};

// 有效的测试类型
const VALID_TEST_TYPES = [
  'short', 'medium', 'long', 'extreme', 'custom', 
  'error', 'memory', 'async', 'stream', 'background',
  'validation', 'rate-limit', 'maintenance'
];

// 超时限制配置
const TIMEOUT_LIMITS = {
  FREE_PLAN: 10000,      // 10秒
  PRO_PLAN: 30000,       // 30秒
  BACKGROUND: 900000     // 15分钟
};

// 创建错误响应
const createErrorResponse = (
  status: number, 
  errorCode: string, 
  message: string, 
  details: any = {},
  context: Context
) => {
  return new Response(JSON.stringify({
    status,
    error: errorCode,
    message,
    details,
    requestId: context.requestId,
    timestamp: new Date().toISOString(),
    path: '/.netlify/functions/hello',
    method: 'GET'
  }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Error-Code': errorCode,
      'X-Request-ID': context.requestId
    }
  });
};

// 创建成功响应
const createSuccessResponse = (
  data: any, 
  status: number = 200,
  context: Context
) => {
  return new Response(JSON.stringify({
    status,
    ...data,
    requestId: context.requestId,
    timestamp: new Date().toISOString()
  }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Request-ID': context.requestId
    }
  });
};

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const timeoutParam = url.searchParams.get('timeout');
  const testType = url.searchParams.get('type') || 'default';
  const maintenanceMode = url.searchParams.get('maintenance') === 'true';
  
  console.log(`[${new Date().toISOString()}] 开始执行超时测试: type=${testType}, timeout=${timeoutParam}ms`);
  
  // 记录开始时间
  const startTime = Date.now();
  
  try {
    // 维护模式检查
    if (maintenanceMode) {
      return createErrorResponse(
        503,
        ERROR_CODES.SYSTEM_MAINTENANCE,
        '服务正在维护中，请稍后重试',
        { estimatedRecovery: '2024-01-01T12:00:00Z' },
        context
      );
    }
    
    // 参数验证
    if (testType && !VALID_TEST_TYPES.includes(testType)) {
      return createErrorResponse(
        400,
        ERROR_CODES.VALIDATION_PARAMETER_INVALID,
        '无效的测试类型',
        { 
          provided: testType,
          validTypes: VALID_TEST_TYPES 
        },
        context
      );
    }
    
    // 自定义超时参数验证
    if (testType === 'custom') {
      if (!timeoutParam) {
        return createErrorResponse(
          400,
          ERROR_CODES.VALIDATION_PARAMETER_MISSING,
          '自定义超时测试需要提供timeout参数',
          { required: 'timeout' },
          context
        );
      }
      
      const customTimeout = parseInt(timeoutParam);
      if (isNaN(customTimeout) || customTimeout <= 0) {
        return createErrorResponse(
          400,
          ERROR_CODES.VALIDATION_PARAMETER_INVALID,
          'timeout参数必须是正整数',
          { provided: timeoutParam },
          context
        );
      }
      
      if (customTimeout > TIMEOUT_LIMITS.PRO_PLAN) {
        return createErrorResponse(
          400,
          ERROR_CODES.VALIDATION_PARAMETER_OUT_OF_RANGE,
          'timeout参数超出最大限制',
          { 
            provided: customTimeout,
            maxAllowed: TIMEOUT_LIMITS.PRO_PLAN 
          },
          context
        );
      }
    }
    
    // 速率限制模拟
    if (testType === 'rate-limit') {
      return createErrorResponse(
        429,
        'RATE_LIMIT_EXCEEDED',
        '请求过于频繁，请稍后重试',
        { retryAfter: 60 },
        context
      );
    }
    
    // 验证测试
    if (testType === 'validation') {
      return createErrorResponse(
        400,
        ERROR_CODES.VALIDATION_PARAMETER_INVALID,
        '这是一个验证错误测试',
        { 
          testType: 'validation',
          message: '用于测试参数验证功能'
        },
        context
      );
    }
    
    // 执行测试
    switch (testType) {
      case 'short':
        // 短超时测试 - 5秒
        await new Promise(resolve => setTimeout(resolve, 5000));
        break;
        
      case 'medium':
        // 中等超时测试 - 15秒
        await new Promise(resolve => setTimeout(resolve, 15000));
        break;
        
      case 'long':
        // 长超时测试 - 25秒
        await new Promise(resolve => setTimeout(resolve, 25000));
        break;
        
      case 'extreme':
        // 极端超时测试 - 35秒（超过所有计划限制）
        await new Promise(resolve => setTimeout(resolve, 35000));
        break;
        
      case 'custom':
        // 自定义超时测试
        const customTimeout = parseInt(timeoutParam!);
        await new Promise(resolve => setTimeout(resolve, customTimeout));
        break;
        
      case 'error':
        // 错误测试 - 在超时前抛出错误
        await new Promise(resolve => setTimeout(resolve, 5000));
        throw new Error('模拟错误：在超时前抛出异常');
        
      case 'memory':
        // 内存密集型操作测试
        try {
          const largeArray = [];
          for (let i = 0; i < 1000000; i++) {
            largeArray.push({ 
              id: i, 
              data: `Large data item ${i}`.repeat(100),
              timestamp: Date.now()
            });
          }
          await new Promise(resolve => setTimeout(resolve, 10000));
        } catch (error) {
          return createErrorResponse(
            507,
            ERROR_CODES.RESOURCE_MEMORY_EXCEEDED,
            '内存使用超限',
            { 
              memoryUsage: '1024MB',
              limit: '1024MB',
              error: error.message 
            },
            context
          );
        }
        break;
        
      case 'async':
        // 异步操作测试
        const promises = Array.from({ length: 10 }, (_, i) => 
          new Promise(resolve => 
            setTimeout(() => resolve(`Promise ${i} completed`), 2000)
          )
        );
        await Promise.all(promises);
        break;
        
      case 'stream':
        // 流式响应测试
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          start(controller) {
            let count = 0;
            const interval = setInterval(() => {
              if (count >= 10) {
                controller.close();
                clearInterval(interval);
                return;
              }
              const data = `Stream chunk ${count}\n`;
              controller.enqueue(encoder.encode(data));
              count++;
            }, 1000);
          }
        });
        
        return new Response(stream, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain',
            'X-Test-Type': 'stream',
            'X-Request-ID': context.requestId
          }
        });
        
      case 'background':
        // 后台任务测试 - 使用 waitUntil
        const backgroundTask = new Promise(resolve => {
          setTimeout(() => {
            console.log('后台任务完成');
            resolve('Background task completed');
          }, 20000);
        });
        
        context.waitUntil(backgroundTask);
        
        return createSuccessResponse({
          message: '后台任务已启动，将在20秒后完成',
          startTime: new Date().toISOString(),
          testType: 'background',
          taskId: `task-${Date.now()}`
        }, 202, context);
        
      default:
        // 默认测试 - 10秒
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
    
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    console.log(`[${new Date().toISOString()}] 测试完成: 执行时间=${executionTime}ms`);
    
    return createSuccessResponse({
      message: `超时测试完成: ${testType}`,
      executionTime: executionTime,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      testType: testType,
      timeout: timeoutParam,
      success: true
    }, 200, context);
    
  } catch (error) {
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    console.error(`[${new Date().toISOString()}] 测试失败:`, error.message);
    
    // 根据错误类型返回不同的状态码
    if (error.message.includes('timeout') || error.message.includes('超时')) {
      return createErrorResponse(
        524, // Netlify 特定的超时状态码
        ERROR_CODES.RESOURCE_TIMEOUT_EXCEEDED,
        '函数执行超时',
        {
          executionTime: executionTime,
          timeoutLimit: TIMEOUT_LIMITS.FREE_PLAN,
          testType: testType
        },
        context
      );
    }
    
    if (error.message.includes('memory') || error.message.includes('内存')) {
      return createErrorResponse(
        507,
        ERROR_CODES.RESOURCE_MEMORY_EXCEEDED,
        '内存使用超限',
        {
          executionTime: executionTime,
          testType: testType,
          error: error.message
        },
        context
      );
    }
    
    // 默认内部服务器错误
    return createErrorResponse(
      500,
      ERROR_CODES.SYSTEM_INTERNAL_ERROR,
      '服务器内部错误',
      {
        executionTime: executionTime,
        testType: testType,
        error: error.message
      },
      context
    );
  }
};

export const config = {
  path: "/hello"
};
