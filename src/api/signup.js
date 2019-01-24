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

export function getMini(courseid, duration) {
  return request({
    url: '/admin/signin/create',
    method: 'get',
    params: {
      courseid,
      duration
    }
  })
}

