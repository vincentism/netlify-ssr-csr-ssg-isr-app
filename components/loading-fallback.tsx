export function LoadingFallback() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 animate-pulse">
      <h2 className="text-xl font-bold text-gray-600 mb-4">🔄 加载中...</h2>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            <div className="h-3 bg-gray-300 rounded w-2/5"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
