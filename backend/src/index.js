export default {
  async fetch(request, env, ctx) {
    const AUTH_TOKEN = env.AUTH_TOKEN;
    const BENCHES_KV = env.BENCHES_KV;

    async function handleRequest(request) {
      const url = new URL(request.url);
      const { pathname, searchParams } = url;

      if (!request.headers.get('Authorization') === `Bearer ${AUTH_TOKEN}`) {
        return new Response(JSON.stringify({'message':'Unauthorised'}), { status: 401, headers: getCorsHeaders() });
      }

      switch (request.method) {
        case 'GET':
          return handleGet(pathname, searchParams);
        case 'POST':
          return handlePost(request);
        case 'PUT':
          return handlePut(request);
        case 'DELETE':
          return handleDelete(pathname);
        case 'OPTIONS':
          return handleOptions();
        default:
          return new Response(JSON.stringify({'message':'Method not allowed'}), { status: 405, headers: getCorsHeaders() });
      }
    }

    async function handleGet(pathname, searchParams) {
      const id = pathname.split('/').pop();
      if (id) {
        const bench = await BENCHES_KV.get(id);
        return new Response(bench, { status: 200, headers: getCorsHeaders() });
      } else {
        const keys = await BENCHES_KV.list();
        if (keys.keys.length === 0) {
          return new Response(JSON.stringify({'message':'No items found'}), { status: 404, headers: getCorsHeaders() });
        }
        const benches = await Promise.all(keys.keys.map(key => BENCHES_KV.get(key.name)));
        return new Response(JSON.stringify(benches), { status: 200, headers: getCorsHeaders() });
      }
    }

    async function handlePost(request) {
      const bench = await request.json();
      await BENCHES_KV.put(bench.id, JSON.stringify(bench));
      return new Response(JSON.stringify({'message':'Bench created'}), { status: 201, headers: getCorsHeaders() });
    }

    async function handlePut(request) {
      const bench = await request.json();
      await BENCHES_KV.put(bench.id, JSON.stringify(bench));
      return new Response(JSON.stringify({'message':'Bench updated'}), { status: 200, headers: getCorsHeaders() });
    }

    async function handleDelete(pathname) {
      const id = pathname.split('/').pop();
      await BENCHES_KV.delete(id);
      return new Response(JSON.stringify({'message':'Bench deleted'}), { status: 200, headers: getCorsHeaders() });
    }

    function handleOptions() {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders()
      });
    }

    function getCorsHeaders() {
      return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type'
      };
    }

    return handleRequest(request);
  }
};