import Link from "next/link"
import { Suspense } from 'react';
import { ArrowLeft, Server, Zap, Clock, Search, MapPin, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SSGSidebar from "./ssg-sidebar"
import SSRSearch from "./ssr-search";
import { LoadingFallback } from "@/components/loading-fallback";

export const experimental_ppr = true;

export default function SSRSSGPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>

        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-600">SSG</span>
              <span className="text-gray-400 text-2xl">+</span>
              <Server className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">SSR</span>
            </div>
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-blue-50 to-green-50  border-gray-200 text-base font-normal"
            >
              搜索结果页面
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SSG 渲染的静态筛选器 */}
          <div className="lg:col-span-1">
            <SSGSidebar />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <Suspense fallback={
                <LoadingFallback></LoadingFallback>
              }
            >
              <SSRSearch></SSRSearch>
            </Suspense>
          </div>
        </div>
        {/* 混合渲染说明 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span>SSR + SSG 在搜索结果页的应用</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">静态组件 (SSG)</h4>
                <p className="text-sm text-gray-600">
                  筛选器、导航栏、页面框架等组件静态生成，加载速度快，为用户提供稳定的搜索界面
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">动态结果 (SSR)</h4>
                <p className="text-sm text-gray-600">
                  搜索结果根据用户查询服务端实时生成，确保显示最新的商品信息和价格
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">SEO优化</h4>
                <p className="text-sm text-gray-600">
                  搜索结果页面可被搜索引擎抓取，提升商品在搜索引擎中的曝光度和排名
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
