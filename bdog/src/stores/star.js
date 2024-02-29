import { ref,reactive} from 'vue'
import { defineStore } from 'pinia'
import { service4 } from '@/utils/request'

export const useStarStore = defineStore('star', async() => {

    let allstardata = ref([])
    
    const getStarSpage = async (page) => {
        try {
            const res = await service4({
                url: '/movie3/star',
                method: 'get',
                params: {
                    page: "0",
                }
            })
            console.log(res.data);
            console.log(allstardata);
        } catch (error) {
            console.log(error);
        }
    }
    
    return {
        allstardata,
        getStarSpage
    }

})
