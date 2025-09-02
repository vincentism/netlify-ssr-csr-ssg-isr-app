"use client";

import { RefreshCw, Calendar, TrendingUp, FileText, ExternalLink, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRandomNews } from './news-data';
import { sleep } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CsrContentSection() {
  const [loading, setLoading] = useState(true);
  // ISR 生成的动态数据
  const [renderTime, setRenderTime] = useState<string>();
  const [companyNews, setCompanyNews] = useState<any>();

   useEffect(() => {
    // 模拟用户数据加载
    setTimeout(() => {
      setRenderTime(new Date().toLocaleString("zh-CN"));
      setLoading(false);
      setCompanyNews(getRandomNews());
    }, 1000);
  }, []);

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
          <span>正在加载数据...</span>
        </p>
      </div>
    )
  }

  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 text-yellow-600" />
          <span className="text-yellow-700">CSR 内容区域</span>
        </CardTitle>
        <CardDescription>
         <span className="font-medium">渲染时间: {renderTime}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 最新动态 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              最新动态
            </h4>
            <div className="space-y-3">
              {companyNews.map((news: any) => (
                <div key={news.id} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-gray-900 text-sm leading-tight flex-1">{news.title}</h5>
                    {news.isHot && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        热门
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2 leading-relaxed">{news.summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {news.category}
                      </Badge>
                      <span>{news.publishDate}</span>
                    </div>
                    <span>{news.readCount} 阅读</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
