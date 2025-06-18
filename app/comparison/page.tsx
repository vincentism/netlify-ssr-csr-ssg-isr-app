import type React from "react"
import Link from "next/link"
import { ArrowLeft, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">渲染策略详细对比</h1>
          <p className="text-gray-600">全面对比四种渲染策略的技术特性、性能表现和适用场景</p>
        </div>

        {/* 特性对比表格 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>技术特性对比表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-4 font-semibold">特性</th>
                    <th className="text-center p-4 font-semibold bg-purple-50">CSR</th>
                    <th className="text-center p-4 font-semibold bg-blue-50">SSR</th>
                    <th className="text-center p-4 font-semibold bg-green-50">SSG</th>
                    <th className="text-center p-4 font-semibold bg-yellow-50">ISR</th>
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow
                    feature="首屏加载速度"
                    csr={<span className="text-red-600">慢</span>}
                    ssr={<span className="text-green-600">快</span>}
                    ssg={<span className="text-green-600">极快</span>}
                    isr={<span className="text-green-600">快</span>}
                  />
                  <ComparisonRow
                    feature="SEO 友好性"
                    csr={<X className="h-5 w-5 text-red-500 mx-auto" />}
                    ssr={<Check className="h-5 w-5 text-green-500 mx-auto" />}
                    ssg={<Check className="h-5 w-5 text-green-500 mx-auto" />}
                    isr={<Check className="h-5 w-5 text-green-500 mx-auto" />}
                  />
                  <ComparisonRow
                    feature="服务器负载"
                    csr={<span className="text-green-600">低</span>}
                    ssr={<span className="text-red-600">高</span>}
                    ssg={<span className="text-green-600">极低</span>}
                    isr={<span className="text-yellow-600">中等</span>}
                  />
                  <ComparisonRow
                    feature="内容新鲜度"
                    csr={<span className="text-green-600">实时</span>}
                    ssr={<span className="text-green-600">实时</span>}
                    ssg={<span className="text-red-600">静态</span>}
                    isr={<span className="text-yellow-600">定期更新</span>}
                  />
                  <ComparisonRow
                    feature="构建时间"
                    csr={<span className="text-green-600">快</span>}
                    ssr={<span className="text-green-600">快</span>}
                    ssg={<span className="text-red-600">慢</span>}
                    isr={<span className="text-yellow-600">中等</span>}
                  />
                  <ComparisonRow
                    feature="CDN 缓存效果"
                    csr={<span className="text-yellow-600">中等</span>}
                    ssr={<span className="text-yellow-600">中等</span>}
                    ssg={<span className="text-green-600">优秀</span>}
                    isr={<span className="text-green-600">优秀</span>}
                  />
                  <ComparisonRow
                    feature="交互性"
                    csr={<span className="text-green-600">高</span>}
                    ssr={<span className="text-yellow-600">中等</span>}
                    ssg={<span className="text-yellow-600">中等</span>}
                    isr={<span className="text-yellow-600">中等</span>}
                  />
                  <ComparisonRow
                    feature="开发复杂度"
                    csr={<span className="text-green-600">低</span>}
                    ssr={<span className="text-yellow-600">中等</span>}
                    ssg={<span className="text-green-600">低</span>}
                    isr={<span className="text-red-600">高</span>}
                  />
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 使用场景详解 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UseCaseCard
            title="CSR 典型使用场景"
            color="purple"
            cases={[
              "管理后台系统 - 复杂的数据操作界面，高度交互性",
              "在线代码编辑器 - 实时编辑、预览功能",
              "数据可视化仪表盘 - 动态图表、实时数据更新",
              "单页应用 (SPA) - 路由切换无刷新体验",
              "在线游戏界面 - 实时交互、状态管理",
            ]}
          />

          <UseCaseCard
            title="SSR 典型使用场景"
            color="blue"
            cases={[
              "电商产品页面 - SEO 重要，内容需要实时更新",
              "新闻门户网站 - 内容时效性强，搜索引擎友好",
              "社交媒体动态 - 个性化内容，需要服务端渲染",
              "在线论坛 - 用户生成内容，SEO 和实时性并重",
              "企业官网 - 营销页面，需要良好的 SEO 表现",
            ]}
          />

          <UseCaseCard
            title="SSG 典型使用场景"
            color="green"
            cases={[
              "技术博客 - 内容相对静态，追求极致性能",
              "产品文档站点 - 版本化内容，构建时生成",
              "营销落地页 - 高性能要求，内容变化不频繁",
              "公司介绍页面 - 静态内容，全球 CDN 分发",
              "开源项目主页 - GitHub Pages 等静态托管",
            ]}
          />

          <UseCaseCard
            title="ISR 典型使用场景"
            color="yellow"
            cases={[
              "大型电商网站 - 商品信息定期更新，页面数量庞大",
              "内容管理系统 - 编辑发布后需要更新，但不需要实时",
              "新闻聚合网站 - 定时抓取更新，保持内容新鲜度",
              "API 文档站点 - 版本更新时重新生成相关页面",
              "房产/招聘网站 - 信息更新频率中等，页面数量大",
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function ComparisonRow({
  feature,
  csr,
  ssr,
  ssg,
  isr,
}: {
  feature: string
  csr: React.ReactNode
  ssr: React.ReactNode
  ssg: React.ReactNode
  isr: React.ReactNode
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="p-4 font-medium">{feature}</td>
      <td className="p-4 text-center bg-purple-25">{csr}</td>
      <td className="p-4 text-center bg-blue-25">{ssr}</td>
      <td className="p-4 text-center bg-green-25">{ssg}</td>
      <td className="p-4 text-center bg-yellow-25">{isr}</td>
    </tr>
  )
}

function UseCaseCard({
  title,
  color,
  cases,
}: {
  title: string
  color: "purple" | "blue" | "green" | "yellow"
  cases: string[]
}) {
  const colorClasses = {
    purple: "border-purple-200 bg-purple-50",
    blue: "border-blue-200 bg-blue-50",
    green: "border-green-200 bg-green-50",
    yellow: "border-yellow-200 bg-yellow-50",
  }

  return (
    <Card>
      <CardHeader className={colorClasses[color]}>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-3">
          {cases.map((useCase, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                {index + 1}
              </span>
              <span className="text-gray-700">{useCase}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
