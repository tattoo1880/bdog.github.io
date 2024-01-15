import { ref } from 'vue'
import { defineStore } from 'pinia'



export const FormdataStore = defineStore('formdata', () => {
    const formdata = ref({})
    const setFormdata = (data) => {
        formdata.value = data
    }
    return {
        formdata,
        setFormdata
    }
})