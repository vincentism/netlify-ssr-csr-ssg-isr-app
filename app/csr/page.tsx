"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Code, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CSRPage() {
  const [loading, setLoading] = useState(true)
  const [loadStartTime] = useState(Date.now())
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [clientTime, setClientTime] = useState<string>("")
  const [clientData, setClientData] = useState({
    day_of_week: 0,
    day_of_year: 0,
    week_number: 0,
  })

  useEffect(() => {
    // 简化逻辑，直接使用客户端时间
    const now = new Date()
    setClientTime(now.toLocaleString("zh-CN"))

    // 计算一些基本数据
    setClientData({
      day_of_week: now.getDay(),
      day_of_year: Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)),
      week_number: Math.ceil(now.getDate() / 7),
    })

    // 模拟加载时间
    setTimeout(() => {
      setLoadTime(Date.now() - loadStartTime)
      setLoading(false)
    }, 500)

    // 每秒更新时间
    const timer = setInterval(() => {
      setClientTime(new Date().toLocaleString("zh-CN"))
    }, 1000)

    return () => clearInterval(timer)
  }, [loadStartTime])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>

        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Code className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">客户端渲染 (CSR)</h1>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Client-Side Rendering
            </Badge>
          </div>
          <p className="text-gray-600">在浏览器中使用 JavaScript 动态渲染内容，提供高度交互性的用户体验</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">渲染位置</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">浏览器端</p>
              <p className="text-sm text-gray-500">JavaScript 运行时</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">数据获取时机</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">页面加载后</p>
              <p className="text-sm text-gray-500">useEffect / 事件触发</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">加载时间</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">{loadTime ? `${loadTime}ms` : "计算中..."}</p>
              <p className="text-sm text-gray-500">客户端数据获取</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span>实时数据演示</span>
            </CardTitle>
            <CardDescription>以下数据通过客户端 JavaScript 获取，展示 CSR 的动态特性</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="animate-pulse h-4 bg-gray-200 rounded w-2/3"></div>
                <p className="text-sm text-purple-600 flex items-center space-x-2">
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>正在客户端获取数据...</span>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">当前（渲染）时间:</span> {clientTime}
                    </p>
                    <p>
                      <span className="font-medium">星期:</span> {clientData.day_of_week}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">年份第几天:</span> {clientData.day_of_year}
                    </p>
                    <p>
                      <span className="font-medium">周数:</span> {clientData.week_number}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700">
                    💡 <strong>CSR 特性:</strong> 数据在页面加载完成后通过 JavaScript 获取，
                    页面内容完全在客户端渲染。注意时间会实时更新，这是客户端渲染的特点。
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>技术实现</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="text-green-400">// Next.js App Router CSR 实现</div>
              <div className="text-blue-400">'use client'</div>
              <br />
              <div className="text-yellow-400">import</div> {`{ useEffect, useState }`}{" "}
              <div className="text-yellow-400">from</div> <div className="text-green-300">'react'</div>
              <br />
              <div className="text-yellow-400">export default function</div>{" "}
              <div className="text-blue-300">CSRPage</div>() {`{`}
              <div className="ml-4">
                <div className="text-yellow-400">const</div> [time, setTime] ={" "}
                <div className="text-blue-300">useState</div>(<div className="text-green-300">''</div>)
                <br />
                <div className="text-yellow-400">useEffect</div>(() {`=> {`}
                <div className="ml-4">
                  <div className="text-yellow-400">const</div> updateTime = () {`=> {`}
                  <div className="ml-4">
                    <div className="text-blue-300">setTime</div>(<div className="text-yellow-400">new</div>{" "}
                    <div className="text-blue-300">Date</div>().<div className="text-blue-300">toLocaleString</div>())
                  </div>
                  {`}`}
                  <br />
                  updateTime()
                  <br />
                  <div className="text-yellow-400">const</div> timer = <div className="text-blue-300">setInterval</div>
                  (updateTime, <div className="text-blue-300">1000</div>)
                  <br />
                  <div className="text-yellow-400">return</div> () {`=> {`}
                  <div className="ml-4">
                    <div className="text-blue-300">clearInterval</div>(timer)
                  </div>
                  {`}`}
                </div>
                {`}, [])`}
                <br />
                <div className="text-yellow-400">return</div> <div className="text-red-400">&lt;div&gt;</div>
                {`{time}`}
                <div className="text-red-400">&lt;/div&gt;</div>
              </div>
              {`}`}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
