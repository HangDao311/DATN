<template>
  <div class="sidebar">
    <button
      @click="onRedirect('')"
      class="sidebar-button border-2 border-rose-500"
    >
      New Chat
    </button>
    <ul class="sidebar-list">
      <li v-for="(key, index) in topics" :key="index">
        <button
          @click="onRedirect(key)"
          class="sidebar-button border-2 border-blue-500"
        >
          {{ key.replace("_", "") }}
          <button @click="onDeleteChat(key)" class="red-500">| Delete</button>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      topics: [],
    };
  },
  mounted() {
    this.topics = Object.keys(localStorage);
  },
  methods: {
    onRedirect(path) {
      window.location.href = `/${path}`;
    },
    onDeleteChat(chatId) {
      localStorage.removeItem(chatId);
      setTimeout(() => {
        this.$router.go();
      }, 500);
    },
  },
};
</script>

<style scoped>
.sidebar {
  color: white;
  min-width: 250px;
  height: 100vh;
  background-color: black;
  padding: 20px;
}

.sidebar-button {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}

.sidebar-list {
  list-style: none;
  padding: 0;
}

.sidebar-list li {
  margin-bottom: 10px;
}
</style>
