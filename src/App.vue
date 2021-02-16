<template>
  <component v-if="layout" :is="layout + '-layout'"></component>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from './layout/AuthLayout.vue'
import MainLayout from './layout/MainLayout.vue'
export default {
  components: { MainLayout, AuthLayout },
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  }
}
</script>

<style lang="scss"></style>
