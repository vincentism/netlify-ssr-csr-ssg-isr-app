import crypto from 'node:crypto';

// export default function onRequest(context) {
//   const {geo} = context;

//   return new Response(JSON.stringify({
//     message: 'Hello Node!',
//     geo: geo,
//   }), {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
// }

export default function onRequest(context) {
  const sig = crypto.createHmac('sha256', '123').update('321').digest('base64');
  xxx();
  return new Response(sig)
}