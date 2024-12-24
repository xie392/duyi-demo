import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'

import router from './router'

import resize from './directive/resize'

const app = createApp(App)

app.directive('resize', resize)
app.use(router)
app.mount('#app')

