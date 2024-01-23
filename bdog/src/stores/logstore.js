// 登陆的pinia
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'


export const useLoginStore = defineStore('login', () => {
    const router = useRouter()
    const isLogin = ref(false)
    const username = ref('')
    const setLogin = (name) => {
        isLogin.value = true
        username.value = name
    }
    const setLogout = () => {
        isLogin.value = false
        username.value = ''
        console.log('logout')
        // 跳转到登陆页面
        router.push('/')
    }
    return {
        isLogin,
        username,
        setLogin,
        setLogout
    }
}, {
    persist: true
})