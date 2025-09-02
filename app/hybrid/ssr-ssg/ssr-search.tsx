import Link from "next/link"
import { ArrowLeft, Server, Zap, Clock, Search, MapPin, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { headers } from "next/headers"
import { sleep } from "@/lib/utils"

export default async function SSRSearch() {
  const headersList = await headers();
  const requestId = headersList.get('x-vercel-id') || 'local';
  await sleep(500, 1000);
  // 服务端动态生成的搜索结果数据
  const serverTime = new Date().toLocaleString("zh-CN")
  const searchQuery = "iPhone 15"

  // 模拟搜索结果数据（SSR）
  const searchResults = {
    query: searchQuery,
    totalResults: 2847,
    searchTime: "0.26秒",
    results: [
      {
        id: 1,
        title: "苹果 iPhone 15 Pro Max 256GB 深空黑色",
        price: 11999,
        originalPrice: 12999,
        rating: 4.8,
        reviewCount: 1247,
        seller: "苹果官方旗舰店",
        shipping: "免费配送",
        location: "北京",
        image: "/placeholder.svg?height=120&width=120",
        tags: ["官方正品", "全国联保", "顺丰速运"],
        sponsored: false,
      },
      {
        id: 2,
        title: "Apple iPhone 15 Pro 128GB 自然钛金色",
        price: 8999,
        originalPrice: 9999,
        rating: 4.7,
        reviewCount: 856,
        seller: "数码专营店",
        shipping: "满99免邮",
        location: "上海",
        image: "/placeholder.svg?height=120&width=120",
        tags: ["现货速发", "7天退换", "正品保障"],
        sponsored: true,
      },
      {
        id: 3,
        title: "iPhone 15 手机壳 透明防摔保护套",
        price: 59,
        originalPrice: 99,
        rating: 4.5,
        reviewCount: 3421,
        seller: "配件专营店",
        shipping: "包邮",
        location: "深圳",
        image: "/placeholder.svg?height=120&width=120",
        tags: ["热销配件", "买二送一", "当日发货"],
        sponsored: false,
      },
    ],
    relatedSearches: ["iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15 配件", "苹果手机壳"],
    searchSuggestions: ["iPhone 15 价格", "iPhone 15 评测", "iPhone 15 购买指南"],
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
        <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700">SSR 搜索结果区域</span>
        </CardTitle>
        <CardDescription>
            <p>
                <span className="font-medium">渲染时间:</span> {serverTime}
            </p>
        </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="space-y-6">
            {/* 搜索信息 */}
            <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-gray-500" />
                <span className="font-medium">搜索结果:</span>
                <span className="text-blue-600 font-semibold">"{searchResults.query}"</span>
                </div>
                <Badge variant="outline">{searchResults.totalResults.toLocaleString()} 个结果</Badge>
            </div>
            <div className="text-sm text-gray-600">
                耗时 {searchResults.searchTime} | 请求ID: {requestId}
            </div>
            </div>

            {/* 搜索结果列表 */}
            <div className="space-y-4">
            {searchResults.results.map((result) => (
                <div
                key={result.id}
                className={`bg-white p-4 rounded-lg border hover:shadow-md transition-shadow relative ${
                    result.sponsored ? "border-yellow-200 bg-yellow-50" : ""
                }`}
                >
                {result.sponsored && (
                    <Badge variant="secondary" className="absolute top-2 right-2 text-xs bg-yellow-200">
                    广告
                    </Badge>
                )}
                <div className="flex space-x-4">
                    <img
                    src={result.image || "/placeholder.svg"}
                    alt={result.title}
                    className="w-20 h-20 object-cover rounded border"
                    />
                    <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 leading-tight">{result.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                            key={i}
                            className={`h-3 w-3 ${
                                i < Math.floor(result.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                            />
                        ))}
                        </div>
                        <span className="text-sm text-gray-600">
                        {result.rating} ({result.reviewCount})
                        </span>
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-baseline space-x-2">
                        <span className="text-xl font-bold text-red-600">¥{result.price}</span>
                        {result.originalPrice > result.price && (
                            <span className="text-sm text-gray-500 line-through">¥{result.originalPrice}</span>
                        )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{result.seller}</span>
                        <span>•</span>
                        <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {result.location}
                        </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                        {result.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                            </Badge>
                        ))}
                        </div>
                        <div className="text-sm text-green-600">{result.shipping}</div>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>

            <div className="bg-blue-100 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
                ✅ <strong>SSR 优势:</strong> 搜索结果根据用户查询实时生成，
                确保展示最新的商品信息、价格和库存状态，提供准确的搜索体验。
            </p>
            </div>
        </div>
        </CardContent>
    </Card>
  )
}
