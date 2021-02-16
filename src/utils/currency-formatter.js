const formatter = Intl.NumberFormat('ru-Ru', {
  currency: 'RUB',
  style: 'currency'
})

export default function currency(value) {
  return formatter.format(value)
}
