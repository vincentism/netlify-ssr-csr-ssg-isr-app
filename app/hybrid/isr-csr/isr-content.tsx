import Link from "next/link"
import { ArrowLeft, Zap, RefreshCw, Clock, Building, Users, Award, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const revalidate = 10;
export default async function IsrContent() {
  const buildTime = new Date().toLocaleString("zh-CN")
  // isr 
  const data = await fetch('https://api.example.com', {
    next: { revalidate: 10 }
  }).then(res =>  ({  })).catch(err => ({  }));

  const companyInfo = {
    name: "科技创新有限公司",
    slogan: "创新驱动未来，技术改变世界",
    establishYear: "2015",
    employees: '100',
    locations: "全球12个城市",
    services: [
      { name: "人工智能解决方案", description: "为企业提供定制化AI服务", icon: "🤖" },
      { name: "云计算平台", description: "安全可靠的云基础设施", icon: "☁️" },
      { name: "数据分析服务", description: "深度挖掘数据价值", icon: "📊" },
      { name: "移动应用开发", description: "跨平台应用解决方案", icon: "📱" },
    ],
    awards: ["2023年度最具创新力企业", "国家高新技术企业认证", "ISO 27001信息安全认证", "多项技术专利获得者"],
    contact: {
      address: "北京市朝阳区科技园区创新大厦",
      phone: "400-888-9999",
      email: "contact@company.com",
    },
    buildId: "ssg-isr-" + Math.random().toString(36).substr(2, 8),
  }

  return (
    <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
        <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-green-600" />
            <span className="text-green-700">ISR 公司基础信息</span>
        </CardTitle>
        <CardDescription>
            <p
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
              __html: `<span className="font-medium">渲染时间: ${buildTime}，10 秒后自动更新</span>`,
            }}
            ></p>
        </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="space-y-6">
            {/* 公司概览 */}
            <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border text-center">
                <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{companyInfo.establishYear}</div>
                <div className="text-sm text-gray-500">成立年份</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{companyInfo.employees}</div>
                <div className="text-sm text-gray-500">员工数量</div>
            </div>
            <div className="bg-white p-4 rounded-lg border text-center">
                <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">{companyInfo.locations}</div>
                <div className="text-sm text-gray-500">服务网络</div>
            </div>
            </div>

            {/* 服务项目 */}
            <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">核心服务</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companyInfo.services.map((service, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* 公司荣誉 */}
            <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                公司荣誉
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {companyInfo.awards.map((award, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border flex items-center space-x-2">
                    <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs font-medium text-yellow-600">
                    ✓
                    </span>
                    <span className="text-sm font-medium">{award}</span>
                </div>
                ))}
            </div>
            </div>
        </div>
        </CardContent>
    </Card>
  )
}
