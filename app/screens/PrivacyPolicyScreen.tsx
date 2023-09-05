/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Dimensions, StatusBar, TextStyle, ImageStyle, ScrollView } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Screen, Text, Icon } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PrivacyPolicyScreenProps extends NativeStackScreenProps<AppStackScreenProps<"PrivacyPolicy">> {}

export const PrivacyPolicyScreen: FC<PrivacyPolicyScreenProps> = observer(function PrivacyPolicyScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const {bottom} = useSafeAreaInsets()
  const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("MainPage", {screen: "More"})}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.privacyPolicy"}/>
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={$bodyContainer} style={{marginBottom: bottom}}>
        <Text style={$sectionHeader} tx={"mainpageNavigator.tabName.privacyPolicy"}/>
        <Text style={$introText} tx={"mainpageNavigator.more.privacyAndPolicy.intro"}/>
        <View style={$policyContainer}>
          <View style={$policyHeader}>
            <Text style={$policyOrder} text="01"/>
            <Text style={$policyHeaderText} tx={"mainpageNavigator.more.privacyAndPolicy.policyHeader.header1"}/>
          </View>
          <Text style={$policyContent} tx={"mainpageNavigator.more.privacyAndPolicy.policyContent.content1"}/>
        </View>
        <View style={$policyContainer}>
          <View style={$policyHeader}>
            <Text style={$policyOrder} text="02"/>
            <Text style={$policyHeaderText} tx={"mainpageNavigator.more.privacyAndPolicy.policyHeader.header2"}/>
          </View>
          <Text style={$policySubHeader} tx={"mainpageNavigator.more.privacyAndPolicy.policySubHeader.subHeader1"}/>
          <Text style={$policyContent} tx={"mainpageNavigator.more.privacyAndPolicy.policyContent.content2"}/>
        </View>
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

const $introText: TextStyle = {
  marginTop: 25,
  width: '100%',
  fontSize: 17 / fontScale
}

const $policyContainer: ViewStyle = {
  marginTop: 38
}

const $policyHeader: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 13
}

const $policyOrder: TextStyle = {
  fontSize: 16 / fontScale,
  fontWeight: 'bold'
}

const $policyHeaderText: TextStyle = {
  marginLeft: 11,
  fontSize: 16 / fontScale,
  fontWeight: 'bold'
}

const $policySubHeader: TextStyle = {
  fontSize: 15 / fontScale,
  fontWeight: 'bold'
}

const $policyContent: TextStyle = {
  fontSize: 14.5 / fontScale
}