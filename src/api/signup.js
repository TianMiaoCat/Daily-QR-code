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

export function deleteSignin(signid) {
  return request({
    url: '/admin/signinactivity/deletesigninactivity',
    method: 'get',
    params: {
      signid
    }
  })
}
