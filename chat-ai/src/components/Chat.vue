<template>
  <div class="chat-component bg-indigo-500 h-screen w-screen">
    <div class="message-window bg-indigo-600 m-8">
      <p v-for="(message, index) in messages" :key="index">{{ message }}</p>
    </div>
    <div class="flex bg-indigo-700 m-8">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        type="text"
        class="message-input w-3/5"
        placeholder="Nhập câu hỏi...."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { openai } from "../open-ai";

export default {
  name: "Chat",
  data() {
    return {
      messages: [],
      newMessage: "",
    };
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push(this.newMessage);
        this.openAiCompletion(this.newMessage);
        this.newMessage = "";
      }
    },
    async openAiCompletion(prompt) {
      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          top_p: 0,
          temperature: 0,
          frequency_penalty: 0,
          max_tokens: 800,
        });
        const reply = completion.data.choices[0].message.content;
        this.messages.push(reply);
      } catch (error) {
        if (error.response) {
          console.error(error.response.status);
          console.error(error.response.data);
        } else {
          console.error(error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
/* .chat-component {
  background-color: pink;
  color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vh;
}

.message-window {
  flex-grow: 1;
  overflow-y: auto;
}

.message-input {
  width: 100%;
  height: 50px;
} */
</style>
