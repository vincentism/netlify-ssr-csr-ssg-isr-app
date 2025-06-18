"use client"

import { useState, useEffect } from "react"
import { User, ShoppingCart, Heart, Search, Clock, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardDescription } from "@/components/ui/card"

export default function ClientUserSection() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [cartItems, setCartItems] = useState(3)
  const [wishlistCount, setWishlistCount] = useState(8)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [coupons, setCoupons] = useState<any[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([])
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("zh-CN"))
  const [renderTime, setRenderTime] = useState<string>();

  useEffect(() => {
    // 模拟用户数据加载
    setTimeout(() => {
      setUser({
        name: "张三",
        avatar: "👤",
        level: "黄金会员",
        points: 2580,
      })

      setSearchHistory(["iPhone 15", "MacBook Pro", "AirPods", "iPad"])

      setRecommendations([
        { name: "智能手表", price: "¥2,299", discount: "8.5折" },
        { name: "无线充电器", price: "¥199", discount: "限时9折" },
        { name: "蓝牙音响", price: "¥599", discount: "买一送一" },
      ])

      setCoupons([
        { title: "满1000减100", expiry: "3天后到期", type: "通用券" },
        { title: "数码产品9折", expiry: "7天后到期", type: "品类券" },
      ])

      setRecentlyViewed(["iPhone 15 Pro", "MacBook Air", "AirPods Pro", "iPad Air"])

      setRenderTime(new Date().toLocaleString("zh-CN"));
      setLoading(false)
    }, 1000)

    // 模拟购物车数量变化
    const cartTimer = setInterval(() => {
      if (Math.random() > 0.8) {
        setCartItems((prev) => prev + Math.floor(Math.random() * 2))
      }
    }, 5000)

    // 实时更新当前时间
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("zh-CN"))
    }, 1000)

    return () => {
      clearInterval(cartTimer)
      clearInterval(timeInterval)
    }
  }, [])

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
          <span>正在加载用户数据...</span>
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
      {/* 用户信息 */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <User className="h-4 w-4 mr-2" />
          用户中心
        </h4>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{user.avatar}</span>
            <div>
              <div className="font-medium">{user.name}</div>
              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                {user.level}
              </Badge>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>积分余额: {user.points} 分</p>
          </div>
        </div>
      </div>

      {/* 购物车和收藏 */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">快速入口</h4>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs">购物车({cartItems})</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <Heart className="h-5 w-5" />
            <span className="text-xs">收藏({wishlistCount})</span>
          </Button>
        </div>
      </div>

      {/* 优惠券 */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Gift className="h-4 w-4 mr-2" />
          我的优惠券
        </h4>
        <div className="space-y-2">
          {coupons.map((coupon, index) => (
            <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border border-red-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm text-red-700">{coupon.title}</p>
                  <p className="text-xs text-gray-500">{coupon.expiry}</p>
                </div>
                <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                  {coupon.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* CSR 特性说明 */}
      <div className="bg-purple-100 p-3 rounded-lg">
        <p className="text-sm text-purple-700">
          ⚡ <strong>CSR 特性:</strong> 用户个人信息、购物车状态、搜索历史、
          个性化推荐等功能在客户端渲染，提供定制化的购物体验，无需刷新页面即可更新状态。
        </p>
        <p className="text-sm text-purple-700">当前时间: {currentTime}</p>
      </div>
    </div>
  </>
  )
}
