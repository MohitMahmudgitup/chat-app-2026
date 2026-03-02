import { useApi } from "@/lib/axios";
import type { UsersResponse } from "@/types"
import { useQuery } from "@tanstack/react-query";

export const useUsers = ()=>{
    const {apiWithAuth} = useApi();
    return useQuery({
        queryKey:["users"],
        queryFn: async() =>{
            const {data} = await apiWithAuth<UsersResponse>({method : "GET" , url : "/user/alluser"})
            return  data?.data|| [];
        }
    })
}