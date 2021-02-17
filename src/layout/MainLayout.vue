<template>
  <the-navbar />
  <the-sidebar />
  <div class="container with-nav">
    <transition name="message">
      <AppMessage />
    </transition>

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

<style lang="scss" scoped>
.message-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.message-enter-active {
  transition: all 0.4s ease;
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.message-leave-active {
  transition: all 0.4s ease;
}
</style>
