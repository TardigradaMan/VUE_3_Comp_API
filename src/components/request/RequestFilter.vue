<template>
  <div class="filter">
    <div class="form-control">
      <input v-model="name" type="text" placeholder="Начните писать имя" />
    </div>
    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Выберите статус</option>
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
export default {
  emits: ['update:modelValue'],
  //   По умолчанию v-model компонент используется modelValue как опора и update:modelValue как событие.
  //   Мы можем изменить эти имена, передав аргумент v-model: (v-model:title) => emits: ['update:title'],
  // https://v3.vuejs.org/guide/component-custom-events.html#multiple-v-model-bindings
  props: ['modelValue'],

  setup(props, { emit }) {
    const name = ref('')
    const status = ref('')

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1]
      })
    })

    const isActive = computed(() => name.value || status.value)

    return {
      name,
      status,
      isActive,
      reset: () => (name.value = status.value = '')
    }
  }
}
</script>

<style lang="scss" scoped></style>
