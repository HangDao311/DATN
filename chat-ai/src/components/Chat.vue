<template>
  <div class="p-2 w-full bg-slate-600">
    <div class="max-h-full overscroll-auto">
      <p
        :class="getMessageStyle(message, index)"
        v-for="(message, index) in messages"
        :key="index"
      >
        <pre class="max-w-full overflow-x-auto whitespace-pre-wrap">{{ formatText(message) }}</pre>
      </p>
    </div>
    <div class="flex justify-center align-bottom m-8">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        type="text"
        class="bg-gray-300 p-3 w-2/3"
        placeholder="Nhập câu hỏi...."
      />
      <button class="w-[100px] border-solid border-2 bg-gray-500" @click="sendMessage">
        Send
      </button>
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
      chatId: null
    };
  },
  mounted() {
    this.loadChat();
  },
  methods: {
    loadChat() {
      this.chatId = this.$route.params.id;
      const questions = JSON.parse(localStorage.getItem(this.chatId));
      this.messages = questions || [];
      if (!questions){
        this.$router.push({path: '/'});
      }
    },
    createChatIfNotExist(chatId) {
      const chat = localStorage.getItem(chatId);
      if (!chat) {
        localStorage.setItem(chatId, JSON.stringify([]));
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        if (!this.chatId) {
          this.chatId = `Chat_${crypto.randomUUID().substring(0, 5)}`
        }
        this.createChatIfNotExist(this.chatId);
        this.messages.push(this.newMessage);
        localStorage.setItem(this.chatId, JSON.stringify(this.messages));
        await this.openAiCompletion(this.newMessage);
        this.newMessage = "";
      }
    },
    async openAiCompletion(prompt) {
      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 800,
        });
        const reply = completion.data.choices[0].message.content;
        this.messages.push(reply);
        localStorage.setItem(this.chatId, JSON.stringify(this.messages));
      } catch (error) {
        if (error.response) {
          console.error(error.response.status);
          console.error(error.response.data);
        } else {
          console.error(error.message);
        }
      }
    },
    getMessageStyle(message, index) {
      let style;
      if (index % 2 === 0) {
        style = "bg-gray-400";
      } else {
        style = "bg-gray-300";
      }
      return style + " p-3 mb-4";
    },
    formatText(content) {
      // Split the content into sentences based on periods
      const sentences = content.split(". ");

      // Create a new array to store the modified sentences
      const modifiedSentences = [];

      // Iterate over each sentence and modify it if necessary
      for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i].trim();

        // Check if the sentence starts with a number or a dot
        if (/^[\d.]/.test(sentence)) {
          // Add a new line before the sentence
          modifiedSentences.push("\n" + sentence);
        } else {
          // Keep the sentence as is
          modifiedSentences.push(sentence);
        }
      }

      // Join the modified sentences back into a single string
      const modifiedContent = modifiedSentences.join(". ");
      return modifiedContent;
    },
  },
};
</script>

<style scoped></style>
