import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useChats } from '@/hook/useChats';
import { Ionicons } from '@expo/vector-icons';
import ChatItem from '@/components/ChatItem';
import { Chat } from '@/types';
import Error from '@/components/Chats/Error';
import Loading from '@/components/Chats/Loading';
import NoChatsYet from '@/components/Chats/NoChatsYet';

function ChatsTab() {
  const router = useRouter();
  const { data: chats, isLoading, error, refetch } = useChats();
  console.log("chats data:", chats);
  if (isLoading) {
    return <Loading refetch={refetch}/>
  }

  if (error) {
    return  <Error refetch={refetch}/>
  }


  const handleChatPress = (chat: Chat) => {

    router.push({
      pathname: "/chat/[id]",
      params: {
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar
      }
    })

  }

  return (
    <View className='flex-1 bg-surface'>
      <FlatList
        data={chats || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ChatItem chat={item} onPress={() => handleChatPress(item)} />}
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={() => (
          <NoChatsYet/>
        )}
      />
    </View>
  );
}
export default ChatsTab;

function Header() {
  const router = useRouter();

  return (
    <View className="px-5 pt-12 pb-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-foreground">Chats</Text>
        <Pressable
          className="size-10 bg-primary rounded-full items-center justify-center"
          onPress={() => router.push("/new-chat")}
        >
          <Ionicons name="create-outline" size={20} color="#0D0D0F" />
        </Pressable>
      </View>
    </View>
  );
}