
import { useAuthCallback } from "@/hook/useAuth";
import { useRef, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
const AuthSycn = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser()
  const { mutate: syncUser } = useAuthCallback()
  const hasSynced = useRef(false)
  useEffect(() => {
    if (isSignedIn && user && !hasSynced.current) {
      hasSynced.current = true;
      syncUser(undefined, {
        onSuccess: ({data}) => {
          console.log("User synced with backend ", data?.name)
        },
        onError: (data) => {
          console.log("User synced faild backend ", data)
        }
      })
    }
    if (!isSignedIn) hasSynced.current = false;

  }, [isSignedIn, syncUser])
  return null;
}

export default AuthSycn