import Link from "next/link"
import { ArrowLeft, Layers, Code, Server, Zap, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HybridPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回首页
        </Link>

        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Layers className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">混合渲染策略</h1>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              Hybrid Rendering
            </Badge>
          </div>
          <p className="text-gray-600">
            在同一页面中组合多种渲染策略，针对不同内容区域采用最适合的渲染方式，实现性能与功能的最佳平衡
          </p>
        </div>

        {/* 混合渲染策略概览 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>为什么需要混合渲染？</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">现代应用的复杂性</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 页面包含多种类型的内容（静态信息、动态数据、用户交互）</li>
                  <li>• 不同内容区域有不同的更新频率和性能要求</li>
                  <li>• 需要平衡SEO、性能、用户体验和开发效率</li>
                  <li>• 单一渲染策略难以满足所有需求</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">混合渲染的优势</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 针对性优化：每个区域使用最适合的渲染方式</li>
                  <li>• 性能最优：静态内容快速加载，动态内容按需渲染</li>
                  <li>• SEO友好：关键内容服务端渲染，确保搜索引擎可见</li>
                  <li>• 用户体验：快速首屏 + 丰富交互</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 混合渲染策略 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* SSG + CSR */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-purple-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Zap className="h-5 w-5 text-green-600" />
                  <span className="text-green-600">SSG</span>
                  <span className="text-gray-400">+</span>
                  <Code className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-600">CSR</span>
                </div>
              </CardTitle>
              <CardDescription>静态生成 + 客户端渲染</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">实现方式</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    页面框架和基础内容使用SSG预生成，动态功能和用户交互部分使用CSR在客户端渲染
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">典型应用场景</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 电商产品页：产品基础信息SSG + 评论/推荐CSR</li>
                    <li>• 博客文章：文章内容SSG + 评论系统CSR</li>
                    <li>• 企业官网：页面结构SSG + 联系表单CSR</li>
                    <li>• 文档站点：文档内容SSG + 搜索功能CSR</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">代码示例</h5>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                    <div className="text-green-400">// 页面主体使用 SSG</div>
                    <div className="text-yellow-400">export const</div> dynamic ={" "}
                    <div className="text-green-300">'force-static'</div>
                    <br />
                    <div className="text-yellow-400">export default function</div>{" "}
                    <div className="text-blue-300">ProductPage</div>() {`{`}
                    <div className="ml-2">
                      <div className="text-yellow-400">return</div> (
                      <div className="ml-2">
                        <div className="text-red-400">&lt;div&gt;</div>
                        <div className="ml-2">
                          <div className="text-green-400">{`{/* SSG 渲染的静态内容 */}`}</div>
                          <div className="text-red-400">&lt;ProductInfo</div> data={`{staticData}`}{" "}
                          <div className="text-red-400">/&gt;</div>
                          <br />
                          <div className="text-green-400">{`{/* CSR 渲染的动态组件 */}`}</div>
                          <div className="text-red-400">&lt;ClientComponent&gt;</div>
                          <div className="ml-2">
                            <div className="text-red-400">&lt;Reviews</div> productId={`{id}`}{" "}
                            <div className="text-red-400">/&gt;</div>
                            <div className="text-red-400">&lt;Recommendations</div>{" "}
                            <div className="text-red-400">/&gt;</div>
                          </div>
                          <div className="text-red-400">&lt;/ClientComponent&gt;</div>
                        </div>
                        <div className="text-red-400">&lt;/div&gt;</div>
                      </div>
                      )
                    </div>
                    {`}`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SSR + CSR */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Server className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-600">SSR</span>
                  <span className="text-gray-400">+</span>
                  <Code className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-600">CSR</span>
                </div>
              </CardTitle>
              <CardDescription>服务端渲染 + 客户端渲染</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">实现方式</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    关键内容和SEO重要部分使用SSR，用户个性化和交互功能使用CSR
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">典型应用场景</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 社交媒体：动态内容SSR + 用户交互CSR</li>
                    <li>• 新闻网站：文章内容SSR + 个性化推荐CSR</li>
                    <li>• 电商首页：商品列表SSR + 购物车CSR</li>
                    <li>• 论坛：帖子内容SSR + 实时聊天CSR</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">代码示例</h5>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                    <div className="text-green-400">// 页面主体使用 SSR</div>
                    <div className="text-yellow-400">export const</div> dynamic ={" "}
                    <div className="text-green-300">'force-dynamic'</div>
                    <br />
                    <div className="text-yellow-400">export default async function</div>{" "}
                    <div className="text-blue-300">NewsPage</div>() {`{`}
                    <div className="ml-2">
                      <div className="text-yellow-400">const</div> articles ={" "}
                      <div className="text-yellow-400">await</div> <div className="text-blue-300">getArticles</div>()
                      <br />
                      <div className="text-yellow-400">return</div> (
                      <div className="ml-2">
                        <div className="text-red-400">&lt;div&gt;</div>
                        <div className="ml-2">
                          <div className="text-green-400">{`{/* SSR 渲染的文章列表 */}`}</div>
                          <div className="text-red-400">&lt;ArticleList</div> articles={`{articles}`}{" "}
                          <div className="text-red-400">/&gt;</div>
                          <br />
                          <div className="text-green-400">{`{/* CSR 渲染的用户功能 */}`}</div>
                          <div className="text-red-400">&lt;ClientComponent&gt;</div>
                          <div className="ml-2">
                            <div className="text-red-400">&lt;UserRecommendations</div>{" "}
                            <div className="text-red-400">/&gt;</div>
                            <div className="text-red-400">&lt;PersonalizedAds</div>{" "}
                            <div className="text-red-400">/&gt;</div>
                          </div>
                          <div className="text-red-400">&lt;/ClientComponent&gt;</div>
                        </div>
                        <div className="text-red-400">&lt;/div&gt;</div>
                      </div>
                      )
                    </div>
                    {`}`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SSG + ISR */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Zap className="h-5 w-5 text-green-600" />
                  <span className="text-green-600">SSG</span>
                  <span className="text-gray-400">+</span>
                  <RefreshCw className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-600">ISR</span>
                </div>
              </CardTitle>
              <CardDescription>静态生成 + 增量静态再生成</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">实现方式</h4>
                  <p className="text-sm text-gray-600 mb-3">页面框架和稳定内容使用SSG，需要定期更新的内容使用ISR</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">典型应用场景</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 新闻网站：页面结构SSG + 文章内容ISR</li>
                    <li>• 电商平台：分类页面SSG + 商品信息ISR</li>
                    <li>• 博客平台：主题样式SSG + 文章列表ISR</li>
                    <li>• 企业网站：公司信息SSG + 新闻动态ISR</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">代码示例</h5>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                    <div className="text-green-400">// layout.tsx - SSG 渲染</div>
                    <div className="text-yellow-400">export default function</div>{" "}
                    <div className="text-blue-300">Layout</div>() {`{`}
                    <div className="ml-2">
                      <div className="text-yellow-400">return</div> (
                      <div className="ml-2">
                        <div className="text-red-400">&lt;div&gt;</div>
                        <div className="ml-2">
                          <div className="text-red-400">&lt;Header</div> <div className="text-red-400">/&gt;</div>{" "}
                          <div className="text-green-400">{`{/* 静态 */}`}</div>
                          <div className="text-red-400">&lt;Navigation</div> <div className="text-red-400">/&gt;</div>{" "}
                          <div className="text-green-400">{`{/* 静态 */}`}</div>
                          <div className="text-red-400">&lt;main&gt;</div>
                          <div className="ml-2">
                            <div className="text-red-400">&lt;NewsContent</div>{" "}
                            <div className="text-red-400">/&gt;</div>{" "}
                            <div className="text-green-400">{`{/* ISR */}`}</div>
                          </div>
                          <div className="text-red-400">&lt;/main&gt;</div>
                          <div className="text-red-400">&lt;Footer</div> <div className="text-red-400">/&gt;</div>{" "}
                          <div className="text-green-400">{`{/* 静态 */}`}</div>
                        </div>
                        <div className="text-red-400">&lt;/div&gt;</div>
                      </div>
                      )
                    </div>
                    {`}`}
                    <br />
                    <div className="text-green-400">// news/page.tsx - ISR 渲染</div>
                    <div className="text-yellow-400">export const</div> revalidate ={" "}
                    <div className="text-blue-300">300</div> <div className="text-green-400">// 5分钟</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SSR + SSG */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Server className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-600">SSR</span>
                  <span className="text-gray-400">+</span>
                  <Zap className="h-5 w-5 text-green-600" />
                  <span className="text-green-600">SSG</span>
                </div>
              </CardTitle>
              <CardDescription>服务端渲染 + 静态生成</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">实现方式</h4>
                  <p className="text-sm text-gray-600 mb-3">动态内容使用SSR实时生成，静态组件和资源使用SSG预生成</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">典型应用场景</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 电商网站：商品详情SSR + 页面组件SSG</li>
                    <li>• 用户中心：个人信息SSR + 导航菜单SSG</li>
                    <li>• 搜索结果：搜索内容SSR + 筛选器SSG</li>
                    <li>• 内容平台：文章内容SSR + 侧边栏SSG</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">代码示例</h5>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                    <div className="text-green-400">// components/Sidebar.tsx - SSG</div>
                    <div className="text-yellow-400">export const</div> dynamic ={" "}
                    <div className="text-green-300">'force-static'</div>
                    <br />
                    <div className="text-green-400">// app/product/[id]/page.tsx - SSR</div>
                    <div className="text-yellow-400">export const</div> dynamic ={" "}
                    <div className="text-green-300">'force-dynamic'</div>
                    <br />
                    <div className="text-yellow-400">export default async function</div>{" "}
                    <div className="text-blue-300">ProductPage</div>() {`{`}
                    <div className="ml-2">
                      <div className="text-yellow-400">const</div> product ={" "}
                      <div className="text-yellow-400">await</div> <div className="text-blue-300">getProduct</div>(id)
                      <br />
                      <div className="text-yellow-400">return</div> (
                      <div className="ml-2">
                        <div className="text-red-400">&lt;div&gt;</div>
                        <div className="ml-2">
                          <div className="text-red-400">&lt;Sidebar</div> <div className="text-red-400">/&gt;</div>{" "}
                          <div className="text-green-400">{`{/* SSG 组件 */}`}</div>
                          <div className="text-red-400">&lt;ProductDetails</div> product={`{product}`}{" "}
                          <div className="text-red-400">/&gt;</div>{" "}
                          <div className="text-green-400">{`{/* SSR 内容 */}`}</div>
                        </div>
                        <div className="text-red-400">&lt;/div&gt;</div>
                      </div>
                      )
                    </div>
                    {`}`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 实现最佳实践 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>混合渲染最佳实践</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">设计原则</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • <strong>内容分层：</strong>根据内容特性选择渲染策略
                  </li>
                  <li>
                    • <strong>性能优先：</strong>关键路径使用最快的渲染方式
                  </li>
                  <li>
                    • <strong>SEO考虑：</strong>重要内容确保服务端渲染
                  </li>
                  <li>
                    • <strong>用户体验：</strong>平衡首屏速度和交互响应
                  </li>
                  <li>
                    • <strong>缓存策略：</strong>合理设置不同内容的缓存时间
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">技术实现</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • <strong>组件边界：</strong>明确划分静态和动态组件
                  </li>
                  <li>
                    • <strong>数据获取：</strong>在合适的层级获取数据
                  </li>
                  <li>
                    • <strong>错误处理：</strong>为不同渲染方式设置降级策略
                  </li>
                  <li>
                    • <strong>监控指标：</strong>跟踪各部分的性能表现
                  </li>
                  <li>
                    • <strong>渐进增强：</strong>确保基础功能在所有环境下可用
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 选择指南 */}
        <Card>
          <CardHeader>
            <CardTitle>如何选择混合渲染策略？</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">内容分析</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 更新频率</li>
                    <li>• 个性化程度</li>
                    <li>• SEO重要性</li>
                    <li>• 交互复杂度</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">性能要求</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 首屏加载时间</li>
                    <li>• 交互响应速度</li>
                    <li>• 服务器负载</li>
                    <li>• 带宽使用</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">技术约束</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 开发复杂度</li>
                    <li>• 维护成本</li>
                    <li>• 团队技能</li>
                    <li>• 基础设施</li>
                  </ul>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">💡 推荐策略</h4>
                <p className="text-sm text-indigo-700">
                  从简单的混合开始（如SSG + CSR），根据实际需求逐步优化。
                  使用性能监控工具测量不同策略的效果，基于数据做出调整。 考虑使用Next.js的App
                  Router，它提供了更灵活的混合渲染支持。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
