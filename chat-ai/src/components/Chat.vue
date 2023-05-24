<template>
  <div class="p-2">
    <div class="max-h-full overscroll-auto">
      <p
        :class="getMessageStyle(message, index)"
        v-for="(message, index) in messages"
        :key="index"
      >
        <pre class="max-w-full overflow-x-auto whitespace-pre-wrap">{{ formatText(message) }}</pre>
      </p>
    </div>
    <div class="flex justify-center m-8">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        type="text"
        class="bg-gray-300 p-3 w-3/5"
        placeholder="Nhập câu hỏi...."
      />
      <button class="border-solid border-2 bg-gray-500" @click="sendMessage">
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
    };
  },
  mounted() {
    const questions = JSON.parse(localStorage.getItem("QuesAns"));
    this.messages = questions || [];
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push(this.newMessage);
        localStorage.setItem("QuesAns", JSON.stringify(this.messages));
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

        localStorage.setItem("QuesAns", JSON.stringify(this.messages));
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
