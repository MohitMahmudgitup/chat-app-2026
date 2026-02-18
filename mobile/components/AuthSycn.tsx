
import { useAuthCallback } from "@/hook/useAuth";
import { useRef, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Sentry from "@sentry/react-native";
const AuthSycn = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser()
  const { mutate: syncUser } = useAuthCallback()
  const hasSynced = useRef(false)
useEffect(() => {
  if (isSignedIn && user && !hasSynced.current) {
    hasSynced.current = true;

    syncUser(undefined, {
      onSuccess: (data : any) => {
        const userData = data?.data;

        console.log("User synced with backend", userData?.name);

        Sentry.captureMessage("User synced with backend", {
          level: "info",
          extra: {
            userId: user.id,
            userName: userData?.name,
          },
        });
      },

      onError: (error) => {
        console.log("User sync failed", error);

        Sentry.captureException(error, {
          extra: {
            userId: user?.id,
          },
        });
      },
    });
  }

  if (!isSignedIn) {
    hasSynced.current = false;
  }
}, [isSignedIn, user, syncUser]);

  return null;
}

export default AuthSycn