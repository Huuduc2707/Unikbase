import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ImageStyle, TextStyle, Dimensions, StatusBar, ScrollView } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button, Line, SignInButton, IconTypes } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { TxKeyPath } from "app/i18n"
// import { useStores } from "app/models"

interface ISignInButton {
  icon: IconTypes
  text: TxKeyPath
  navigateTo: string
}

const signInButton: ISignInButton[] = [
  { icon: "mail", text: "common.button.emailSignIn", navigateTo: "EmailSignIn" },
  { icon: "phone", text: "common.button.phoneNumberSignIn", navigateTo: "PhoneSignIn" },
  { icon: "google", text: "common.button.googleSignIn", navigateTo: "GoogleSignIn" },
  { icon: "facebook", text: "common.button.facebookSignIn", navigateTo: "FacebooSignIn" },
]

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={$root} preset="fixed">
      <ScrollView>
        {/* Logo and brand name */}
        <View style={$title}>
          <Icon style={$logo} icon="unikbase" />
          <Text style={$brandNameText} text="unikbase" />
        </View>

        {/* Text zone */}
        <View style={$textContainer}>
          <Text style={$headerText}  tx={"common.textAndLink.welcomeText"} />
          <Text
            style={$instructionText}
            tx={"loginScreen.informText"}
          />
        </View>

        {/* Button zone */}
        <View style={$buttonContainer}>
          <Button
            style={$createAccountButton}
            tx={"common.button.createAccount"}
            textStyle={$createAccountText}
            pressedStyle={$buttonPressed}
            onPress={() => navigation.navigate("Register")}
          />
          <View style={$buttonSeperator}>
            <Line />
            <Text style={$seperatorText} text="or" />
          </View>
          <View style={$signInButtonContanier}>
            {signInButton.map((ele, index) => (
              <SignInButton icon={ele.icon} tx={ele.text} key={index} navigateTo={ele.navigateTo}/>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
})



// Styling zone
const {width, height} = Dimensions.get('window')
// Root container
const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#001B26",
  marginTop: StatusBar.currentHeight,
  alignItems: "center",
  paddingBottom: 40
}

// Logo and brand name section
const $title: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-end",
  marginTop: height*0.15,
}

const $logo: ImageStyle = {
  width: 65,
  height: 65,
}

const $brandNameText: TextStyle = {
  color: "white",
  fontSize: 35,
  lineHeight: 35,
  letterSpacing: 0.5,
}

// Text section
const $textContainer: TextStyle = {
  marginTop: height*0.08,
  // width: width*0.75,
  maxWidth: 350,
  alignItems: "center",
  alignSelf: "center"
}

const $headerText: TextStyle = {
  color: "white",
  fontSize: 23,
  lineHeight: 50,
  letterSpacing: 0.23,
  textAlign: 'center'
}

const $instructionText: TextStyle = {
  fontSize: 17,
  color: "white",
  textAlign: "center",
  marginTop: height*0.015
}

// Button section
const $buttonContainer: ViewStyle = {
  gap: 10,
}

const $createAccountButton: ViewStyle = {
  width: width*0.81,
  backgroundColor: "#F14300",
  marginTop: height*0.05,
  alignSelf: 'center'
}

const $createAccountText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  lineHeight: 16
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}

const $buttonSeperator: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: 'center',
  paddingHorizontal: 35,
  paddingVertical: 15,
}

const $seperatorText: TextStyle = {
  position: 'absolute',
  color: "white",
  fontSize: 18,
  marginHorizontal: width*0.055,
  backgroundColor: '#001B26',
  paddingHorizontal: 20
}

const $signInButtonContanier: ViewStyle = {
  gap: 4,
}
