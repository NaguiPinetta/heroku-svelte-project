<script>
    import { onMount } from "svelte";
    let messages = [];
    let userInput = "";
  
    async function sendMessage() {
        if (!userInput) return;
  
        // Push user message
        messages = [...messages, { role: "user", content: userInput }];
        let userMessage = userInput;
        userInput = "";
  
        // Call the backend API
        const response = await fetch("https://my-gpt-wrapper-d8f1367e2389.herokuapp.com/chat", {  
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
});
  
        const data = await response.json();
        messages = [...messages, { role: "bot", content: data.reply }];
    }
  </script>
  
  <main>
    <h1>Translation Chat</h1>
  
    <div class="chat-container">
      {#each messages as msg}
        <div class={msg.role === "user" ? "user-message" : "bot-message"}>
          {msg.content}
        </div>
      {/each}
    </div>
  
    <input type="text" bind:value={userInput} placeholder="Type a message..." />
    <button on:click={sendMessage}>Send</button>
  </main>
  
  <style>
    main { display: flex; flex-direction: column; gap: 10px; }
    .chat-container { max-height: 400px; overflow-y: auto; padding: 10px; }
    .user-message { background: #007aff; color: white; padding: 8px; border-radius: 5px; text-align: right; }
    .bot-message { background: #f3f3f3; padding: 8px; border-radius: 5px; text-align: left; }
    input { padding: 10px; width: 100%; }
    button { padding: 10px; background: #28a745; color: white; border: none; cursor: pointer; }
  </style>
  