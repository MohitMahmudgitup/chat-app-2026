import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";


const useAuthSocial = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const { startSSOFlow } = useSSO();

    const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
        setLoadingStrategy(strategy);

        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy });

            if (!createdSessionId) {
                Alert.alert("Cancelled", "Authentication was cancelled.");
                return;
            }

            await setActive?.({ session: createdSessionId });

        } catch (error) {
            if (error instanceof Error) {
                console.log("💥 Error message:", error.message);
            } else {
                console.log("💥 Unknown error:", error);
            }


            const provider = strategy === "oauth_google" ? "Google" : "Apple";

            Alert.alert(
                "Authentication Error",
                `Failed to sign in with ${provider}. Please try again.`
            );

        } finally {
            setLoadingStrategy(null);
        }
    };


    return { handleSocialAuth, loadingStrategy };
}

export default useAuthSocial;