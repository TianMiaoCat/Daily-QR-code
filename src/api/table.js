import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/table/list',
    method: 'get',
    params: query
  })
}
