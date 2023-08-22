import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ImageStyle, StatusBar, Dimensions } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CompleteVerifyAccountScreenProps extends NativeStackScreenProps<AppStackScreenProps<"CompleteVerifyAccount">> {}

export const CompleteVerifyAccountScreen: FC<CompleteVerifyAccountScreenProps> = observer(function CompleteVerifyAccountScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  return (
    <Screen style={$root} preset="fixed">
          {/* Logo and brand name */}
          <View style={$title}>
            <Icon style={$logo} icon="unikbase"/>
            <Text style={$brandNameText} text="unikbase"/>
          </View>

          {/* Verify form */}
          <View style={$formContainer}>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="tlc"/>
              <Icon style={$arrowIcon} icon="trc"/>
            </View>
            <View style={$form}>
              <Text style={$formName} text="Congratulations!"/> 
              <Text style={$informText}>You've successfully verified your Unikbase account. Process now to fully enjoy our awesome features!</Text>
              <Button style={$doneButton} text="DONE" textStyle={$doneText} pressedStyle={$buttonPressed} onPress={()=>navigation.navigate("Login")}/>
            </View>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="blc"/>
              <Icon style={$arrowIcon} icon="brc"/>
            </View>
            <Text style={$footerText} text="For lost email or forgotten email address. You can change and verify your details under Setting > Security & Privacy."/>
          </View>
    </Screen>
  )
})



const {width, height, fontScale} = Dimensions.get('window')

// Styling zone
const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#001B26",
  marginTop: StatusBar.currentHeight
}

// Logo and brand name section
const $title: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end',
  marginTop: height*0.15,
}

const $logo: ImageStyle = {
  width: 65 / fontScale,
  height: 65 / fontScale
}

const $brandNameText: TextStyle = {
  color: 'white',
  fontSize: 35 / fontScale,
  fontWeight: 'normal',
  lineHeight: 35,
  letterSpacing: 0.5
}

// Form section
const $formContainer: ViewStyle = {
  backgroundColor: 'white',
  marginTop: height*0.065,
  height: height*0.73,
  width: width*1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: height*0.025
}

const $iconContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: width*0.82
}

const $arrowIcon: ImageStyle = {
  width: 15 / fontScale,
  height: 15 / fontScale
}

const $form: ViewStyle = {
  alignItems: 'center',
  marginTop: -10
}

const $formName: TextStyle = {
  fontSize: 19 / fontScale,
  marginBottom: height*0.025
}

const $informText: TextStyle = {
  fontSize: 18 / fontScale,
  textAlign: 'center',
  width: width*0.85
}

const $footerText: TextStyle = {
  fontSize: 15 / fontScale,
  marginTop: height*0.03,
  width: width*0.85,
  textAlign: 'center'
}

const $doneButton: ViewStyle = {
  width: width*0.85,
  backgroundColor: "#F14300",
  marginTop: height*0.04,
  marginBottom: height*0.03
}

const $doneText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center'
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}