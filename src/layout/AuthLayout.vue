<template>
  <div class="container">
    <transition name="message">
      <AppMessage />
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import AppMessage from '../components/ui/AppMessage.vue'
export default {
  components: { AppMessage }
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
