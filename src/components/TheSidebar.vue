<template>
  <div v-if="sidebar" class="sidebar">
    <span @click="close" class="sidebar-close">&times;</span>
    <div class="sidebar-content">
      <p>Тут какой то текст</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const sidebar = computed(() => store.state.sidebar)
    return {
      sidebar,
      close: () => store.commit('CLOSE_SIDEBAR')
    }
  }
}
</script>

<style lang="scss" scoped></style>
