import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '../utils/auth'
import { logout } from './logout'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这个位置需要统一的去注入 token
    if (store.getters.token) {
      // 被动退出的主动退出方案
      if (isCheckTimeout()) {
        // 主动登出
        logout()
        return Promise.reject(new Error('Token 失效'))
      }

      // 如果 token 存在 注入 token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    // 根据 success 的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 被动退出的被动处理
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // 被动登出
      logout()
    }

    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
