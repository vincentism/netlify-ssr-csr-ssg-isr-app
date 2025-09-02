import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || '/isr'
  
  try {
    // 重新验证指定的路径
    revalidatePath(path)
    
    return Response.json({
      success: true,
      message: `Successfully revalidated path: ${path}`,
      timestamp: new Date().toISOString(),
      revalidatedPath: path
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Failed to revalidate',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const path = body.path || '/isr'
  
  try {
    // 重新验证指定的路径
    revalidatePath(path)
    
    return Response.json({
      success: true,
      message: `Successfully revalidated path: ${path}`,
      timestamp: new Date().toISOString(),
      revalidatedPath: path
    })
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Failed to revalidate',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 