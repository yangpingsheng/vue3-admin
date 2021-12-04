import { createApp } from 'vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import element from './plugins/element'
import svgIcon from './plugins/svgIcon'
import App from './App.vue'
import './styles/index.scss'
import './icons'
import './permission'

const app = createApp(App)
app.use(store).use(router).use(element).use(svgIcon).use(i18n).mount('#app')
