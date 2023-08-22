import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ImageStyle, TextStyle, Dimensions, StatusBar } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button, Line, SignInButton, IconTypes } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ISignInButton {
  icon: IconTypes
  text: string
  navigateTo: string
}

const signInButton: ISignInButton[] = [
  { icon: "mail", text: "Sign in with Email", navigateTo: "EmailSignIn" },
  { icon: "phone", text: "Sign in with Phone Number", navigateTo: "PhoneSignIn" },
  { icon: "google", text: "Continue with Google", navigateTo: "GoogleSignIn" },
  { icon: "facebook", text: "Continue with Facebook", navigateTo: "FacebooSignIn" },
]

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={$root} preset="fixed">
      {/* Logo and brand name */}
      <View style={$title}>
        <Icon style={$logo} icon="unikbase" />
        <Text style={$brandNameText} text="unikbase" />
      </View>

      {/* Text zone */}
      <View style={$textContainer}>
        <Text style={$headerText} text="Welcome to Unikbase!" />
        <Text
          style={$instructionText}
          text="Create your account or sign into an existing account to build and manage your digital twins."
        />
      </View>

      {/* Button zone */}
      <View style={$buttonContainer}>
        <Button
          style={$createAccountButton}
          text="CREATE ACCOUNT"
          textStyle={$createAccountText}
          pressedStyle={$buttonPressed}
          onPress={() => navigation.navigate("Register")}
        />
        <View style={$buttonSeperator}>
          <Line />
          <Text style={$seperatorText} text="or" />
          <Line />
        </View>
        <View style={$signInButtonContanier}>
          {signInButton.map((ele, index) => (
            <SignInButton icon={ele.icon} text={ele.text} key={index} navigateTo={ele.navigateTo}/>
          ))}
        </View>
      </View>
    </Screen>
  )
})

// Styling zone
// Root container
const {width, height} = Dimensions.get('window')

const $root: ViewStyle = {
  backgroundColor: "#001B26",
  marginTop: StatusBar.currentHeight,
  alignItems: "center",
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
  width: width*0.75,
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
  fontWeight: "bold"
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}

const $buttonSeperator: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: 'center'
}

const $seperatorText: TextStyle = {
  color: "white",
  fontSize: 18,
  marginHorizontal: width*0.055
}

const $signInButtonContanier: ViewStyle = {
  gap: 4,
}
