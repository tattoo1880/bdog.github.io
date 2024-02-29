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
            res.data.map(item => {
                allstardata.value.push(item)
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    return {
        allstardata,
        getStarSpage
    }

})
