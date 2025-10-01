// plugins/toast.client.ts
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'bottom-right',
    hideProgressBar: false,
    transition: 'bounce',
    closeOnClick: true,
    pauseOnHover: true,
    // theme: 'auto',
  })
})
