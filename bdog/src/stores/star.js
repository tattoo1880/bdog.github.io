import { ref,reactive} from 'vue'
import { defineStore } from 'pinia'
import { service4 } from '@/utils/request'

export const useStarStore = defineStore('star', () => {

    let allstardata = ref([])
    
    const getStarSpage = async (page) => {
        try {
            allstardata.value = []
            const res = await service4({
                url: '/movie3/star',
                method: 'get',
                params: {
                    page: page,
                }
            })
            console.log(res.data);
            allstardata.value.push(...res.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    return {
        allstardata,
        getStarSpage
    }

})
