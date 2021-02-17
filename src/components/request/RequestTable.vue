<template>
  <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
  <table v-else class="table">
    <thead>
      <tr>
        <th>№</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <transition-group name="list" tag="tbody">
      <tr class="body__list" v-for="(req, index) in requests" :key="req.id">
        <td>{{ index + 1 }}</td>
        <td>{{ req.fio }}</td>
        <td>{{ req.phone }}</td>
        <td>{{ currency(req.amount) }}</td>
        <td><app-status :type="req.status"></app-status></td>
        <td>
          <router-link
            v-slot="{ navigate }"
            custom
            :to="{ name: 'Request', params: { id: req.id } }"
          >
            <button class="btn" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </transition-group>
  </table>
</template>

<script>
import currency from '../../utils/currency-formatter'
import AppStatus from '../ui/AppStatus.vue'
export default {
  components: { AppStatus },
  props: {
    requests: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      currency
    }
  }
}
</script>

<style lang="scss" scoped>
/* list transitions */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}

.list-enter-active {
  transition: all 0.4s ease;
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}
.list-move {
  transition: all 0.3s ease;
}
</style>
