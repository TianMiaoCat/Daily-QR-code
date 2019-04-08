import request from '@/utils/request'

//登录
export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

//注册
export function signup(username, password) {
  return request({
    url: '/signup',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

//退出系统
export function logout() {
  return request({
    url: '/quit',
    method: 'get'
  })
}
