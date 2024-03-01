import { ref,reactive} from 'vue'
import { defineStore } from 'pinia'
import { service4 } from '@/utils/request'

export const useStarStore = defineStore('star', () => {

    let allstardata = ref([])
    let ssearchdata = reactive([])
    

    const getSearchData = async() => {
        ssearchdata = []
        try{
            let permises = []
            for (let i = 0; i < 150; i++) {
                permises.push(searchOnePage(i))
            }
            await Promise.all(permises)
        }catch(error){
            console.log(error);
        }
    }

    const searchOnePage = async (page) => {
        try {
            const res = await service4({
                url: '/movie3/star',
                method: 'get',
                params: {
                    page: page,
                }
            })
            res.data.map(item => {
                ssearchdata.push(item)
            })
        } catch (error) {
            console.log(error);
        }
    }

    // onMounted(() => {
    //     if(ssearchdata.length === 0){
    //         getSearchData()
    //     }
    // })


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
        getStarSpage,
        ssearchdata,
        getSearchData
    }

})
