<template>
  <div class="sidebar">
    <button class="sidebar-button border-2 border-rose-500"></button>
    <button class="sidebar-button border-2 border-rose-500">PE 2</button>
    <button class="sidebar-button border-2 border-rose-500">PE 3</button>
    <button class="sidebar-button border-2 border-rose-500">PE 4</button>
    <ul class="sidebar-list m-8">
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.sidebar {
  color: white;
  width: 200px;
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
