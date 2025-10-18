const rewrite = async (request, context) => {
    const path = context.geo?.country?.code === 'AU' ? '/edge/australia' : '/edge/not-australia';
    // return new URL(path, request.url);
    return new Response('Hello, world!', { status: 200 });
};

export const config = {
    path: '/api/edge'
};

export default rewrite;
