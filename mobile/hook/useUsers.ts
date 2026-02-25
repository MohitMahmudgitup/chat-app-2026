import { useApi } from "@/lib/axios";
import type {Chat} from "@/types"
import { useQuery } from "@tanstack/react-query";

export const useUsers = ()=>{
    const {apiWithAuth} = useApi();
    return useQuery({
        queryKey:["users"],
        queryFn: async() =>{
            const {data} = await apiWithAuth<{users : Chat["participant"][]}>({method : "GET" , url : "/users"})
            return data.users;
        }
    })
}