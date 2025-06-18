import Link from "next/link"
import { ArrowLeft, Zap, RefreshCw, Clock, Building, Users, Award, Globe, Server, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import IsrContent from "./isr-content"
import dynamic from "next/dynamic"
import ClientWrapper from "./client-wrapper"

export const revalidate = 10;

export default function IsrCsrPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>

        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">ISR</span>
              <span className="text-gray-400 text-2xl">+</span>
              <Code className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">CSR</span>
            </div>
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-green-50 to-yellow-50 border-gray-200 text-base font-normal"
            >
              企业官网页面
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SSG 渲染的公司基础信息区域 */}
          <div className="lg:col-span-2 space-y-6">
            <IsrContent 
              ></IsrContent>
          </div>

          {/* ISR 渲染的动态内容区域 */}
          <div className="space-y-6">
            <ClientWrapper></ClientWrapper>
          </div>
        </div>

        {/* 混合渲染说明 */}
        {/* <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span>SSG + ISR 在企业官网的应用</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">稳定展示 (SSG)</h4>
                <p className="text-sm text-gray-600">
                  公司介绍、服务项目、联系方式等基础信息静态生成，为访客提供稳定可靠的企业形象
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">SEO优化</h4>
                <p className="text-sm text-gray-600">
                  静态生成的页面对搜索引擎友好，提升企业在搜索结果中的排名和曝光度
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-yellow-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">内容更新 (ISR)</h4>
                <p className="text-sm text-gray-600">
                  新闻动态、案例展示等内容通过ISR定期更新，保持网站信息的时效性和活跃度
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
