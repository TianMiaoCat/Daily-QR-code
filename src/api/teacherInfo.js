import request from '@/utils/request'

export function getInfo() {
  return request({
    url: '',
    method: 'get',
    params: { }
  })
}

export function submitInfo(name, phone, address, newPassword) {
  return request({
    url: '',
    method: 'post',
    data: {
      name,
      phone,
      address,
      newPassword
    }
  })
}

