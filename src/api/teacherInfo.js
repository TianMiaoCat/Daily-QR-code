import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/admin/user/getinfo',
    method: 'get'
  })
}

export function submitInfo(form) {
  return request({
    url: '/table/list',
    method: 'post',
    data: { form }
  })
}

