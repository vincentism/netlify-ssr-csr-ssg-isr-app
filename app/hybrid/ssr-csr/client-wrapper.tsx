"use client"

import dynamic from "next/dynamic"
import { Clock } from "lucide-react"

// 动态导入客户端组件
const ClientUserSection = dynamic(() => import("./client-section"), {
  loading: () => (
    <div className="space-y-4">
      <div className="animate-pulse">
        <div className="h-4 bg-purple-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-purple-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-purple-200 rounded w-2/3"></div>
      </div>
      <p className="text-sm text-purple-600 flex items-center space-x-2">
        <Clock className="h-4 w-4 animate-spin" />
        <span>正在加载用户功能...</span>
      </p>
    </div>
  ),
  ssr: false,
})

export default function ClientWrapper() {
  return <ClientUserSection />
}
