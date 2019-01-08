import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/table/list',
    method: 'get',
    params: { token }
  })
}

export function submitInfo(form) {
  return request({
    url: '/table/list',
    method: 'post',
    data: { form }
  })
}

