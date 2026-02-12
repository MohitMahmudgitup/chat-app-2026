import BottomComponents from '@/components/auth/Bottom'
import CenterSection from '@/components/auth/Center'
import TopSection from '@/components/auth/Top'
import { View, Text,Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const { width, height } = Dimensions.get("window")


const AuthScreen = () => {
  return (
    <View className='flex-1 bg-surface-dark'>
      <TopSection/>
      <CenterSection/>
      <BottomComponents/>
    </View>
  )
}

export default AuthScreen