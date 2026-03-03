import { useApi } from "@/lib/axios";
import type {Chat, ChatsResponse} from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChats = ()=>{
    const {apiWithAuth} = useApi();
    return useQuery({
        queryKey:["chats"],
        queryFn: async() =>{
            const {data} = await apiWithAuth<ChatsResponse>({method : "GET" , url : "/chats"})
            return data.chats;
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