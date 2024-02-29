import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { service5 } from '@/utils/request'

export const useChannelStore = defineStore('channel', () => {

    let allchanneldata = ref([])
    const getChannelpage = async (page) => {
        try {
            const res = await service5.get(`/getChannelList/${page}`)
            return res.data
        } catch (error) {
            console.log(error);
            return null
        }
    }

    const getAllChanneldata = async () => {
        try {
            let permises = []
            for (let i = 0; i < 101; i++) {
                permises.push(getChannelpage(i))
            }
            const res = await Promise.all(permises)
            res.map((item) => {
                allchanneldata.value.push(...item)
            })
            console.log(allchanneldata.value);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        allchanneldata,
        getChannelpage,
        getAllChanneldata
    }

})
