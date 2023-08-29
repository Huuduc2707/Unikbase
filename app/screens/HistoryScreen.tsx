/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, StatusBar, Dimensions, View, Image, ImageStyle } from "react-native"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HistoryScreenProps {}

export const HistoryScreen: FC<HistoryScreenProps> = observer(function HistoryScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  return (
    <Screen style={$root} preset="fixed">
      {/* Screen title */}
      <Text style={$title} tx={"mainpageNavigator.tabName.tokenHistory"}/>

      {/* Main content */}
      <View style={$bodyContainer}>
        <Image style={$emptyHistoryImage} source={require("../../assets/images/emptyHistory.png")} resizeMode="contain"/>
        <Text style={$emptyHistoryText} tx={"mainpageNavigator.history.emptyHistory"}/>
      </View>
    </Screen>
  )
})



// Styling zone
const {width, fontScale, height} = Dimensions.get("screen")
const $root: ViewStyle = {
  flex: 1,
  backgroundColor: '#041C25',
  alignItems: 'center',
  marginTop: StatusBar.currentHeight
}

const $title: TextStyle = {
  color: 'white',
  fontSize: 27 / fontScale,
  lineHeight: 26,
  marginTop: height*0.06,
  alignSelf: 'center',
  paddingBottom: 26
}

const $bodyContainer: ViewStyle = {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  width: width
}

const $emptyHistoryImage: ImageStyle = {
  width: width,
  height: height*0.35,
  marginTop: height*0.125
}

const $emptyHistoryText: TextStyle = {
  fontSize: 14 / fontScale,
  lineHeight: 20,
  textAlign: 'center',
  width: width*0.9,
  marginTop: height*0.1
}