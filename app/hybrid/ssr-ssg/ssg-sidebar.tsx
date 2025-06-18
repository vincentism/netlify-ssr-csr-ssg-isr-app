import { Zap, DollarSign, Star, Truck, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// SSG 组件 - 静态生成
// export const dynamic = "force-static"

export default async function SSGSidebar() {
  const buildTime = new Date().toLocaleString("zh-CN")
  const priceRanges = [
    { label: "0-500元", count: 1240 },
    { label: "500-1000元", count: 423 },
    { label: "1000-5000元", count: 234 },
    { label: "5000元以上", count: 94 },
  ]

  const brands = [
    { name: "苹果 Apple", count: 234, popular: true },
    { name: "华为 HUAWEI", count: 189, popular: true },
    { name: "小米 Xiaomi", count: 167, popular: false },
    { name: "OPPO", count: 123, popular: false },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-green-600" />
            <span className="text-green-700">SSG 筛选组件</span>
          </CardTitle>
          <CardDescription>
            <p
              dangerouslySetInnerHTML={{
              __html: `<span className="font-medium">渲染时间: ${buildTime}</span>`,
            }}
            ></p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 价格筛选 */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                价格区间
              </h4>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm border rounded hover:bg-gray-50 flex justify-between items-center"
                  >
                    <span>{range.label}</span>
                    <span className="text-gray-500">({range.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 品牌筛选 */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">品牌</h4>
              <div className="space-y-2">
                {brands.map((brand, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm border rounded hover:bg-gray-50 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{brand.name}</span>
                      {brand.popular && (
                        <Badge variant="destructive" className="text-xs">
                          热门
                        </Badge>
                      )}
                    </div>
                    <span className="text-gray-500">({brand.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 清除筛选 */}
            <div className="border-t pt-4">
              <Button variant="outline" size="sm" className="w-full">
                清除所有筛选
              </Button>
            </div>

            <div className="bg-green-100 p-3 rounded-lg">
              <p className="text-sm text-green-700">
                ⚡ <strong>SSG 特性:</strong> 筛选器组件在构建时生成，
                为所有搜索页面提供一致的筛选界面，加载速度快，用户体验稳定。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
