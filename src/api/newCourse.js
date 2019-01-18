import request from '@/utils/request'

export function submitInfo(name, academicyear, semester) {
  return request({
    url: '/admin/course/addcourse',
    method: 'get',
    params: {
      name,
      academicyear,
      semester
    }
  })
}

export function submitExcel(id, list) {
  return request({
    url: '/admin/course/addstudents?courseid= ' + id + ' ',
    method: 'post',
    data: { list }
  })
}
