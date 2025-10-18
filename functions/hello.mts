import type { Context } from "@netlify/functions";

/**
 * Netlify Functions 超时测试函数
 * 用于验证不同超时场景的表现
 */

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const timeoutParam = url.searchParams.get('timeout');
  const testType = url.searchParams.get('type') || 'default';
  
  console.log(`[${new Date().toISOString()}] 开始执行超时测试: type=${testType}, timeout=${timeoutParam}ms`);
  
  // 记录开始时间
  const startTime = Date.now();
  
  try {
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
        // 极端超时测试 - 35秒（超过免费计划限制）
        await new Promise(resolve => setTimeout(resolve, 35000));
        break;
        
      case 'custom':
        // 自定义超时测试
        const customTimeout = timeoutParam ? parseInt(timeoutParam) : 10000;
        await new Promise(resolve => setTimeout(resolve, customTimeout));
        break;
        
      case 'error':
        // 错误测试 - 在超时前抛出错误
        await new Promise(resolve => setTimeout(resolve, 5000));
        throw new Error('模拟错误：在超时前抛出异常');
        
      case 'memory':
        // 内存密集型操作测试
        const largeArray = [];
        for (let i = 0; i < 1000000; i++) {
          largeArray.push({ 
            id: i, 
            data: `Large data item ${i}`.repeat(100),
            timestamp: Date.now()
          });
        }
        await new Promise(resolve => setTimeout(resolve, 10000));
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
          headers: {
            'Content-Type': 'text/plain',
            'X-Test-Type': 'stream'
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
        
        return new Response(JSON.stringify({
          message: '后台任务已启动，将在20秒后完成',
          startTime: new Date().toISOString(),
          testType: 'background'
        }), {
          headers: {
            'Content-Type': 'application/json',
            'X-Test-Type': 'background'
          }
        });
        
      default:
        // 默认测试 - 10秒
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
    
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    console.log(`[${new Date().toISOString()}] 测试完成: 执行时间=${executionTime}ms`);
    
    return new Response(JSON.stringify({
      message: `超时测试完成: ${testType}`,
      executionTime: executionTime,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      testType: testType,
      timeout: timeoutParam,
      success: true
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Type': testType,
        'X-Execution-Time': executionTime.toString()
      }
    });
    
  } catch (error) {
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    console.error(`[${new Date().toISOString()}] 测试失败:`, error.message);
    
    return new Response(JSON.stringify({
      message: `超时测试失败: ${testType}`,
      error: error.message,
      executionTime: executionTime,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      testType: testType,
      success: false
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'X-Test-Type': testType,
        'X-Execution-Time': executionTime.toString()
      }
    });
  }
};

export const config = {
  path: "/hello"
};
