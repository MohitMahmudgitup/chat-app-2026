import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'


const BottomComponents = ({ loadingStrategy, handleSocialAuth }: any) => {
    const isLoading  = loadingStrategy !== null;
    return (
        <View className='flex-1 justify-center gap-4 pt-20 px-4'>

            <Pressable
                className="flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]"
                accessibilityLabel="Continue with Google"
                accessibilityRole="button"
                  disabled={isLoading}
                onPress={() =>!isLoading &&  handleSocialAuth("oauth_google")}
            >
                {loadingStrategy === "oauth_google" ? (
                    <ActivityIndicator size="small" color="#1a1a1a" />
                ) : (
                    <>
                        <Image
                            source={require("../../assets/images/google.png")}
                            style={{ width: 20, height: 20 }}
                        />
                        <Text className="text-gray-900 font-semibold text-sm">Google</Text>
                    </>
                )}
            </Pressable>

            <Pressable
                className="flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl border border-white/20 active:scale-[0.97]"
                accessibilityLabel="Continue with Apple"
                accessibilityRole="button"
                  disabled={isLoading}
                onPress={() =>!isLoading && handleSocialAuth("oauth_apple")}
            >
                {loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                  <Text className="text-foreground font-semibold text-sm">Apple</Text>
                </>
              )}
            </Pressable>

        </View>
    )
}

export default BottomComponents
