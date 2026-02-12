import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const TopSection = () => {
    return (
        <SafeAreaView className='flex-1'>
            <View className="items-center pt-10">
                <Image source={require("../../assets/images/logo.png")} className='w-20 h-20 '/>
                <Text className="text-4xl w-full  text-center font-bold text-primary font-serif tracking-wider uppercase">
                    Hello talk
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default TopSection