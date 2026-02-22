import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = ({refetch}:any) => {
  return (
  <View className="flex-1 bg-surface items-center justify-center px-6">

        {/* Loader Circle */}
        <View className="size-24 rounded-full bg-primary/10 items-center justify-center mb-6">
          <ActivityIndicator size="large" color="#f4a261" />
        </View>

        {/* Title */}
        <Text className="text-lg font-semibold text-foreground mb-2">
          Loading Chats...
        </Text>

        {/* Subtitle */}
        <Text className="text-sm text-muted-foreground text-center mb-6">
          Please wait while we fetch your conversations.
        </Text>

        {/* Refresh Button */}
        <Pressable
          onPress={() => refetch}
          className="bg-primary px-8 py-3 rounded-full active:opacity-80"
        >
          <Text className="text-black font-semibold">
            Refresh
          </Text>
        </Pressable>

      </View>
  )
}

export default Loading