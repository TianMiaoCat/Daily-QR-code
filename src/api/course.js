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
