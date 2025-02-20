export default {
  async fetch(request, env, ctx) {
    const AUTH_TOKEN = env.AUTH_TOKEN;
    const BENCHES_KV = env.BENCHES_KV;

    async function handleRequest(request) {
      const url = new URL(request.url);
      const { pathname, searchParams } = url;

      if (!request.headers.get('Authorization') === `Bearer ${AUTH_TOKEN}`) {
        return new Response('Unauthorized', { status: 401 });
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
        default:
          return new Response('Method Not Allowed', { status: 405 });
      }
    }

    async function handleGet(pathname, searchParams) {
      const id = pathname.split('/').pop();
      if (id) {
        const bench = await BENCHES_KV.get(id);
        return new Response(bench, { status: 200 });
      } else {
        const keys = await BENCHES_KV.list();
        if (keys.keys.length === 0) {
          return new Response('No items found', { status: 404 });
        }
        const benches = await Promise.all(keys.keys.map(key => BENCHES_KV.get(key.name)));
        return new Response(JSON.stringify(benches), { status: 200 });
      }
    }

    async function handlePost(request) {
      const bench = await request.json();
      await BENCHES_KV.put(bench.id, JSON.stringify(bench));
      return new Response('Bench created', { status: 201 });
    }

    async function handlePut(request) {
      const bench = await request.json();
      await BENCHES_KV.put(bench.id, JSON.stringify(bench));
      return new Response('Bench updated', { status: 200 });
    }

    async function handleDelete(pathname) {
      const id = pathname.split('/').pop();
      await BENCHES_KV.delete(id);
      return new Response('Bench deleted', { status: 200 });
    }

    return handleRequest(request);
  }
};