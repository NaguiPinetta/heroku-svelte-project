export async function POST({ request }) {
    const body = await request.json();
    const message = body.message || 'No message';
  
    return new Response(JSON.stringify({ reply: `You said: ${message}` }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  