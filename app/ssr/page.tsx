import Link from "next/link"
import { ArrowLeft, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { sleep } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function SSRPage() {
  const renderStartTime = Date.now()
  const serverTime = new Date().toLocaleString("zh-CN")

  // 计算一些服务端数据
  const now = new Date()
  const serverData = {
    day_of_week: now.getDay(),
    day_of_year: Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)),
    week_number: Math.ceil(now.getDate() / 7),
    request_id: Math.random().toString(36).substr(2, 9),
  }
  await sleep();
  // 模拟服务器处理时间
  const totalRenderTime = Date.now() - renderStartTime

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>

        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Server className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">服务器端渲染 (SSR)</h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Server-Side Rendering
            </Badge>
          </div>
          <p className="text-gray-600">在服务器端为每个请求动态生成 HTML，确保内容的实时性和 SEO 优化</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">渲染位置</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-blue-600">服务器端</p>
              <p className="text-sm text-gray-500">每次请求</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">渲染耗时</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-blue-600">{totalRenderTime}ms</p>
              <p className="text-sm text-gray-500">服务端处理</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">请求 ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-blue-600">{serverData.request_id}</p>
              <p className="text-sm text-gray-500">唯一标识</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">缓存策略</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-blue-600">no-store</p>
              <p className="text-sm text-gray-500">每次重新获取</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5 text-blue-600" />
              <span>服务端数据演示</span>
            </CardTitle>
            <CardDescription>以下数据在服务器端生成，每次请求都会重新计算</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">服务器信息</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">页面渲染时间:</span> {serverTime}
                    </p>
                    <p>
                      <span className="font-medium">渲染耗时:</span> {totalRenderTime}ms
                    </p>
                    <p>
                      <span className="font-medium">请求 ID:</span> {serverData.request_id}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">日期数据</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">星期:</span> {serverData.day_of_week}
                    </p>
                    <p>
                      <span className="font-medium">年份第几天:</span> {serverData.day_of_year}
                    </p>
                    <p>
                      <span className="font-medium">周数:</span> {serverData.week_number}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>SSR 特性:</strong> 页面内容在服务器端完全渲染完成后发送给客户端，
                  每次刷新都会在服务器端重新执行代码并生成新的 HTML。请注意每次刷新时间和请求 ID 都会变化。
                </p>
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
              <div className="text-green-400">// Next.js App Router SSR 实现</div>
              <div className="text-yellow-400">export const</div> dynamic ={" "}
              <div className="text-green-300">'force-dynamic'</div>
              <br />
              <div className="text-yellow-400">export default function</div>{" "}
              <div className="text-blue-300">SSRPage</div>() {`{`}
              <div className="ml-4">
                <div className="text-yellow-400">const</div> serverTime = <div className="text-yellow-400">new</div>{" "}
                <div className="text-blue-300">Date</div>().<div className="text-blue-300">toLocaleString</div>()
                <br />
                <div className="text-yellow-400">const</div> requestId = Math.
                <div className="text-blue-300">random</div>
                ().<div className="text-blue-300">toString</div>(36).<div className="text-blue-300">substr</div>(2, 9)
                <br />
                <div className="text-yellow-400">return</div> <div className="text-red-400">&lt;div&gt;</div>
                <div className="ml-4">
                  <div className="text-red-400">&lt;p&gt;</div>服务器时间: {`{serverTime}`}
                  <div className="text-red-400">&lt;/p&gt;</div>
                  <div className="text-red-400">&lt;p&gt;</div>请求 ID: {`{requestId}`}
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

