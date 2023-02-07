import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/auth/login',
    data,
  })
}

export const getUser = () => {
  return request.get('/auth/currentUser')
}
