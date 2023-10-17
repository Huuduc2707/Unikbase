import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { WalletScreen, HistoryScreen, ProfileScreen, MoreScreen} from "app/screens"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "app/components"
import { translate } from "app/i18n"
export type MainPageNavigatorParamList = {
  Wallet: undefined
  History: undefined
  Profile: undefined
  More: undefined
}

const Tab = createBottomTabNavigator<MainPageNavigatorParamList>()
export const MainPageNavigator = () => {
  const {bottom} = useSafeAreaInsets()
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: [$tabBar, {height: bottom + 81}],
        tabBarInactiveTintColor: "#818D92",
        tabBarActiveTintColor: "white",
        tabBarItemStyle: $tabBarItem,
        tabBarLabelStyle: $tabBarLabel
      }}
    >
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen} 
        options={{
          tabBarLabel: translate("mainpageNavigator.tabLabel.wallet"),
          tabBarIcon: ({focused}) => (
            <Icon icon="wallet" color={!focused && "#818D92"} size={25}/>
          )
        }}
      />

      <Tab.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{
          tabBarLabel: translate("mainpageNavigator.tabLabel.history"),
          tabBarIcon: ({focused}) => (
            <Icon icon="history" color={focused && 'white'} size={25}/>
          )
        }}
      />

      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: translate("mainpageNavigator.tabLabel.profile"),
          tabBarIcon: ({focused}) => (
            <Icon icon="profile" color={focused && 'white'} size={25}/>
          )
        }}
      />

      <Tab.Screen 
        name="More" 
        component={MoreScreen} 
        options={{
          tabBarLabel: translate("mainpageNavigator.tabLabel.more"),
          tabBarIcon: ({focused}) => (
            <Icon icon="moreList" color={focused && 'white'} size={25}/>
          )
        }}  
      />
    </Tab.Navigator>
  )
}



// Styling zone
const $tabBar: ViewStyle = {
  backgroundColor: '#041C25',
  flexDirection: 'row',
  alignItems: 'flex-start',
  paddingHorizontal: 35,
  paddingTop: 5,
  borderTopWidth: 0
}

const $tabBarItem: ImageStyle = {
  height: '80%'
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  lineHeight: 16
}