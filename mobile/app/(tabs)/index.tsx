import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ChatTap() {
  return (
    <ScrollView className= 'bg-surface pt-20 px-2'
    contentInsetAdjustmentBehavior='automatic'
     
    >
      <Text className='text-white '>Tab chat</Text>
    </ScrollView>
  );
}

