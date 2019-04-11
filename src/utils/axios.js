import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
const config = {
  baseURL: process.env.VUE_APP_BASE_API || '', // API BASE URL
  // timeout: 60 * 1000, // 超时时间
  // withCredentials: true, // Check cross-site Access-Control 是否跨域携带 Cookie, CORS Origin 不能为 *
  headers: {
    // 设置通用请求头
    common: {
      // Authorization: 'Bearer ' + 'AUTH_TOKEN'
    },
    // 设置 POST 请求头
    post: {
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

// 创建一个 axios 实例
const _axios = axios.create(config)

// 请求拦截器
_axios.interceptors.request.use(
  config => {
    // 处理请求之前的配置
    /*
    // 携带 Authorization Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    */
    return config
  },
  error => {
    // 请求失败的处理
    return Promise.reject(error)
  }
)

// 响应拦截器
_axios.interceptors.response.use(
  response => {
    // 响应成功 http status 200
    return response
  },
  error => {
    // 响应异常 http status != 200
    if (error.response) {
      // 服务端有响应
      switch (error.response.status) {
        // 401 未登录 / Token 过期
        case 401:
          /*
          // 判断是否有 Token
          const token = localStorage.getItem('token')
          if (token) {
            // 错误提示
            Message({
              type: 'error',
              message: '登录信息过期，请重新登录'
            })
            // 清除 Token, 用户状态信息
            localStorage.removeItem('token')
          }
          // 跳转登录页
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          */
          break
        // 403 没有权限
        case 403:
          /*
          // 错误提示
          Message({
            message: '没有权限',
            type: 'error'
          })
          */
          break
        // 404 资源不存在
        case 404:
          /*
          // 错误提示
          Message({
            message: '资源不存在',
            type: 'error'
          })
          */
          break
        // 其他错误
        default:
          /*
          // 错误提示
          Message({
            message: error.response.data.message,
            type: 'error'
          })
          */
      }
    } else {
      // 服务端无响应(网络异常)
      /*
      // 错误提示
      Message({
        message: '网络异常，请检查网络情况',
        type: 'error'
      })
      */
    }
    return Promise.reject(error)
  }
)

// 注册 Vue 插件
Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

export const http = _axios
export const VueAxios = Plugin
