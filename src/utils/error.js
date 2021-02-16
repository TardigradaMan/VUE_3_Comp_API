const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Пользователь с данным email не найден',
  INVALID_PASSWORD: 'Email или пароль не верны',
  auth: 'Для просмотра данной страницы необходимо авторизоваться'
}
export default function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Что-то пошло не так'
}
