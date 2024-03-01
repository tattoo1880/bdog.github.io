import { ref,reactive} from 'vue'
import { defineStore } from 'pinia'
import { service4 } from '@/utils/request'
import { ElMessage } from 'element-plus'

export const useStarStore = defineStore('star', () => {

    let allstardata = ref([])
    let ssearchdata = ref([])
    

    const getSearchData = async() => {
        ssearchdata.value = []
        try{
            let permises = []
            for (let i = 0; i < 150; i++) {
                // await searchOnePage(i)
                permises.push(searchOnePage(i))
            }
            await Promise.all(permises)
            ElMessage.success('数据获取成功')
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
                ssearchdata.value.unshift(item)
            })
        } catch (error) {
            console.log(error);
        }
    }
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

},{
    persist: true
})
