import { service5 } from '@/utils/request'

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
            return res.data
        } catch (error) {
            console.log(error);
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