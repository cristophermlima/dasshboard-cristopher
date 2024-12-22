import Cookies from 'js-cookie'

export function logout() {
  if (confirm('Deseja seguir com o logou?') === true) {
    Cookies.remove('Authorization')
    window.location.href = '/'
  }
}
