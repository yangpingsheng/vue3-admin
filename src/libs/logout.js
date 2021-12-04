import { DEFAULT_COLOR } from '@/constant'
import store from '@/store'
import router from '@/router'
import { setThemeColor } from './mainColor'

/**
 * 退出登录
 */
export async function logout() {
  // 清理数据
  store.dispatch('user/logout')
  // 重置主题色
  await setThemeColor(DEFAULT_COLOR)
  // 返回到登录页
  router.push('/login')
}
