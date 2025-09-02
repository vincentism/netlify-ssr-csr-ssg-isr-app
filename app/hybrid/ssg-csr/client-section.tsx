"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Heart, MessageCircle, Share2, Clock, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"

interface ProductData {
  id: string
  name: string
  currentPrice: number
}

interface ClientInteractiveSectionProps {
  productData: ProductData
}

export default function ClientInteractiveSection({ productData }: ClientInteractiveSectionProps) {
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [selectedColor, setSelectedColor] = useState("深空黑色")
  const [selectedStorage, setSelectedStorage] = useState("256GB")
  const [recentViews, setRecentViews] = useState(0)
  const [stockCount, setStockCount] = useState(15)
  const [loadTime, setLoadTime] = useState<number | null>(null)
  
  const [renderTime, setRenderTime] = useState<string>();

  const colors = ["深空黑色", "自然钛金色", "白色钛金色", "蓝色钛金色"]
  const storageOptions = ["128GB", "256GB", "512GB", "1TB"]

  useEffect(() => {
    const startTime = performance.now()
    // 模拟客户端数据加载
    setTimeout(() => {
      setLoading(false)
      const endTime = performance.now()
      setLoadTime(endTime - startTime);
      setRenderTime(new Date().toLocaleString("zh-CN"));
    }, 800)

    // 模拟实时浏览数据
    const viewTimer = setInterval(() => {
      setRecentViews((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)

    // 模拟库存变化
    const stockTimer = setInterval(() => {
      setStockCount((prev) => Math.max(10, prev + Math.floor(Math.random() * 6) - 3))
    }, 10000)

    return () => {
      clearInterval(viewTimer)
      clearInterval(stockTimer)
    }
  }, [])

  const handleAddToCart = () => {
    setCartCount((prev) => prev + quantity)
  }

  const handleToggleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-purple-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-purple-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-purple-200 rounded w-2/3"></div>
        </div>
        <p className="text-sm text-purple-600 flex items-center space-x-2">
          <Clock className="h-4 w-4 animate-spin" />
          <span>正在加载购买选项...</span>
        </p>
      </div>
    )
  }

  return (
    <>
    <CardDescription>
      <p>
        <span className="font-medium">渲染时间:</span> {renderTime}
      </p>
    </CardDescription>
    <div className="space-y-6">
      {/* 实时数据 */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">实时信息</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border text-center">
            <div className="text-lg font-bold text-purple-600">{recentViews}</div>
            <div className="text-xs text-gray-500">近期浏览</div>
          </div>
          <div className="bg-white p-3 rounded-lg border text-center">
            <div className="text-lg font-bold text-red-600">{stockCount}</div>
            <div className="text-xs text-gray-500">剩余库存</div>
          </div>
        </div>
      </div>

      {/* 颜色选择 */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">选择颜色</h4>
        <div className="grid grid-cols-2 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`p-2 text-sm border rounded-lg transition-colors ${
                selectedColor === color
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* 存储选择 */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">选择存储</h4>
        <div className="grid grid-cols-2 gap-2">
          {storageOptions.map((storage) => (
            <button
              key={storage}
              onClick={() => setSelectedStorage(storage)}
              className={`p-2 text-sm border rounded-lg transition-colors ${
                selectedStorage === storage
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>

      {/* 数量选择 */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">购买数量</h4>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-medium px-4">{quantity}</span>
          <Button variant="outline" size="sm" onClick={() => handleQuantityChange(1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 购买操作 */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Button onClick={handleAddToCart} className="flex-1 bg-orange-500 hover:bg-orange-600" size="sm">
            <ShoppingCart className="h-3 w-3 mr-1" />
            加入购物车 ({cartCount})
          </Button>
          <Button variant="outline" onClick={handleToggleLike} className={isLiked ? "text-red-500" : ""} size="sm">
            <Heart className={`h-3 w-3 ${isLiked ? "fill-current" : ""}`} />
          </Button>
        </div>
        <Button className="w-full bg-red-500 hover:bg-red-600" size="sm">
          立即购买
        </Button>
      </div>

      {/* 社交功能 */}
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs">
          <Share2 className="h-3 w-3 mr-1" />
          分享
        </Button>
        <Button variant="outline" size="sm" className="flex-1 text-xs">
          <MessageCircle className="h-3 w-3 mr-1" />
          询问
        </Button>
      </div>

      {/* 购买保障 */}
      <div className="bg-white p-3 rounded-lg border">
        <h5 className="font-medium text-gray-900 mb-2">购买保障</h5>
        <div className="space-y-1 text-sm text-gray-600">
          <p>• 7天无理由退换</p>
          <p>• 全国联保，享受三包服务</p>
          <p>• 正品保证，假一赔十</p>
          <p>• 顺丰包邮，次日达</p>
        </div>
      </div>

      {/* CSR 特性说明 */}
      <div className="bg-purple-100 p-3 rounded-lg">
        <p className="text-sm text-purple-700">
          ⚡ <strong>CSR 特性:</strong> 购买选项、实时库存、购物车操作等功能在客户端渲染，
          支持用户个性化选择，实时响应用户操作，提供流畅的购物体验。
        </p>
      </div>
    </div>
  </>
  )
}
