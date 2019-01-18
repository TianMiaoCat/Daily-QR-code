import axios from 'axios'
import qs from 'qs'
// import { Message } from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;'
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    // console.log(getToken())
    var str = config.url + ''
    // console.log(str.search('addstudents'))
    if (str.search('addstudents') !== -1) {
      config.headers = {
        'Content-Type': 'application/json; charset=utf-8;'
      }
      config.data = JSON.stringify(config.data['list'])
      console.log(config.data)
    }
    if (config.method === 'post') {
      // config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      // config.data = JSON.stringify(config.data)
      // console.log(config.url)
      config.data = qs.stringify(config.data)
      // console.log('there')
    }
    return config
  },
  error => {
    // Do something with request error
    console.log('err' + error) // for debug
    Promise.reject(error)
  }
)

// // response 拦截器
// service.interceptors.response.use(
//   response => {
//     // /**
//     //  * code为非20000是抛错 可结合自己业务进行修改
//     //  */
//     // const res = response
//     // console.log(res)
//     // if (res.code !== 20000) {
//     //   Message({
//     //     message: res.message,
//     //     type: 'error',
//     //     duration: 5 * 1000
//     //   })

//     //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//     //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//     //     MessageBox.confirm(
//     //       '你已被登出，可以取消继续留在该页面，或者重新登录',
//     //       '确定登出',
//     //       {
//     //         confirmButtonText: '重新登录',
//     //         cancelButtonText: '取消',
//     //         type: 'warning'
//     //       }
//     //     ).then(() => {
//     //       store.dispatch('FedLogOut').then(() => {
//     //         location.reload() // 为了重新实例化vue-router对象 避免bug
//     //       })
//     //     })
//     //   }
//     //   return Promise.reject('error')
//     // } else {
//     console.log(response.data)
//     return response.data

//     // }
//   },
//   error => {
//     console.log(error) // for debug
//     Message({
//       message: '账号或密码错误',
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
