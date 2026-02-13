import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

const ProfileTap = () => {
  const {signOut}  = useAuth()
  return (
    <ScrollView className= 'bg-surface pt-20 '
    contentInsetAdjustmentBehavior='automatic'
     
    >
      <Text classNam-e='text-white '>Tab Profile</Text>
      <Pressable onPress={()=>signOut()} className='mt-4 bg-red-600 px-4 py-2'>
        <Text classNam-e='text-white '>signout</Text>
      </Pressable>
    </ScrollView>
  )
}

export default ProfileTap
