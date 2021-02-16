import { computed, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default function useLoginForm() {
  const store = useStore()
  const router = useRouter()
  const PASSWORD_MiN = 6
  const schema = yup.object({
    email: yup
      .string()
      .trim()
      .required('Введите ваш email')
      .email('Необходимо ввести корректный email'),
    password: yup
      .string()
      .trim()
      .required('Введите ваш пароль')
      .min(PASSWORD_MiN, `Пароль не может быть менее ${PASSWORD_MiN} символов`)
  })

  // Create a form context with the validation schema
  const { handleSubmit, isSubmitting, submitCount } = useForm({
    validationSchema: schema
  })

  // No need to define rules for fields
  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    'email'
  )
  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password'
  )

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      router.push('/')
    } catch (e) {
      console.log(e)
    }
  })

  const isTooManyAttempts = computed(() => submitCount.value >= 3)
  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 1500)
    }
  })

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts
  }
}
