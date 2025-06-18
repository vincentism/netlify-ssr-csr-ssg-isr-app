import Link from "next/link"
import { ArrowLeft, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-static"

export default function SSGPage() {
  // 在构建时生成的静态数据
  const buildTime = new Date().toLocaleString("zh-CN")
  const buildId = "build-" + Math.random().toString(36).substr(2, 8)

  // 计算一些构建时数据
  const now = new Date()
  const buildData = {
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
            <Zap className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">静态站点生成 (SSG)</h1>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Static Site Generation
            </Badge>
          </div>
          <p className="text-gray-600">在构建时预生成静态 HTML 文件，提供最佳的性能和 CDN 缓存效果</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">渲染位置</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-green-600">构建服务器</p>
              <p className="text-sm text-gray-500">构建时</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">缓存策略</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-green-600">force-cache</p>
              <p className="text-sm text-gray-500">永久缓存</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">构建 ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-green-600">{buildId}</p>
              <p className="text-sm text-gray-500">唯一标识</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">CDN 友好</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-green-600">100%</p>
              <p className="text-sm text-gray-500">全球分发</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-600" />
              <span>静态数据演示</span>
            </CardTitle>
            <CardDescription>以下数据在构建时生成，无论访问多少次都保持不变</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">构建信息</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">页面渲染时间:</span> {buildTime}
                    </p>
                    <p>
                      <span className="font-medium">构建 ID:</span> {buildId}
                    </p>
                    <p>
                      <span className="font-medium">生成方式:</span> 静态预渲染
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">日期数据</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">星期:</span> {buildData.day_of_week}
                    </p>
                    <p>
                      <span className="font-medium">年份第几天:</span> {buildData.day_of_year}
                    </p>
                    <p>
                      <span className="font-medium">周数:</span> {buildData.week_number}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  💡 <strong>SSG 特性:</strong> 页面在构建时预生成，所有用户看到的内容完全相同。
                  无论刷新多少次，数据都不会改变，除非重新构建项目。这提供了最佳的性能和缓存效果。
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
              <div className="text-green-400">// Next.js App Router SSG 实现</div>
              <div className="text-yellow-400">export const</div> dynamic ={" "}
              <div className="text-green-300">'force-static'</div>
              <br />
              <div className="text-yellow-400">export default function</div>{" "}
              <div className="text-blue-300">SSGPage</div>() {`{`}
              <div className="ml-4">
                <div className="text-yellow-400">const</div> buildTime = <div className="text-yellow-400">new</div>{" "}
                <div className="text-blue-300">Date</div>().<div className="text-blue-300">toLocaleString</div>()
                <br />
                <div className="text-yellow-400">const</div> buildId = <div className="text-green-300">'build-'</div> +
                Math.<div className="text-blue-300">random</div>().<div className="text-blue-300">toString</div>(36).
                <div className="text-blue-300">substr</div>(2, 8)
                <br />
                <div className="text-yellow-400">return</div> <div className="text-red-400">&lt;div&gt;</div>
                <div className="ml-4">
                  <div className="text-red-400">&lt;p&gt;</div>构建时间: {`{buildTime}`}
                  <div className="text-red-400">&lt;/p&gt;</div>
                  <div className="text-red-400">&lt;p&gt;</div>构建 ID: {`{buildId}`}
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
