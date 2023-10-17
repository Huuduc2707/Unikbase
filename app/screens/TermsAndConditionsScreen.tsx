/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, View, ScrollView, TouchableOpacity, TextStyle, ImageStyle, StatusBar } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TxKeyPath } from "app/i18n"
// import { useStores } from "app/models"

interface TermAndCondition{
  header: TxKeyPath
  content: TxKeyPath
}

interface TermsAndConditionsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"TermsAndConditions">> {}

export const TermsAndConditionsScreen: FC<TermsAndConditionsScreenProps> = observer(function TermsAndConditionsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const termAndCondition: TermAndCondition[] = [
    {header: "mainpageNavigator.more.termAndCondition.header.header1", content: "mainpageNavigator.more.termAndCondition.content.content1"},
    {header: "mainpageNavigator.more.termAndCondition.header.header2", content: "mainpageNavigator.more.termAndCondition.content.content2"},
    {header: "mainpageNavigator.more.termAndCondition.header.header3", content: "mainpageNavigator.more.termAndCondition.content.content3"},
    {header: "mainpageNavigator.more.termAndCondition.header.header4", content: "mainpageNavigator.more.termAndCondition.content.content4"}
  ]
  const {bottom} = useSafeAreaInsets()
  const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("MainPage", {screen: "More"})}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.termAndCondition"}/>
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={$bodyContainer} style={{marginBottom: bottom}}>
        <Text style={$sectionHeader} tx={"mainpageNavigator.more.termAndCondition.termOfUse"}/>
        {
          termAndCondition.map((value, index)=>(
            <View key={index} style={{marginTop: (index===0)?21:35}}>
              <Text style={$TACHeader} tx={value.header}/>
              <Text style={$TACContent} tx={value.content}/>
            </View>
          ))
        }
      </ScrollView>
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
  marginTop: height*0.06,
  marginBottom: 22
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
  paddingHorizontal: width*0.04,
  paddingBottom: 20
}

const $sectionHeader: TextStyle = {
  marginTop: 21,
  fontSize: 22 / fontScale,
  fontWeight: 'bold'
}

const $TACHeader: TextStyle = {
  fontSize: 16 / fontScale,
  fontWeight: 'bold'
}

const $TACContent: TextStyle = {
  fontSize: 14.5 / fontScale,
  marginTop: 8
}