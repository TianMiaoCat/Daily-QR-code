import request from '@/utils/request'

export function getRecord(courseid) {
  return request({
    url: '/admin/signinactivity/export',
    method: 'get',
    params: {
      courseid
    }
  })
}

