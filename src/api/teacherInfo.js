import request from '@/utils/request'

//获取教师信息
export function getInfo() {
  return request({
    url: '/admin/user/getinfo',
    method: 'get'
  })
}

//编辑教师信息（修改密码）
export function submitInfo(name, password, phonenum, address) {
  return request({
    url: '/admin/user/changeinfo',
    method: 'post',
    data: {
      name,
      password,
      phonenum,
      address
    }
  })
}

//编辑教师信息（未修改密码）
export function submitInfoNo(name, phonenum, address) {
  return request({
    url: '/admin/user/changeinfo',
    method: 'post',
    data: {
      name,
      phonenum,
      address
    }
  })
}
