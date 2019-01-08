import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/table/list',
    method: 'get'
  })
}
