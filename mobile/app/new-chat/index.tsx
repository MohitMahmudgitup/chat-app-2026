import { View, Text, Pressable, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const NewChatScreen = () => {
    return (
        <SafeAreaView className='flex-1 bg-black'>
            <View className='flex-1 bg-black/40 justify-end'>
                <View className='bg-surface rounded-t-3xl h-[90%] overflow-hidden'>
                    <View className='px-5 py-3 bg-surface border-b border-surface-light flex-row items-center'>
                        <Pressable
                            className="w-9 h-9 rounded-full items-center justify-center mr-2 bg-surface-card"
                            onPress={() => router.back()}
                        >
                            <Ionicons name="close" size={20} color="#F4A261" />
                        </Pressable>
                        <View className="flex-1">
                            <Text className="text-foreground text-xl font-semibold">New chat</Text>
                            <Text className="text-muted-foreground text-xs mt-0.5">
                                Search for a user to start chatting
                            </Text>
                        </View>
                    </View>
                    <View className="px-5 pt-3 pb-2 bg-surface">
                        <View className="flex-row items-center bg-surface-card rounded-full px-3 py-1.5 gap-2 border border-surface-light">
                            <Ionicons name="search" size={18} color="#6B6B70" />
                            <TextInput
                                placeholder="Search users"
                                placeholderTextColor="#6B6B70"
                                className="flex-1 text-foreground text-sm"
                                // value={searchQuery}
                                // onChangeText={setSearchQuery}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default NewChatScreen