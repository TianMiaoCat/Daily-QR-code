import request from '@/utils/request'

//导出签到表
export function getRecord(courseid) {
  return request({
    url: '/admin/signinactivity/export',
    method: 'get',
    params: {
      courseid
    }
  })
}

//删除签到记录
export function deleteSignin(signid) {
  return request({
    url: '/admin/signinactivity/deletesigninactivity',
    method: 'get',
    params: {
      signid
    }
  })
}
