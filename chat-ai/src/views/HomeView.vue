<template>
  <div class="flex">
    <Sidebar />
    <Chat />
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Chat from "../components/Chat.vue";
export default {
  name: "HomeView",
  components: { Sidebar, Chat },
  data() {},
};
</script>
<style></style>
