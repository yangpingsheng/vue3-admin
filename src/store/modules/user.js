import md5 from 'md5'
import * as SysApi from '@/api/sys'
import { getItem, setItem, removeAllItem, TOKEN } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state() {
    return {
      /** 用户的登录 Token */
      token: getItem(TOKEN) || '',
      /** 用户信息 */
      userInfo: {},
    }
  },
  mutations: {
    /**
     * 设置用户 Token
     * @param {*} state
     * @param {*} token 用户 Token
     */
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    /**
     * 设置用户信息
     * @param {*} state
     * @param {*} userInfo 用户信息
     */
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    /**
     * 登录请求
     * @param {*} context
     * @param {*} param1
     * @returns
     */
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        SysApi.login({
          username,
          password: md5(password),
        })
          .then((data) => {
            commit('setToken', data.token)
            setTimeStamp() // 保存登录时间
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    /**
     * 获取用户信息
     * @param {*} param0
     * @returns
     */
    async getUserInfo({ commit }) {
      const res = await SysApi.getUserInfo()
      commit('setUserInfo', res)
      return res
    },

    /**
     * 退出登录
     */
    logout() {
      // 清理掉当前用户缓存数据
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // 清理权限相关配置
    },
  },
}
