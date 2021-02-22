export const saveToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const localUser = (user) => {
  return localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export const saveId = (id) => {
  localStorage.setItem('id', id)
}

export const getId = () => {
  return localStorage.getItem('id')
}

export const isAuthenticated = () => localStorage.getItem('token') !== null
