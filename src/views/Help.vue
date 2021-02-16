<template>
  <app-start-page title="Помощь">
    <question-item
      v-for="q in questions"
      :key="q.title"
      :question="q"
    ></question-item>
  </app-start-page>
</template>

<script>
import QuestionItem from '../components/question/QuestionItem.vue'
import AppStartPage from '../components/ui/AppStartPage.vue'
export default {
  components: { AppStartPage, QuestionItem },
  setup() {
    const questions = [
      {
        title: 'Что есть в данной системе?',
        text:
          'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял'
      },
      {
        title: 'Как тут работает авторизация?',
        text: 'Все реализовано через Firebase'
      }
    ]
    return { questions }
  }
}
</script>

<style lang="scss" scoped></style>
