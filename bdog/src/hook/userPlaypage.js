import { useRouter } from "vue-router"


export const usePlaypage = () => {
    const router = useRouter()
    const playitemnewpage = async(item) => {
        router.push({name: 'play', query: {name: item.name, url: item.url}})
    }
    return {playitemnewpage}
}
