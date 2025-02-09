<script>
  import { onMount } from "svelte";
  
  let userMessage = "";
  let messages = [];

  async function sendMessage() {
    if (!userMessage.trim()) return;

    const newMessage = { role: "user", text: userMessage };
    messages = [...messages, newMessage];

    // Send request to backend
    const response = await fetch("https://your-heroku-app.herokuapp.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userMessage }),
    });

    const data = await response.json();
    const botMessage = { role: "bot", text: data.translation };

    messages = [...messages, botMessage];
    userMessage = "";
  }
</script>

<style>
  .chat-container { width: 100%; max-width: 600px; margin: auto; }
  .messages { border: 1px solid #ddd; padding: 10px; height: 400px; overflow-y: scroll; }
  .message { padding: 8px; border-radius: 5px; margin-bottom: 5px; }
  .user { background: #007bff; color: white; text-align: right; }
  .bot { background: #f1f1f1; text-align: left; }
  input, button { width: 100%; padding: 10px; margin-top: 10px; }
</style>

<div class="chat-container">
  <h2>Translation Chat</h2>
  <div class="messages">
    {#each messages as msg}
      <div class="message {msg.role}">
        <strong>{msg.role === "user" ? "You" : "GPT"}:</strong> {msg.text}
      </div>
    {/each}
  </div>
  
  <input type="text" bind:value={userMessage} placeholder="Enter text to translate..." on:keypress={(e) => e.key === 'Enter' && sendMessage()} />
  <button on:click={sendMessage}>Send</button>
</div>
