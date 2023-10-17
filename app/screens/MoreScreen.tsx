/* eslint-disable object-shorthand */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, Dimensions, ScrollView, TextStyle, TouchableOpacity, ImageStyle } from "react-native"
import { Screen, Text, Icon, LogoutModal } from "app/components"
import { TxKeyPath } from "app/i18n"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface MoreScreenProps {}

export const MoreScreen: FC<MoreScreenProps> = observer(function MoreScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [isVisible, setIsVisible] = useState(false)
  const navigation = useNavigation()

  const destinationScreen: string[] = ["ScanNfcTag", "Faq", "PrivacyPolicy", "TermsAndConditions"]
  const navigationTab: TxKeyPath[] = [
    "mainpageNavigator.tabName.scanNFCTag", 
    "mainpageNavigator.tabName.FAQ", 
    "mainpageNavigator.tabName.privacyPolicy", 
    "mainpageNavigator.tabName.termAndCondition"
  ]
  
  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <Text style={$title} tx={"mainpageNavigator.tabName.more"}/>

      {/* Main content */}
      <ScrollView contentContainerStyle={$bodyContainer}>
        {
          navigationTab.map((value, index)=>(
            <TouchableOpacity key={index} style={$navigationTabContainer} activeOpacity={0.7} onPress={()=>navigation.navigate(destinationScreen[index])}>
              <Text style={$navigationTabText} tx={value} />
              <Icon style={$navigationTabIcon} icon="caretRight"/>
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity style={$navigationTabContainer} activeOpacity={0.7} onPress={()=>setIsVisible(true)}>
          <Text style={$navigationTabText} tx={"mainpageNavigator.tabName.logout"} />
          <Icon style={$navigationTabIcon} icon="caretRight"/>
        </TouchableOpacity>
      </ScrollView>
      <LogoutModal visibility={isVisible} setVisibility={setIsVisible}/>
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

const $title: TextStyle = {
  color: 'white',
  fontSize: 25 / fontScale,
  lineHeight: 25,
  marginTop: height*0.06,
  alignSelf: 'center',
  paddingBottom: 26
}

const $bodyContainer: ViewStyle = {
  flexGrow: 1,
  backgroundColor: 'white',
  width: width,
  paddingBottom: 10
}

const $navigationTabContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: "space-between",
  alignItems: 'center',
  backgroundColor: '#E5E8E9',
  paddingVertical: 16,
  paddingHorizontal: 17,
  marginTop: 13
}

const $navigationTabText: TextStyle = {
  fontSize: 18 / fontScale
}

const $navigationTabIcon: ImageStyle = {
  width: 20 / fontScale,
  height: 20 / fontScale
}