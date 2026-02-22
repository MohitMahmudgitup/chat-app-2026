import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const Error = ({refetch}:any) => {
  return (
    <View className="flex-1 bg-surface items-center justify-center px-6">

        {/* Icon Circle */}
        <View className="size-24 rounded-full bg-red-500/10 items-center justify-center mb-6">
          <Ionicons name="alert-circle-outline" size={40} color="#ef4444" />
        </View>

        {/* Title */}
        <Text className="text-lg font-semibold text-foreground mb-2">
          Something Went Wrong
        </Text>

        {/* Subtitle */}
        <Text className="text-sm text-muted-foreground text-center mb-6">
          We couldn’t load your chats. Please check your internet connection and try again.
        </Text>

        {/* Retry Button */}
        <Pressable
          onPress={() => refetch}
          className="bg-primary px-8 py-3 rounded-full active:opacity-80"
        >
          <Text className="text-black font-semibold">
            Try Again
          </Text>
        </Pressable>

      </View>
  )
}

export default Error