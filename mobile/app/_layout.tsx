import { Stack } from "expo-router";
import "../global.css"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import AuthSycn from "@/components/AuthSycn";
import { StatusBar } from "expo-status-bar";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://39bb9bfc02958306cbe276c99d8e9ca1@o4510895057534976.ingest.de.sentry.io/4510895060549712',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
const queryClient = new QueryClient()

export default Sentry.wrap(function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} >
      <QueryClientProvider client={queryClient}>
        <AuthSycn/>
       <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false , contentStyle : {backgroundColor : "#0d0d0f"} }}>
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
          <Stack.Screen name="new-chat" options={{ animation: "slide_from_bottom" , presentation : "modal" , gestureEnabled : true }}  />
        </Stack>
      </QueryClientProvider>
    </ClerkProvider>
  )
});