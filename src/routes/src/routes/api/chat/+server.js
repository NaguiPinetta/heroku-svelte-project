export async function POST({ request }) {
    const { message } = await request.json();

    const response = await fetch("https://my-gpt-wrapper-d8f1367e2389.herokuapp.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return new Response(JSON.stringify({ reply: data.reply }), { status: 200 });
}
