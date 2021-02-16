<template>
  <the-navbar />
  <the-sidebar />
  <div class="container with-nav">
    <app-message />
    <router-view />
    <test />
  </div>
</template>

<script>
import Test from '../components/test.vue'
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'
import AppMessage from '../components/ui/AppMessage.vue'
export default {
  components: { TheNavbar, AppMessage, TheSidebar, Test }
}
</script>

<style lang="scss" scoped></style>
