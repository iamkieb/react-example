import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ScreenA from "./ScreenA"
import ScreenB from "./ScreenB"
import Ionicons from "@expo/vector-icons/Ionicons"

const Tab = createBottomTabNavigator()
// const Tab = createMaterialBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator()

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName
            if (route.name === "Screen_A") {
              iconName = "md-checkmark-circle"
              size = focused ? 25 : 20
              color = focused ? "#f0f" : "#555"
            } else if (route.name === "Screen_B") {
              iconName = "md-checkmark-circle"
              size = focused ? 25 : 20
              color = focused ? "#f0f" : "#555"
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
        screenOptions={{
          activeTintColor: "#f0f",
          inactiveTintColor: "#555",
          activeBackgroundColor: "#fff",
          inactiveBackgroundColor: "#999",
          showLabel: true,
          labelStyle: { fontSize: 14 },
          showIcon: true,
        }}
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: "#694fad" }}
      >
        <Tab.Screen name="Screen_A" component={ScreenA} />
        <Tab.Screen name="Screen_B" component={ScreenB} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
