import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";


const useAuthSocial = ()=>{
 const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
 const { startSSOFlow } = useSSO();


}

export default useAuthSocial;