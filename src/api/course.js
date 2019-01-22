import request from '@/utils/request'

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

export function deleteCourse(courseid) {
  return request({
    url: '/admin/course/deletecourse',
    method: 'get',
    params: { courseid }
  })
}

export function getSign(courseid) {
  return request({
    url: '/admin/signinactivity/getsigninactivities',
    method: 'get',
    params: { courseid }
  })
}

