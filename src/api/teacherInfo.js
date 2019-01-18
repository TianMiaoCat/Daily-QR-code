import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '/admin/user/getinfo',
    method: 'get'
  })
}

export function submitInfo(name, password, phonenum, address) {
  return request({
    url: '/admin/user/changeinfo',
    method: 'post',
    data: {
      name,
      password,
      phonenum,
      address
    }
  })
}

export function submitInfoNo(name, phonenum, address) {
  return request({
    url: '/admin/user/changeinfo',
    method: 'post',
    data: {
      name,
      phonenum,
      address
    }
  })
}
