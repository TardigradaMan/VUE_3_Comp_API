<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{ invalid: fError }">
      <label for="fio">ФИО</label>
      <input @blur="fBlur" v-model="fio" type="text" id="fio" />
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: pError }">
      <label for="phone">Телефон</label>
      <input @blur="pBlur" v-model="phone" type="text" id="phone" />
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: aError }">
      <label for="amount">Сумма</label>
      <input
        @blur="aBlur"
        v-model.number.lazy="amount"
        type="number"
        id="amount"
      />
      <small v-if="aError">{{ aError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import { useStore } from 'vuex'
import useRequestForm from '../../use/request-form'
export default {
  emits: ['created'],
  setup(props, { emit }) {
    const store = useStore()
    const submit = async values => {
      store.dispatch('request/create', values)
      emit('created')
    }
    return {
      ...useRequestForm(submit)
    }
  }
}
</script>

<style lang="scss" scoped></style>
