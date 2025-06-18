import Link from "next/link"
import { ArrowLeft, Zap, Code, Clock, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ClientInteractiveSection from "./client-section"

// SSG 部分 - 静态生成
export const dynamic = "force-static"

export default function SSGCSRPage() {
  // 构建时生成的静态产品数据
  const buildTime = new Date().toLocaleString("zh-CN")
  const pageLoadTime = new Date().toLocaleString("zh-CN")
  const renderStartTime = Date.now()
  const productData = {
    id: "prod_001",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    originalPrice: 12999,
    currentPrice: 11999,
    discount: "限时优惠 ¥1000",
    rating: 4.8,
    reviewCount: 2847,
    description: "搭载 A17 Pro 芯片的 iPhone 15 Pro Max，配备钛金属设计，拍照性能卓越，电池续航出色。",
    specifications: [
      { name: "屏幕尺寸", value: "6.7英寸" },
      { name: "芯片", value: "A17 Pro" },
      { name: "存储", value: "256GB" },
      { name: "摄像头", value: "4800万像素主摄" },
      { name: "颜色", value: "深空黑色" },
    ],
    features: [
      "钛金属设计，轻盈坚固",
      "A17 Pro 芯片，性能强劲",
      "4800万像素主摄系统",
      "ProRAW 和 ProRes 拍摄",
      "USB-C 接口",
      "最长 29 小时视频播放",
    ],
    images: [
      "/iphone-15-model-unselect-gallery-1-202309.webp",
      "/iphone15-2.jpg",
      "/iphone15-3.webp",
      "/iphone15-4.png",
    ],
    buildId: "ssg-" + Math.random().toString(36).substr(2, 8),
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
              <Zap className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-600">SSG</span>
              <span className="text-gray-400 text-2xl">+</span>
              <Code className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">CSR</span>
            </div>
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-green-50 to-purple-50 border-gray-200 text-base font-normal"
            >
              电商产品页演示
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SSG 渲染的产品信息区域 */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  <span className="text-green-700">SSG 产品信息区域</span>
                </CardTitle>
                <CardDescription>
                  <p>
                    <span className="font-medium">渲染时间:</span> {buildTime}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 产品主图 */}
                  <div className="bg-white p-4 rounded-lg border">
                    <img
                      src={productData.images[0] || "/placeholder.svg"}
                      alt={productData.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <div className="flex space-x-2">
                      {productData.images.map((img, index) => (
                        <img
                          key={index}
                          src={img || "/placeholder.svg"}
                          alt={`产品图 ${index + 1}`}
                          className="w-16 h-16 object-cover rounded border cursor-pointer hover:border-blue-500"
                        />
                      ))}
                    </div>
                  </div>

                  {/* 产品基本信息 */}
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="mb-4">
                      <Badge variant="outline" className="text-xs mb-2">
                        {productData.brand}
                      </Badge>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{productData.name}</h2>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(productData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {productData.rating} ({productData.reviewCount} 评价)
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{productData.description}</p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-baseline space-x-3 mb-3">
                        <span className="text-3xl font-bold text-red-600">¥{productData.currentPrice}</span>
                        <span className="text-lg text-gray-500 line-through">¥{productData.originalPrice}</span>
                        <Badge variant="destructive" className="text-xs">
                          {productData.discount}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* 产品规格 */}
                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-900 mb-3">产品规格</h3>
                    <div className="space-y-2">
                      {productData.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{spec.name}</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✅ <strong>SSG 优势:</strong> 产品信息、图片、规格等在构建时生成，
                      搜索引擎可以完整抓取产品信息，首屏加载速度极快，有利于SEO和用户体验。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CSR 渲染的用户交互区域 */}
          <div className="space-y-6">
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-700">CSR 用户交互区域</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ClientInteractiveSection productData={productData} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 混合渲染说明 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span>SSG + CSR 在电商产品页的应用</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">SEO优化 (SSG)</h4>
                <p className="text-sm text-gray-600">
                  产品信息、图片、描述在构建时生成，搜索引擎可以完整抓取，有利于商品在搜索结果中的排名
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">极速加载</h4>
                <p className="text-sm text-gray-600">
                  静态生成的产品页面加载速度极快，用户能立即看到产品信息，提升购买转化率
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">丰富交互 (CSR)</h4>
                <p className="text-sm text-gray-600">
                  购买按钮、收藏、评价、购物车等交互功能在客户端实现，提供动态的购物体验
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
