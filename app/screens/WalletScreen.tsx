import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, View, ScrollView, Dimensions, TextStyle, ImageStyle, TouchableOpacity, Image } from "react-native"
import { Screen, Text, Icon, Button, SearchModal } from "app/components"
import * as Clipboard from 'expo-clipboard';
import { Popover } from "react-native-popable"
// import { useStores } from "app/models"

interface WalletScreenProps {}

export const WalletScreen: FC<WalletScreenProps> = observer(function WalletScreen() {
  const [hexCode, _] = useState("0x556295de2529b8e0988d2c8df6724bbf695380ee")
  const [isVisible, setIsVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  function copyToClipboard(){
    setIsCopied(true)
    Clipboard.setStringAsync(hexCode)
    setTimeout(()=>setIsCopied(false), 1500)
  }

  return (
    <Screen style={$root} preset="fixed">
      {/* Header */}
      <View style={$headerContainer}>
        {/* Overview */}
        <View style={$overviewContanier}>
          <Icon style={$roundLogo} icon="roundLogo" />
          <View>
            <Text style={[$headerText, $headerNameText]} text="John Doe"/>
            <View style={$overviewSubContainer}>
              <Text style={[$headerText, $headerMoneyText]} text="0.00 EUR"/>
              <TouchableOpacity activeOpacity={0.7}>
                <Icon style={$arrowDownIcon} icon="caretDown" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Code bar */}
        <View style={$codeBarContainer}>
          <Text style={$codeBarText} text={hexCode} numberOfLines={1} ellipsizeMode="tail"/>
          <Popover style={$popover} visible={isCopied} position="left">
            <Text style={$popoverText} tx={"mainpageNavigator.wallet.copied"} />
          </Popover>
          <TouchableOpacity activeOpacity={0.7} onPress={copyToClipboard}>
            <Icon style={isCopied?$hideIcon:$copyIcon} icon="copy"/>
            <Icon style={isCopied?$checkIcon:$hideIcon} icon="check"/>
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <View style={$bodyContainer}>
        {/* Title bar */}
        <View style={$titleBar}>
          <Text style={$titleText} tx={"mainpageNavigator.wallet.titleBar"}/>
          <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsVisible(true)}>
            <Icon style={$titleIcon} icon="roundSearch" />
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <View style={$mainContainer}>
          <Button 
            style={$addButton} 
            textStyle={$addText} 
            pressedStyle={$buttonPressed} 
            tx={"common.button.createDigitalTwin"} 
            RightAccessory={()=>(
              <Icon style={$addIcon} icon="add"/>
            )}  
          />
          <ScrollView contentContainerStyle={$scrollViewContainer}>
              <Image style={$emptyWalletImage} source={require("../../assets/images/emptyWallet.png")} resizeMode="contain" />
              <Text style={$emptyWalletText} tx={"mainpageNavigator.wallet.emptyWallet"}/>
          </ScrollView>
        </View>
      </View>
      <SearchModal visibility={isVisible} setVisibility={setIsVisible}/>
    </Screen>
  )
})



const {width, height, fontScale} = Dimensions.get("screen")
// Styling zone
const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#041C25",
  marginTop: StatusBar.currentHeight,
  alignItems: 'center'
}

const $headerContainer: ViewStyle = {
  marginTop: height*0.07,
  width: width*1
}

const $overviewContanier: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center'
}

const $overviewSubContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center'
}

const $headerText: TextStyle = {
  color: 'white'
}

const $headerNameText: TextStyle = {
  fontSize: 25 / fontScale
}

const $headerMoneyText: TextStyle = {
  fontSize: 18 / fontScale,
  width: width*0.6
}

const $arrowDownIcon: ImageStyle = {
  width: 14 / fontScale,
  height: 14 / fontScale
}

const $roundLogo: ImageStyle = {
  width: 82 / fontScale,
  height: 82 / fontScale,
  marginRight: 20
}

const $codeBarContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: width*0.95 ,
  height: 39,
  backgroundColor: '#E5E8E9',
  marginTop: height*0.04,
  alignSelf: 'center',
  borderRadius: 5,
  borderWidth: 0.5,
  overflow: 'hidden'
}

const $copyIcon: ImageStyle = {
  width: 20 / fontScale,
  height: 20 / fontScale,
  marginLeft: 5
}

const $checkIcon: ImageStyle = {
  width: 20 / fontScale,
  height: 20 / fontScale,
  marginLeft: 5,
  tintColor: 'green'
}

const $codeBarText: TextStyle = {
  width: '87%',
  fontSize: 13 / fontScale
}

const $popover: ViewStyle = {
  position: 'absolute',
  right: width*0.075,
  width: 180
}

const $popoverText: TextStyle = {
  color: 'white',
  height: 35,
  fontSize: 14 / fontScale,
  textAlign: 'center',
  textAlignVertical: 'center'
}

const $hideIcon: ImageStyle = {
  display: 'none'
}

const $bodyContainer: ViewStyle = {
  flex: 1,
  marginTop: 27,
  width: width*1
}

const $titleBar: ViewStyle = {
  backgroundColor: '#E5E8E9',
  width: '100%',
  height: 60,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: width*0.02
}

const $titleText: TextStyle = {
  fontSize: 21 / fontScale,
  paddingLeft: width*0.02
}

const $titleIcon: ImageStyle = {
  width: 36 / fontScale,
  height: 36 / fontScale
}

const $mainContainer: ViewStyle = {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center'
}

const $addButton: ViewStyle = {
  backgroundColor: '#EE4300',
  width: '95%',
  marginTop: 10,
  borderRadius: 5
}

const $addText: TextStyle = {
  fontSize: 14 / fontScale,
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center',
  lineHeight: 17,
  marginRight: 22
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#EE4300",
  opacity: 0.7,
}

const $addIcon: ImageStyle = {
  width: 24 / fontScale,
  height: 24 / fontScale
}

const $scrollViewContainer: ViewStyle = {
  width: '100%',
  marginTop: 8,
  justifyContent: 'center',
  alignItems: 'center'
}

const $emptyWalletImage: ImageStyle = {
  width: width*1,
  height: height*0.28,
  marginTop: 30
}

const $emptyWalletText: TextStyle = {
  fontSize: 14 / fontScale,
  lineHeight: 20,
  textAlign: 'center',
  width: width*0.8,
  marginTop: 27,
  paddingBottom: 40
}