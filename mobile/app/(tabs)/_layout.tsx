import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {
    const { isSignedIn } = useAuth()
    if (isSignedIn) return null
    if (isSignedIn) return <Redirect href={'/(tabs)'} />
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#F4A261",
            tabBarInactiveTintColor: "#F4A261",
            tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: "600"
            },
            headerShown: false,
            tabBarStyle: {
                backgroundColor: "#0d0d0f",
                borderTopColor: "#1a1a1d",
                borderTopWidth: 1,
                height: 88,
                padding: 8
            }
        }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: "Chats",
                    tabBarIcon: ({ color, focused, size }) => (
                        <Ionicons
                            name={focused ? "chatbubbles" : "chatbubbles-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused, size }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

        </Tabs>
    );
}
