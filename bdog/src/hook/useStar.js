import { service4 } from "@/utils/request";


export const useStar = async() => {

    const getStarpage = async (item) => {
        try {
            const res = await service4.post(`/movie4/onestarlist`,item)
            return res.data
        } catch (error) {
            console.log(error);
            return null
        }
    }   
    return {
        getStarpage
    }
}