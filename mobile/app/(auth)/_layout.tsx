import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { Redirect, Stack, useRouter } from "expo-router";

const AuthLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Navigate to the main tab page after login
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) return null;

  if (isSignedIn) {
    // You can also render null here because useEffect handles navigation
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;