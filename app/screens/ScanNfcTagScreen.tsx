/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, Dimensions, View, TextStyle, ImageStyle, TouchableOpacity, Image } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ScanNfcTagScreenProps extends NativeStackScreenProps<AppStackScreenProps<"ScanNfcTag">> {}

export const ScanNfcTagScreen: FC<ScanNfcTagScreenProps> = observer(function ScanNfcTagScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("MainPage", {screen: "More"})}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.scanNFCTag"}/>
      </View>

      {/* Main content */}
      <View style={$bodyContainer}>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={$scanButton} tx={"mainpageNavigator.more.scanNFCTag.readyToScan"}/>
        </TouchableOpacity>
        <Image style={$image} source={require("../../assets/images/scanNFCTag.png")} resizeMode="contain"/>
        <Text style={$informText} tx={"mainpageNavigator.more.scanNFCTag.scanInform"}/>
      </View>
    </Screen>
  )
})



// Styling zone
const {fontScale, height, width} = Dimensions.get('screen')

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
  flex: 1,
  backgroundColor: 'white',
  marginTop: 22
}

const $scanButton: TextStyle = {
  marginTop: 21,
  fontSize: 20 / fontScale,
  marginLeft: width*0.04
}

const $image: ImageStyle = {
  width: '100%',
  height: height*0.35,
  marginTop: height*0.146
}

const $informText: TextStyle = {
  marginTop: height*0.124,
  textAlign: 'center',
  fontSize: 14 / fontScale,
  width: width*0.6,
  alignSelf: 'center',
  lineHeight: 18
}