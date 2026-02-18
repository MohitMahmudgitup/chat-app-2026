import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator, FlatList, Pressable } from 'react-native';
import * as Sentry from "@sentry/react-native"
import { useRouter } from 'expo-router';
import { useChats } from '@/hook/useChats';
import { Ionicons } from '@expo/vector-icons';
import ChatItem from '@/components/ChatItem';

function ChatsTab() {
  const router = useRouter();
  const { data: chats, isLoading, error } = useChats();
  if (isLoading) {
    return (
      <View className='flex-1 bg-surface items-center justify-center'>
        <ActivityIndicator size={"large"} color={"#f4a261"} />
      </View>
    )
  }

  // if (error) {
  //   return (
  //     <View className='flex-1 bg-surface items-center justify-center'>
  //       <Text className='text-red-500' >Failed to load chats</Text>
  //     </View>
  //   )
  // }

  const handleChatPress = (item: any) => { }

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
          <View className="flex-1 items-center justify-center py-20">
            <View className="size-20 rounded-full bg-primary/10 items-center justify-center mb-4">
              <Ionicons name="chatbubble-ellipses-outline" size={36} color="#f4a261" />
            </View>

            <Text className="text-lg font-semibold text-foreground mb-2">
              No Chats Yet
            </Text>

            <Text className="text-sm text-muted-foreground text-center px-10 mb-6">
              Start a new conversation and connect with your friends.
            </Text>

            <Pressable
              className="bg-primary px-6 py-3 rounded-full"
            // onPress={() => router.push("/new-chat")}
            >
              <Text className="text-black font-semibold">
                Start Chat
              </Text>
            </Pressable>
          </View>
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
        // onPress={() => router.push("/new-chat")}
        >
          <Ionicons name="create-outline" size={20} color="#0D0D0F" />
        </Pressable>
      </View>
    </View>
  );
}