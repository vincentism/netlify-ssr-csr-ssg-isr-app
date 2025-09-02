'use client'

import { useState } from 'react'

export default function RevalidateButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRevalidate = async () => {
    setIsLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/test-isr?path=/isr')
      const data = await response.json()
      
      if (data.success) {
        setMessage('✅ 重新验证成功！请刷新页面查看更新。')
        // 3秒后刷新页面
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } else {
        setMessage('❌ 重新验证失败：' + data.message)
      }
    } catch (error) {
      setMessage('❌ 请求失败：' + (error instanceof Error ? error.message : '未知错误'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleRevalidate}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '重新验证中...' : '手动重新验证'}
      </button>
      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  )
} 