<template>
  <div class="card">
    <h3>
      {{ test }}
    </h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 'VUE 3'
    }
  },
  beforeMount() {
    console.log(this.test)
  }
}
</script>

<style lang="scss" scoped></style>
