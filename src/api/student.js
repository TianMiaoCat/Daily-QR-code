import request from '@/utils/request'

//获取学生名单列表
export function getStudent(courseid, page, limit) {
  return request({
    url: '/admin/course/getstudents',
    method: 'post',
    data: {
      courseid,
      page,
      limit
    }
  })
}

//删除学生
export function deleteStudent(courseid, studentid) {
  return request({
    url: '/admin/course/deletestudent',
    method: 'get',
    params: {
      courseid,
      studentid
    }
  })
}

//查找学生
export function searchStudent(courseid, page, limit, studentid) {
  return request({
    url: '/admin/course/getstudents',
    method: 'post',
    data: {
      courseid,
      page,
      limit,
      studentid
    }
  })
}

//新增学生
export function newStudent(courseid, page, limit, newid, newname) {
  return request({
    url: '/admin/course/getstudents',
    method: 'post',
    data: {
      courseid,
      page,
      limit,
      newid,
      newname
    }
  })
}

//获取学生出勤详情
export function getStatus(courseid, signinid, page, limit, studentid, status) {
  return request({
    url: '/admin/signin/getsignins',
    method: 'post',
    data: {
      courseid,
      signinid,
      page,
      limit,
      studentid,
      status
    }
  })
}

//更改学生出勤状态
export function changeStatus(courseid, signinid, studentid) {
  return request({
    url: '/admin/signin/resetsignin',
    method: 'get',
    params: {
      courseid,
      signinid,
      studentid
    }
  })
}
