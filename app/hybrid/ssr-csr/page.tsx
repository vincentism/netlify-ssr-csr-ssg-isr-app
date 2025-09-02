import Link from "next/link"
import { ArrowLeft, Server, Code, Clock, Star, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ClientWrapper from "./client-wrapper"

// SSR 部分 - 服务端渲染
export const dynamic = "force-dynamic"

export default function SSRCSRPage() {
  // 服务端生成的实时数据
  const serverTime = new Date().toLocaleString("zh-CN")
  const requestId = Math.random().toString(36).substr(2, 9)
  const pageLoadTime = new Date().toLocaleString("zh-CN")
  const renderStartTime = Date.now()

  // 模拟电商首页的实时数据
  const homePageData = {
    featuredProducts: [
      {
        id: 1,
        name: "iPhone 15 Pro Max",
        originalPrice: 12999,
        salePrice: 11999,
        discount: 23,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.8,
        sales: 1247,
        tag: "限时特惠",
      },
      {
        id: 2,
        name: "MacBook Pro 14英寸",
        originalPrice: 15999,
        salePrice: 14999,
        discount: 6,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.9,
        sales: 856,
        tag: "新品上市",
      },
      {
        id: 3,
        name: "AirPods Pro",
        originalPrice: 2399,
        salePrice: 1999,
        discount: 17,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.7,
        sales: 2134,
        tag: "热销单品",
      },
      {
        id: 4,
        name: "iPad Air",
        originalPrice: 5199,
        salePrice: 4699,
        discount: 10,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4.6,
        sales: 734,
        tag: "学生优选",
      },
    ],
    dailyDeals: [
      { name: "智能手表", discount: "5折起", endsIn: "23:45:12" },
      { name: "无线耳机", discount: "7折", endsIn: "12:30:45" },
    ],
    categories: [
      { name: "手机数码", count: 15420, trending: true },
      { name: "电脑办公", count: 8930, trending: false },
      { name: "家用电器", count: 12680, trending: true },
      { name: "服饰鞋包", count: 25040, trending: false },
      { name: "运动户外", count: 9870, trending: true },
      { name: "美妆护肤", count: 18760, trending: false },
    ],
    siteStats: {
      onlineUsers: Math.floor(Math.random() * 5000) + 15000,
      todayOrders: Math.floor(Math.random() * 1000) + 3000,
      totalProducts: 156789,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>

        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center space-x-2">
              <Server className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">SSR</span>
              <span className="text-gray-400 text-2xl">+</span>
              <Code className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">CSR</span>
            </div>
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200 text-base font-normal"
            >
              电商首页演示
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SSR 渲染的商品内容区域 */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-700">SSR 商品展示区域</span>
                </CardTitle>
                <CardDescription>
                  <p>
                    <span className="font-medium">渲染时间:</span> {pageLoadTime}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 今日特惠 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-orange-500" />
                      今日特惠
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {homePageData.dailyDeals.map((deal, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border flex justify-between items-center">
                          <div>
                            <span className="font-medium">{deal.name}</span>
                            <Badge variant="destructive" className="ml-2 text-xs">
                              {deal.discount}
                            </Badge>
                          </div>
                          <div className="text-sm text-red-600 font-mono">{deal.endsIn}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 热门商品 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-red-500" />
                      热门商品
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {homePageData.featuredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
                        >
                          <div className="relative mb-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-32 object-cover rounded"
                            />
                            <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
                              {product.tag}
                            </Badge>
                          </div>
                          <h5 className="font-medium text-gray-900 mb-2 text-sm leading-tight">{product.name}</h5>
                          <div className="flex items-center space-x-1 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({product.sales})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-lg font-bold text-red-600">¥{product.salePrice}</span>
                              <span className="text-sm text-gray-500 line-through ml-2">¥{product.originalPrice}</span>
                            </div>
                            <Badge variant="outline" className="text-xs text-red-600">
                              -{product.discount}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-100 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      ✅ <strong>SSR 优势:</strong> 商品信息、价格、库存在服务端实时渲染，
                      确保用户看到最新的商品状态，搜索引擎可以抓取到完整的商品信息。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CSR 渲染的用户功能区域 */}
          <div className="space-y-6">
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-700">CSR 用户功能区域</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ClientWrapper /> 
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 混合渲染说明 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span>SSR + CSR 在电商首页的应用</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">实时商品信息 (SSR)</h4>
                <p className="text-sm text-gray-600">
                  商品价格、库存、促销信息在服务端实时渲染，确保用户看到最新的商品状态
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">SEO优化</h4>
                <p className="text-sm text-gray-600">
                  商品信息可被搜索引擎完整抓取，提升商品在搜索结果中的曝光度和排名
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">个性化体验 (CSR)</h4>
                <p className="text-sm text-gray-600">
                  用户登录状态、购物车、个性化推荐等功能在客户端实现，提供定制化体验
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
