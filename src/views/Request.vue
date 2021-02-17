<template>
  <app-loader v-if="loading"></app-loader>
  <app-start-page back v-else-if="request" title="Подробности заявки">
    <p>
      <strong>Дата заявки</strong>:
      {{ new Date(request.date).toLocaleString() }}
    </p>
    <p><strong>Имя владельца</strong>: {{ request.fio }}</p>
    <p><strong>Телефон</strong>: {{ request.phone }}</p>
    <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
    <p><strong>Статус</strong>: <app-status :type="request.status" /></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button @click="remove" class="btn danger">Удалить</button>
    <button v-if="hasChanges" @click="update" class="btn">Обновить</button>
  </app-start-page>
  <h3 v-else class="text-center text-white">Заявки с ID = {{ id }} нет</h3>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppStartPage from '../components/ui/AppStartPage.vue'
import { useStore } from 'vuex'
import AppLoader from '../components/ui/AppLoader.vue'
import currency from '../utils/currency-formatter'
import AppStatus from '../components/ui/AppStatus.vue'
export default {
  components: { AppStartPage, AppLoader, AppStatus },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(false)
    const request = ref()
    const status = ref('')

    const id = route.params.id

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadOne', id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('request/remove', id)
      router.push('/')
    }
    const update = async () => {
      const data = { ...request.value, status: status.value, id }
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }

    return {
      request,
      loading,
      id,
      currency,
      remove,
      status,
      hasChanges,
      update
    }
  }
}
</script>

<style lang="scss" scoped></style>
