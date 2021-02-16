<template>
  <div v-if="back" class="breadcrumbs">
    <router-link class="text-white" to="/"
      >Вернуться к списку заявок</router-link
    >
  </div>
  <div class="card">
    <h1 class="card-title">
      {{ title }}
      <slot name="button" />
    </h1>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Банк`
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
