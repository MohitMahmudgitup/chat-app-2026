import { View, Text, Pressable } from 'react-native'
import { Image } from "expo-image"
import React from 'react'
import { formatDistanceToNowStrict } from "date-fns";

const ChatItem = ({ chat, onPress }: any) => {
  const participant = chat.participant;
  const isOnline = true;
  const isTyping = false;
  const hasUnread = chat.unreadCount > 0;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center  py-3 bg-background active:opacity-70"
    >
      {/* Avatar */}
      <View className="relative">
        <Image
          source={{ uri: participant.avatar }}
          contentFit="cover"
          style={{ width: 50, height: 50, borderRadius: 999 }}
        />

        {isOnline && (
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
        )}
      </View>

      {/* Chat Info */}
      <View className="flex-1 ml-4 ">
        {/* Top Row */}
        <View className="flex-row justify-between items-center">
          <Text
            className={`text-lg ${hasUnread ? "font-semibold text-foreground" : "font-medium text-foreground"
              }`}
          >
            {participant.name.length > 20
              ? participant.name.slice(0, 22) + "..."
              : participant.name}
          </Text>

          <Text
            className={`text-xs ${hasUnread ? "text-primary font-semibold" : "text-subtle-foreground"
              }`}
          >
            {chat.lastMessageAt
              ? formatDistanceToNowStrict(new Date(chat.lastMessageAt))
              : ""}
          </Text>
        </View>

        {/* Bottom Row */}
        <View className="flex-row items-center justify-between mt-1">
          {isTyping ? (
            <Text className="text-sm text-primary italic">
              Typing...
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              className={`text-sm flex-1 ${hasUnread
                  ? "text-foreground font-medium"
                  : "text-subtle-foreground"
                }`}
            >
              {chat.lastMessage?.text || "Start conversation"}
            </Text>
          )}

          {/* Unread Count Badge */}
          {hasUnread && (
            <View className="ml-2 min-w-[20px] h-5 px-1.5 bg-primary rounded-full items-center justify-center">
              <Text className="text-[11px] text-white font-semibold">
                {chat.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  )
}

export default ChatItem