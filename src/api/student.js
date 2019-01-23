import request from '@/utils/request'

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
