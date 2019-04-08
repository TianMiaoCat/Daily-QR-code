import request from '@/utils/request'

//提交课程信息
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

//导入学生名单
export function submitExcel(courseid, list) {
  return request({
    url: '/admin/course/addstudents',
    method: 'post',
    dataType: 'json',
    params: { courseid },
    data: list
  })
}
