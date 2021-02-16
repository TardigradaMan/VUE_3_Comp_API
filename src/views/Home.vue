<template>
  <app-loader v-if="loading" />
  <app-start-page v-else :title="'Список заявок'">
    <template #button>
      <button @click="modal = true" class="btn primary">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>

    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-modal v-if="modal" @close="modal = false" title="Создать заявку">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-start-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import RequestTable from '../components/request/RequestTable.vue'
import AppStartPage from '../components/ui/AppStartPage.vue'
import AppModal from '../components/ui/AppModal.vue'
import RequestModal from '../components/request/RequestModal.vue'
import { useStore } from 'vuex'
import AppLoader from '../components/ui/AppLoader.vue'
import RequestFilter from '../components/request/RequestFilter.vue'
export default {
  components: {
    AppStartPage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
    RequestFilter
  },
  name: 'Home',
  setup() {
    const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const filter = ref({})

    onMounted(() => {
      loading.value = true
      store.dispatch('request/load')
      loading.value = false
    })

    const requests = computed(() =>
      store.getters['request/requests']
        .filter(request => {
          if (filter.value.name) {
            return request.fio
              .toLowerCase()
              .includes(filter.value.name.toLowerCase())
          }
          return request
        })
        .filter(request => {
          if (filter.value.status) {
            return request.status === filter.value.status
          }
          return request
        })
    )

    return {
      modal,
      requests,
      loading,
      filter
    }
  }
}
</script>
