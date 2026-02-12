import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileTap = () => {
  return (
    <ScrollView className= 'bg-surface pt-20 '
    contentInsetAdjustmentBehavior='automatic'
     
    >
      <Text className='text-white '>Tab Profile</Text>
    </ScrollView>
  )
}

export default ProfileTap

const styles = StyleSheet.create({})