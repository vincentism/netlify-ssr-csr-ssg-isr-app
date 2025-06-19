import { revalidatePath } from 'next/cache'
import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const revalidate = 10
revalidatePath('/isr3');

export default function ISRPage() {
  // 生成当前时间和数据
  const currentTime = new Date().toLocaleString("zh-CN")
  const nextRevalidation = new Date(Date.now() + revalidate * 1000).toLocaleString("zh-CN")
  const cacheKey = Math.floor(Date.now() / (revalidate * 1000))

  // 计算一些基本数据
  const now = new Date()
  const timeData = {
    day_of_week: now.getDay(),
    day_of_year: Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)),
    week_number: Math.ceil(now.getDate() / 7),
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>

        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <RefreshCw className="h-8 w-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900">增量静态再生成 (ISR)</h1>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Incremental Static Regeneration
            </Badge>
          </div>
          <p className="text-gray-600">结合静态生成和动态更新，在后台增量更新内容，平衡性能与新鲜度</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">重新验证间隔</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-yellow-600">{revalidate}秒</p>
              <p className="text-sm text-gray-500">自动更新</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">缓存键</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-yellow-600">{cacheKey}</p>
              <p className="text-sm text-gray-500">当前版本</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">渲染位置</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-bold text-yellow-600">服务端</p>
              <p className="text-sm text-gray-500">更新</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">更新策略</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-yellow-600">后台</p>
              <p className="text-sm text-gray-500">无感知更新</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-yellow-600" />
              <span>ISR 数据演示</span>
            </CardTitle>
            <CardDescription>以下数据会在 {revalidate} 秒后的第一次访问时触发后台重新生成</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">缓存信息</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">页面渲染时间:</span> {currentTime}
                    </p>
                    <p>
                      <span className="font-medium">下次渲染时间:</span> {nextRevalidation}
                    </p>
                    <p>
                      <span className="font-medium">缓存键:</span> {cacheKey}
                    </p>
                    <p>
                      <span className="font-medium">重新验证:</span> {revalidate}秒间隔
                    </p> 
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">日期数据</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">星期:</span> {timeData.day_of_week}
                    </p>
                    <p>
                      <span className="font-medium">年份第几天:</span> {timeData.day_of_year}
                    </p>
                    <p>
                      <span className="font-medium">周数:</span> {timeData.week_number}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-700">
                  💡 <strong>ISR 特性:</strong> 页面首次在构建时生成，之后每 {revalidate} 秒会检查是否需要更新。
                  当有新请求时，如果超过重新验证时间，会在后台重新生成页面，用户仍然看到缓存版本直到新版本准备就绪。
                </p>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
                <h5 className="font-medium text-gray-900 mb-2">ISR 工作流程:</h5>
                <ol className="text-sm text-gray-600 space-y-1">
                  <li>1. 构建时生成初始静态页面</li>
                  <li>2. 用户访问时返回缓存的静态页面</li>
                  <li>3. 【异步】超过 revalidate 时间后的首次访问触发后台重新生成</li>
                  <li>4. 新页面生成完成后更新缓存</li>
                  <li>5. 后续访问返回更新后的页面</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>技术实现</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="text-green-400">// Next.js App Router ISR 实现</div>
              <div className="text-yellow-400">export const</div> revalidate = <div className="text-blue-300">10</div>
              <br />
              <div className="text-yellow-400">export default function</div>{" "}
              <div className="text-blue-300">ISRPage</div>() {`{`}
              <div className="ml-4">
                <div className="text-yellow-400">const</div> currentTime = <div className="text-yellow-400">new</div>{" "}
                <div className="text-blue-300">Date</div>().<div className="text-blue-300">toLocaleString</div>()
                <br />
                <div className="text-yellow-400">return</div> <div className="text-red-400">&lt;div&gt;</div>
                <div className="ml-4">
                  <div className="text-red-400">&lt;p&gt;</div>生成时间: {`{currentTime}`}
                  <div className="text-red-400">&lt;/p&gt;</div>
                  <div className="text-red-400">&lt;p&gt;</div>重新验证: {`{revalidate}`}秒
                  <div className="text-red-400">&lt;/p&gt;</div>
                </div>
                <div className="text-red-400">&lt;/div&gt;</div>
              </div>
              {`}`}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
