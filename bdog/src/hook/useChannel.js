import { service5 } from '@/utils/request'
import { ElMessage } from 'element-plus'
export  const useChannel = () => {

    const getChannelpage = async (page) => {
        try {
            const res = await service5.get(`/getChannelList/${page}`)
            return res.data
        } catch (error) {
            console.log(error);
            return null
        }
    }


    const getFav = async()=>{
        try {
            const res = await service5.get(`/getChannel`)
            console.log(res);
            return res.data
        } catch (error) {
            console.log(error);
            return null
        }
    }

    const addFavChannel = async(item)=>{
        try {
            const res = await service5.post("/addChannel",item)
            ElMessage.success('添加成功')
            return res.data
        } catch (error) {
            console.log(error);
            ElMessage.error('添加失败')
            return null
        }
    }

    const deleteFavChannel = async(item)=>{
        console.log(item);
        try {
            const res = await service5.post("/deleteChannel",item)
            return res.data
        } catch (error) {
            console.log(error);
            return null
        }
    }

    const listOneChannelMovies = async(item) =>{
        console.log(item);
        try{
            const res = await service5.post(`/getChannelMovieList`,item)
            return res.data
        }catch(error){
            console.log(error);
            return null
        }


    }
    return {
        getChannelpage,
        getFav,
        addFavChannel,
        deleteFavChannel,
        listOneChannelMovies
    }
}