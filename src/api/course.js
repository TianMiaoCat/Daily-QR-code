import request from '@/utils/request'

//获取课程列表
export function getCourse(page, limit) {
  return request({
    url: '/admin/course/getcourses',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

//删除课程
export function deleteCourse(courseid) {
  return request({
    url: '/admin/course/deletecourse',
    method: 'get',
    params: { courseid }
  })
}

//获取签到列表
export function getSign(courseid) {
  return request({
    url: '/admin/signinactivity/getsigninactivities',
    method: 'get',
    params: { courseid }
  })
}

