import { login, signup, logout } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    token: '',
    name: '',
    userId: '',
    avatar: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      // console.log(username)
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          // console.log(response)
          commit('SET_NAME', data.username)
          commit('SET_TOKEN', data.username)
          resolve(response)
        }).catch(error => {
          Message({
            message: '账号或密码错误！',
            type: 'error',
            duration: 1 * 1000
          })
          reject(error)
          console.log('error! ')
        })
      })
    },
    // 注册
    SignUp({ commit }, userInfo) {
      const username = userInfo.newUsername.trim()
      // console.log(username)
      return new Promise((resolve, reject) => {
        signup(username, userInfo.newPassword).then(response => {
          const data = response.data
          console.log(data)
          commit('SET_NAME', data.name)
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(response)
        }).catch(error => {
          Message({
            message: '账号已被注册！',
            type: 'error',
            duration: 2 * 1000
          })
          reject(error)
          console.log(error)
        })
      })
    },

    // // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          console.log('logout!')
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
