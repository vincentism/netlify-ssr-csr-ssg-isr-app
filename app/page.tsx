import type React from "react"
import Link from "next/link"
import { ArrowRight, Code, Server, Zap, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Web 渲染方案</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            CSR / SSR / SSG / ISR
          </p>
        </div>

        {/* 基础渲染策略 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">基础渲染</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RenderingCard
              icon={<Code className="h-10 w-10" />}
              title="CSR"
              subtitle="Client-Side Rendering"
              description="在浏览器中使用 JavaScript 动态渲染内容，提供高度交互性的用户体验。"
              performance="首屏较慢，交互快速"
              seo="SEO 不友好"
              caching="浏览器缓存"
              link="/csr"
              color="purple"
            />

            <RenderingCard
              icon={<Server className="h-10 w-10" />}
              title="SSR"
              subtitle="Server-Side Rendering"
              description="在服务器端为每个请求动态生成 HTML，确保内容的实时性和 SEO 优化。"
              performance="首屏快速，服务器负载高"
              seo="SEO 友好"
              caching="CDN + 服务器缓存"
              link="/ssr"
              color="blue"
            />

            <RenderingCard
              icon={<Zap className="h-10 w-10" />}
              title="SSG"
              subtitle="Static Site Generation"
              description="在构建时预生成静态 HTML 文件，提供最佳的性能和 CDN 缓存效果。"
              performance="极快加载，构建时间长"
              seo="SEO 优秀"
              caching="CDN 长期缓存"
              link="/ssg"
              color="green"
            />

            <RenderingCard
              icon={<RefreshCw className="h-10 w-10" />}
              title="ISR"
              subtitle="Incremental Static Regeneration"
              description="结合静态生成和动态更新，在后台增量更新内容，平衡性能与新鲜度。"
              performance="快速加载，按需更新"
              seo="SEO 友好"
              caching="智能缓存策略"
              link="/isr"
              color="yellow"
            />
          </div>
        </div>

        {/* 具体混合渲染类别 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">混合渲染</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 justify-center justify-center">
            {/* <HybridCard
              icons={[
                <Zap key="ssg" className="h-6 w-6 text-green-600" />,
                <Code key="csr" className="h-6 w-6 text-purple-600" />,
              ]}
              title="SSG + CSR"
              subtitle="静态生成 + 客户端渲染"
              description="页面框架静态生成，动态功能客户端渲染。适用于博客、产品页面等。"
              link="/hybrid/ssg-csr"
              colors="from-green-50 to-purple-50"
            />  */}
            
            <HybridCard
              icons={[
                <Zap key="ssg" className="h-6 w-6 text-green-600" />,
                <Server key="ssr" className="h-6 w-6 text-blue-600" />,
              ]}
              title="PPR (Partial Prerendering)"
              subtitle="静态生成 (SSG) + 服务端渲染 (SSR)"
              description="静态组件预生成, 动态数据服务端渲染。适用于电商详情、用户中心。"
              link="/hybrid/ssr-ssg"
              colors="from-blue-50 to-green-50"
            />

            {/* <HybridCard
              icons={[
                <RefreshCw className="h-6 w-6 text-yellow-600" />,
                <Code key="csr" className="h-6 w-6 text-purple-600" />,
              ]}
              title="ISR + CSR"
              subtitle="增量再生成 + 客户端渲染"
              description="增量更新内容配合客户端渲染。适用于新闻网站、电商平台。"
              link="/hybrid/isr-csr"
              colors="from-yellow-50 to-purple-50"
            />  
            
            <HybridCard
              icons={[
                <Server key="ssr" className="h-6 w-6 text-blue-600" />,
                <Code key="csr" className="h-6 w-6 text-purple-600" />,
              ]}
              title="SSR + CSR"
              subtitle="服务端渲染 + 客户端渲染"
              description="关键内容服务端渲染，用户交互客户端处理。适用于社交媒体、新闻网站。"
              link="/hybrid/ssr-csr"
              colors="from-blue-50 to-purple-50"
            /> */}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500">点击上方卡片深入了解各种渲染策略的技术实现和最佳实践</p>
        </div>
      </div>
    </div>
  )
}

interface RenderingCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  performance: string
  seo: string
  caching: string
  link: string
  color: "purple" | "blue" | "green" | "yellow" | "indigo"
  large?: boolean
}

function RenderingCard({
  icon,
  title,
  subtitle,
  description,
  performance,
  seo,
  caching,
  link,
  color,
  large = false,
}: RenderingCardProps) {
  const colorClasses = {
    purple: "border-purple-200 bg-purple-50 hover:bg-purple-100",
    blue: "border-blue-200 bg-blue-50 hover:bg-blue-100",
    green: "border-green-200 bg-green-50 hover:bg-green-100",
    yellow: "border-yellow-200 bg-yellow-50 hover:bg-yellow-100",
    indigo: "border-indigo-200 bg-indigo-50 hover:bg-indigo-100",
  }

  const iconColorClasses = {
    purple: "text-purple-600",
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    indigo: "text-indigo-600",
  }

  const buttonColorClasses = {
    purple: "bg-purple-600 hover:bg-purple-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    yellow: "bg-yellow-600 hover:bg-yellow-700",
    indigo: "bg-indigo-600 hover:bg-indigo-700",
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className={`${colorClasses[color]} border-b transition-colors duration-300`}>
        <div className={`${iconColorClasses[color]} mb-3`}>{icon}</div>
        <CardTitle className={`${large ? "text-3xl" : "text-2xl"} mb-2`}>{title}</CardTitle>
        <CardDescription className={`font-semibold ${large ? "text-lg" : "text-base"}`}>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <p className={`text-gray-700 mb-6 leading-relaxed ${large ? "text-lg" : ""}`} style={{height: 78}}>{description}</p>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">性能:</span>
            <span className="font-semibold">{performance}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">SEO:</span>
            <span className="font-semibold">{seo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">缓存:</span>
            <span className="font-semibold">{caching}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={link}
          className={`w-full ${buttonColorClasses[color]} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${large ? "text-lg" : "text-base"}`}
        >
          深入了解 <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </CardFooter>
    </Card>
  )
}

interface HybridCardProps {
  icons: React.ReactNode[]
  title: string
  subtitle: string
  description: string
  link: string
  colors: string
}

function HybridCard({ icons, title, subtitle, description, link, colors }: HybridCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mx-auto text-center">
      <CardHeader className={`bg-gradient-to-r ${colors} border-b transition-colors duration-300`}>
        <div className="flex items-center space-x-2 mb-3">
          {icons[0]}
          <span className="text-gray-400">+</span>
          {icons[1]}
        </div>
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription className="font-semibold text-sm">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={link}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center text-base"
        >
          查看演示 <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </CardFooter>
    </Card>
  )
}
