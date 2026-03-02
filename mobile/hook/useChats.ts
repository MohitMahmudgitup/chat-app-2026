import { useApi } from "@/lib/axios";
import type {Chat} from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChats = ()=>{
    const {apiWithAuth} = useApi();
    return useQuery({
        queryKey:["chats"],
        queryFn: async() =>{
            const {data} = await apiWithAuth<Chat[]>({method : "GET" , url : "/chats"})
            return data;
        }
    })
}

export const useGetorCreateChat = () => {
    const {apiWithAuth} = useApi();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(participantsId: string) =>{
            const {data} = await apiWithAuth<Chat>({method : "POST" , url : `/chats/with/${participantsId}`})
            return data;
        },
        onSuccess: () => {  
            queryClient.invalidateQueries({queryKey: ["chats"]})
        }
    })
}