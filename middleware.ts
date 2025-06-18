import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
import { MiddlewareRequest, type NextRequest } from '@netlify/next';

 
export function middleware(req: NextRequest) {

  // console.log('pathname',  req.nextUrl);

  const testheader = req.headers.get('x-nf-request-id');


  const { pathname } = req.nextUrl;
  console.log('inssspathnameksks', pathname);
  if (pathname.startsWith("/api/hello")) {



    // Add a header to the rewritten request

    const request = new MiddlewareRequest(req);

    // Clone the request headers and set a new header `x-hello-from-middleware1`
    request.headers.set('x-hello-from-middleware1', 'hello1')

    return request.next();

  }




  // console.log('in middleware');
 
  // // You can also set request headers in NextResponse.next
  // const response = NextResponse.next({
  //   request: {
  //     // New request headers
  //     headers: request.headers,
  //   },
  // })
 
  // // Set a new response header `x-hello-from-middleware2`
  // response.headers.set('x-hello-from-middleware2', 'hello2')
  // return response


}


// import { NextResponse } from 'next/server'
// import { MiddlewareRequest, type NextRequest } from '@netlify/next';

 
// // This function can be marked `async` if using `await` inside
// export function middleware(req: NextRequest) {
//   // return NextResponse.redirect(new URL('/home', request.url))

//   const { pathname } = req.nextUrl;
//   const request = new MiddlewareRequest(req);

//   if (pathname.startsWith("/api/hello")) {
//     // Add a header to the request
//     request.headers.set("x-hello", "world");

//     return request.next();
//   }

//   if (pathname.startsWith("/headers")) {
//     // Add a header to the rewritten request
//     request.headers.set("x-hello", "world");
    
//     return request.rewrite("/api/hello");
//   }


// }
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }