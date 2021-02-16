import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export default function useRequestForm(fn) {
  const schema = yup.object({
    fio: yup
      .string()
      .trim()
      .required('Введите ФИО клиента'),
    phone: yup
      .string()
      .trim()
      .required('Введите номер телефона'),
    amount: yup
      .number()
      .required('Введите сумму')
      .min(0, 'Сумма не может быть меньше нуля')
  })
  const { isSubmitting, handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
      status: 'active'
    }
  })

  const { value: fio, errorMessage: fError, handleBlur: fBlur } = useField(
    'fio'
  )
  const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
    'phone'
  )
  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    'amount'
  )
  const { value: status, errorMessage: sError, handleBlur: sBlur } = useField(
    'status'
  )

  const onSubmit = handleSubmit(fn)

  return {
    status,
    isSubmitting,
    onSubmit,
    fio,
    phone,
    amount,
    fError,
    pError,
    aError,
    sError,
    fBlur,
    pBlur,
    aBlur,
    sBlur
  }
}
