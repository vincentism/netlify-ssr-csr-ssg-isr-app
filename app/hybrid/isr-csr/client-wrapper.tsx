"use client"

import dynamic from "next/dynamic"

// 动态导入客户端组件
const ClientUserSection = dynamic(() => import("./csr-content"), {
  ssr: false,
})

export default function ClientWrapper() {
  return <ClientUserSection />
}
