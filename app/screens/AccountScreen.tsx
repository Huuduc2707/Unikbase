/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Dimensions, StatusBar, TextStyle, ImageStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AccountScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Account">> {}

export const AccountScreen: FC<AccountScreenProps> = observer(function AccountScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("MainPage", {screen: "Profile"})}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.account"}/>
      </View>

      {/* Main content */}
      <View style={$bodyContainer}>
        <Text style={$subHeaderText} tx={"mainpageNavigator.profile.account.deleteAccount"}/>
        <Text style={$informText} tx={"mainpageNavigator.profile.account.informText"}/>
        <Button 
            style={$deleteButton} 
            tx={"common.button.deleteAccount"} 
            textStyle={$buttonText} 
            pressedStyle={$buttonPressed} 
            onPress={()=>navigation.navigate("Login")}
          />
      </View>
    </Screen>
  )
})



// Styling zone

const {width, height, fontScale} = Dimensions.get('screen')

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: '#041C25',
  alignItems: 'center',
  marginTop: StatusBar.currentHeight
}

const $headerContainer: ViewStyle = {
  justifyContent: 'center',
  width: width,
  marginTop: height*0.06
}

const $title: TextStyle = {
  color: 'white',
  fontSize: 25 / fontScale,
  lineHeight: 30,
  textAlign: 'center',
  textAlignVertical: 'center'
}

const $headerIconContainer: ViewStyle = {
  position: 'absolute',
  left: width*0.04,
  zIndex: 2
}

const $headerIcon: ImageStyle = {
  width: 18 / fontScale,
  height: 18 / fontScale
}

const $bodyContainer: ViewStyle = {
  flexGrow: 1,
  backgroundColor: 'white',
  marginTop: 22,
  paddingHorizontal: width*0.04,
  paddingBottom: 20
}

const $subHeaderText: TextStyle = {
  marginTop: 21,
  fontSize: 20 / fontScale,
  fontWeight: 'bold'
}

const $informText: TextStyle = {
  marginTop: 21,
  fontSize: 15 / fontScale,
  width: width*0.9
}

const $deleteButton: ViewStyle = {
  width: width*0.9,
  backgroundColor: "#F14300",
  marginTop: 30,
  marginBottom: height*0.015,
  alignSelf: 'center'
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center',
  lineHeight: 18
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}