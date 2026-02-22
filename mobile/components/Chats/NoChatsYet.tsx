import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const NoChatsYet = () => {
  return (
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
              onPress={() => router.push("/new-chat" as any)}
            >
              <Text className="text-black font-semibold">
                Start Chat
              </Text>
            </Pressable>
          </View>
  )
}

export default NoChatsYet