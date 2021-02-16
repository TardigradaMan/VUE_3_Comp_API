<template>
  <form @submit.prevent="onSubmit" class="card">
    <h1>Войти в систему</h1>
    <div :class="['form-control', { invalid: eError }]">
      <label for="email">Email</label>
      <input
        @blur="eBlur"
        v-model="email"
        type="text"
        name="email"
        id="email"
      />
      <small v-if="eError">{{ eError }}</small>
    </div>
    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input
        @blur="pBlur"
        v-model="password"
        type="password"
        name="password"
        id="password"
      />
      <small v-if="pError">{{ pError }}</small>
    </div>
    <button
      :disabled="isSubmitting || isTooManyAttempts"
      class="btn primary"
      type="submit"
    >
      Войти
    </button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Слишком много попыток входа
    </div>
  </form>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import useLoginForm from '../use/login-form'
import error from '../utils/error'
export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }

    return {
      ...useLoginForm()
    }
  }
}
</script>

<style lang="scss" scoped></style>
