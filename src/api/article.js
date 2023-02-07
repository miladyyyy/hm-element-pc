import request from '@/utils/request'

export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/admin/interview/query',
    params,
  })
}

export const createArticle = data => {
  return request({
    method: 'POST',
    url: '/admin/interview/create',
    data,
  })
}

export const removeArticle = data => {
  return request({
    method: 'DELETE',
    url: '/admin/interview/remove',
    data,
  })
}

export const getArticleDetail = params => {
  return request({
    method: 'GET',
    url: '/admin/interview/show',
    params,
  })
}

export const updateArticleDetail = data => {
  return request({
    method: 'PUT',
    url: '/admin/interview/update',
    data,
  })
}
