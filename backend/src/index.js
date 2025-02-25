import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "./utils/mimeMessage";

export default {
  async fetch(request, env, ctx) {
    const AUTH_TOKEN = env.AUTH_TOKEN;
    const BENCHES_KV = env.BENCHES_KV;
    const REVIEW_EMAIL_ADDRESS = env.REVIEW_EMAIL_ADDRESS;

    async function handleRequest(request) {
      const url = new URL(request.url);
      const { pathname, searchParams } = url;

      if (!request.headers.get('Authorization') === `Bearer ${AUTH_TOKEN}`) {
        return new Response(JSON.stringify({'message':'Unauthorised'}), { status: 401, headers: getCorsHeaders() });
      }
      console.log(request.method, pathname);
      switch (request.method.toUpperCase()) {
        case 'GET':
          return handleGet(pathname, searchParams);
        case 'POST':
          return handlePost(request);
        case 'PATCH':
          return handlePatch(request);
        case 'DELETE':
          return handleDelete(pathname);
        case 'OPTIONS':
          return handleOptions();
        case 'PUT':
          return handlePut(request);
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
        const approvedBenches = benches.filter(bench => bench && JSON.parse(bench).reviewed);
        if (approvedBenches.length === 0) {
          return new Response(JSON.stringify({'message':'No approved benches found'}), { status: 404, headers: getCorsHeaders() });
        }
        return new Response(JSON.stringify(approvedBenches), { status: 200, headers: getCorsHeaders() });
      }
    }

    async function handlePost(request) {
      const bench = await request.json();
      bench.reviewed = false;
      bench.submissionDate = new Date().toISOString();
      await BENCHES_KV.put(bench.id, JSON.stringify(bench));
      await sendReviewEmail(bench.id);
      return new Response(JSON.stringify({'message':'Bench submitted for review'}), { status: 201, headers: getCorsHeaders() });
    }

    async function handlePatch(request) {
      const partialBench = await request.json();
      const existingBench = await BENCHES_KV.get(partialBench.id);
      if (!existingBench) {
        return new Response(JSON.stringify({'message':'Bench not found'}), { status: 404, headers: getCorsHeaders() });
      }
      const updatedBench = { ...JSON.parse(existingBench), ...partialBench };
      await BENCHES_KV.put(updatedBench.id, JSON.stringify(updatedBench));
      return new Response(JSON.stringify({'message':'Bench updated'}), { status: 200, headers: getCorsHeaders() });
    }

    async function handlePut(request) {
      const bench = await request.json();
      const existingBench = await BENCHES_KV.get(bench.id);
      if (!existingBench) {
        return new Response(JSON.stringify({'message':'Bench not found'}), { status: 404, headers: getCorsHeaders() });
      }
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

    async function sendReviewEmail(benchId) {
      const reviewUrl = `http://ratemybench.vaines.org/review?id=${benchId}`;
      const sender = REVIEW_EMAIL_ADDRESS;
      const recipient = REVIEW_EMAIL_ADDRESS;
      const subject = "A new bench has been submitted";
      const body = `A new bench has been submitted for review. Please review it at the following URL: ${reviewUrl}`;

      const rawMessage = createMimeMessage(sender, recipient, subject, body);

      var message = new EmailMessage(
        REVIEW_EMAIL_ADDRESS,
        REVIEW_EMAIL_ADDRESS,
        rawMessage
      );
      try {
        await env.SEB.send(message);
      } catch (e) {
        return new Response(e.message);
      }
    }

    return handleRequest(request);
  }
};