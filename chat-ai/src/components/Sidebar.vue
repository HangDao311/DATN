<template>
  <div class="sidebar">
    <button class="sidebar-button border-2 border-rose-500">+ new chat</button>
    <button class="sidebar-button border-2 border-rose-500">+ new chat</button>
    <button class="sidebar-button border-2 border-rose-500">+ new chat</button>
    <button class="sidebar-button border-2 border-rose-500">+ new chat</button>
    <ul class="sidebar-list m-8">
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      list: ["Mục 1", "Mục 2", "Mục 3", "Mục 4", "Mục 5"],
    };
  },
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
