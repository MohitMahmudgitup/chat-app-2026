import BottomComponents from '@/components/auth/Bottom'
import CenterSection from '@/components/auth/Center'
import TopSection from '@/components/auth/Top'
import useAuthSocial from '@/hook/useSocialAuth'
import { View, Text, Dimensions, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const { width, height } = Dimensions.get("window")
import { LinearGradient } from "expo-linear-gradient"
import { AnimatedOrb } from '@/components/AnimatedOrb'
import { BlurView } from "expo-blur";

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial()

  return (
    // Todo animation ords

    <View className='flex-1 bg-surface-dark'>
      <LinearGradient
        colors={["#0D0D0F", "#1A1A2E", "#16213E", "#0D0D0F"]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <AnimatedOrb
        colors={["#F4A261", "#E76F51"]}
        size={300}
        initialX={-80}
        initialY={height * 0.1}
        duration={4000}
      />
      <AnimatedOrb
        colors={["#E76F51", "#F4A261"]}
        size={250}
        initialX={width - 100}
        initialY={height * 0.3}
        duration={5000}
      />
      <AnimatedOrb
        colors={["#FFD7BA", "#F4A261"]}
        size={200}
        initialX={width * 0.3}
        initialY={height * 0.6}
        duration={3500}
      />
      <AnimatedOrb
        colors={["#F4B183", "#E76F51"]}
        size={180}
        initialX={-50}
        initialY={height * 0.75}
        duration={4500}
      />
      <BlurView
        intensity={70}
        tint="dark"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <TopSection />
      <CenterSection />
      <BottomComponents handleSocialAuth={handleSocialAuth} loadingStrategy={loadingStrategy} />
    </View>
  )
}

export default AuthScreen