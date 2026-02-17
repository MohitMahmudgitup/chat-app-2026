import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import * as Sentry from "@sentry/react-native"
export default function ChatTap() {
  return (
    <ScrollView className= 'bg-surface pt-20 px-2'
    contentInsetAdjustmentBehavior='automatic'
     
    >
      <Text className='text-white '>Tab chat</Text>
      <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
    </ScrollView>
  );
}

