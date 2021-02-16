<template>
  <div @click="$emit('close')" class="modal-backdrop"></div>
  <div class="modal">
    <h3 v-if="title">{{ title }}</h3>
    <slot />
  </div>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    title: {
      type: String
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
