import { createApp } from 'vue'
import App from './App.vue'
import elements from './pkg/element'
import router from './routers'

const app = createApp(App)
app.use(router)

// element-ui
elements.forEach(component => {
    app.component(component.name, component)
})

app.mount('#app')
