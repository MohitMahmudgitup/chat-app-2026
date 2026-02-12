import { View, Text, Image } from 'react-native'
import React from 'react'

const CenterSection = () => {
    return (
        <View className='flex-1  justify-center items-center px-6 pt-10'>
            <Image
                source={require("../../assets/images/auth.png")}
                className='w-96 h-72'
            />
            {/* headline */}
            <View className="mt-8 items-center">
                <Text className="text-4xl font-bold text-foreground text-center font-serif tracking-wider w-full">
                    Connect & Chat
                </Text>
                <Text className="text-3xl font-normal text-primary font-serif ">Seamlessly</Text>
            </View>
        </View>
    )
}

export default CenterSection