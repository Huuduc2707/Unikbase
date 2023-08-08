import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, KeyboardAvoidingView, View, TextStyle, ImageStyle, Platform } from "react-native"
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
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS==="android"?45:0}>
        <ScrollView>
          {/* Logo and brand name */}
          <View style={$title}>
            <Icon style={$logo} icon="unikbase"/>
            <Text style={$brandNameText} text="unikbase"/>
          </View>

          {/* Verify form */}
          <View style={$formContainer}>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="tlc"/>
              <Icon style={$arrowIcon} icon="blc"/>
            </View>
            <View style={$form}>
              <Text style={$formName} text="Congratulations!"/> 
              <Text style={$informText}>You've successfully verified your Unikbase account. Process now to fully enjoy our awesome features!</Text>
              <Button style={$doneButton} text="DONE" textStyle={$doneText} pressedStyle={$buttonPressed} onPress={()=>navigation.navigate("Login")}/>
              <Text style={$footerText} text="For lost email or forgotten email address. You can change and verify your details under Setting > Security & Privacy."/>
            </View>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="trc"/>
              <Icon style={$arrowIcon} icon="brc"/>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
})



// Styling zone
const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#001B26",
  marginTop: 35
}

// Logo and brand name section
const $title: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-end',
  marginTop: 130,
}

const $logo: ImageStyle = {
  width: 65,
  height: 65
}

const $brandNameText: TextStyle = {
  color: 'white',
  fontSize: 35,
  fontWeight: 'normal',
  lineHeight: 35,
  letterSpacing: 0.5
}

// Form section
const $formContainer: ViewStyle = {
  backgroundColor: 'white',
  flexDirection: 'row',
  padding: 15,
  marginTop: 65,
  height: 510
}

const $iconContainer: ViewStyle = {
  alignSelf: 'flex-start',
  height: 230,
  justifyContent: 'space-between'
}

const $arrowIcon: ImageStyle = {
  width: 15,
  height: 15
}

const $form: ViewStyle = {
  marginVertical: 10,
  width: 330,
  alignItems: 'center'
}

const $formName: TextStyle = {
  fontSize: 19,
  marginBottom: 25
}

const $informText: TextStyle = {
  fontSize: 18,
  textAlign: 'center',
  width: 350
}

const $footerText: TextStyle = {
  fontSize: 15,
  marginTop: 50,
  width: 320,
  textAlign: 'center'
}

const $doneButton: ViewStyle = {
  width: 320,
  height: 40,
  backgroundColor: "#F14300",
  marginTop: 35
}

const $doneText: TextStyle = {
  color: "white",
  fontWeight: "bold"
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}