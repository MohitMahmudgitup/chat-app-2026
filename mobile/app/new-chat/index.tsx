import { View, Text, Pressable, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useUsers } from '@/hook/useUsers';
import { useGetorCreateChat } from '@/hook/useChats';
import { User } from '@/types';


const NewChatScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: allUsers, isLoading, error } = useUsers();
    const { mutate: getOrCreateChat, isPending: isCreatingChat } = useGetorCreateChat();

    // 🔥 FIXED FILTER
    const users = allUsers?.filter((user: User) => {
        if (!searchQuery.trim()) return true;

        const query = searchQuery.toLowerCase();

        return (
            user?.name?.toLowerCase().includes(query) ||
            user?.email?.toLowerCase().includes(query)
        );
    });

    const handleUserSelect = (user: User) => {
        console.log("Pressed user:", user._id);
        getOrCreateChat(user._id, {
            onSuccess: (chat) => {
                console.log("Chat created:", chat);
                router.dismiss();

                setTimeout(() => {
                    router.push({
                        pathname: "/chat/[id]",
                        params: {
                            id: chat._id,
                            participant: chat.participant._id,
                            name: chat.participant.name,
                            avatar: chat.participant.avatar,
                        },
                    });
                }, 100);
            },
        });
    };

    const UserItem = (user: User) => {
        return (
            <Pressable
                key={user._id}
                onPress={() => handleUserSelect(user)}
                disabled={isCreatingChat}
                className="px-4 py-3 flex-row items-center bg-background active:opacity-80"
            >
                {/* Avatar Section */}
                <View className="relative">
                    <View className="w-14 h-14 rounded-full bg-surface-card items-center justify-center overflow-hidden">
                        {!user.avatar ? (
                            <Text className="text-lg font-semibold text-foreground">
                                {user.name?.charAt(0).toUpperCase()}
                            </Text>
                        ) : (
                            <Image
                                source={{ uri: user.avatar }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        )}
                    </View>

                    {/* Online Indicator Dot */}
                    <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                </View>

                {/* User Info Section */}
                <View className="flex-1 ml-4">
                    <Text className="text-base font-semibold text-foreground">
                        {user.name}
                    </Text>

                    <Text
                        className="text-sm text-muted-foreground mt-1"
                        numberOfLines={1}
                    >
                        {user.email}
                    </Text>
                </View>

                {/* Right Arrow */}
                <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#9CA3AF"
                />
            </Pressable>

        );
    }

    return (
        <SafeAreaView className='flex-1 bg-black'>
            <View className='flex-1 bg-black/40 justify-end'>
                <View className='bg-surface rounded-t-3xl h-[90%] overflow-hidden'>

                    {/* Header */}
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

                    {/* Search */}
                    <View className="px-5 pt-3 pb-2 bg-surface">
                        <View className="flex-row items-center bg-surface-card rounded-full px-3 py-1.5 gap-2 border border-surface-light">
                            <Ionicons name="search" size={18} color="#6B6B70" />
                            <TextInput
                                placeholder="Search users"
                                placeholderTextColor="#6B6B70"
                                className="flex-1 text-foreground text-sm"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Users */}
                    <View className='flex-1'>

                        {isLoading && (
                            <View className='flex-1 items-center justify-center'>
                                <Text className='text-muted-foreground text-lg'>Loading users...</Text>
                            </View>
                        )}

                        {error && (
                            <View className='flex-1 items-center justify-center'>
                                <Text className='text-muted-foreground text-lg'>Failed to load users</Text>
                            </View>
                        )}

                        {!isLoading && !error && users?.length === 0 && (
                            <View className='flex-1 items-center justify-center'>
                                <Text className='text-muted-foreground text-lg'>No users found</Text>
                            </View>
                        )}

                        {!isLoading && !error && (
                            <ScrollView
                                className='flex-1'
                                contentContainerStyle={{ paddingBottom: 24 }}
                            >
                                <Text className='text-foreground text-sm px-5 mb-2 mt-3'>
                                    {users?.length} {users?.length === 1 ? "USER" : "USERS"}
                                </Text>
                                {users?.map((user: User) => (
                                    <UserItem key={user._id} {...user} />
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NewChatScreen;