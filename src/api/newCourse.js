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

export function submitExcel(courseid, list) {
  return request({
    url: '/admin/course/addstudents',
    method: 'post',
    dataType: 'json',
    params: { courseid },
    data: list
  })
}
