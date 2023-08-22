/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, View, ImageStyle, TextStyle, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar, Dimensions } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button, ForgotPasswordModal } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface EmailSignInScreenProps extends NativeStackScreenProps<AppStackScreenProps<"EmailSignIn">> {}

export const EmailSignInScreen: FC<EmailSignInScreenProps> = observer(function EmailSignInScreen() {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false)
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  function signIn(){
    if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || email !== "john.doe@gmail.com" || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password) || password !== "Johndoe@123"){
      setError("IncorrectInfo")
      return
    }
    navigation.navigate("Login")
  }

  return (
    <Screen style={$root} preset="fixed">
      <KeyboardAvoidingView behavior={Platform.OS==="android"?"padding":null} keyboardVerticalOffset={Platform.OS==="android"?25:0}>
        <ScrollView>

          {/* Logo and brand name */}
          <View style={$title}>
            <Icon style={$logo} icon="unikbase"/>
            <Text style={$brandNameText} text="unikbase"/>
          </View>

          {/* Welcome text */}
          <View style={$textContainer}>
            <Text style={$headerText} text="Welcome to Unikbase!" />
          </View>

          {/* Sign in form */}
          <View style={$formContainer}>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="tlc"/>
              <Icon style={$arrowIcon} icon="trc"/>
            </View>
            <View style={$form}>
              <Text style={$formName} text="Sign in"/>
              <View style={$inputFieldContainer}>
                <Text style={$inputlabel} text="Email"/>
                <TextField status={(error==="IncorrectInfo")?"error":null} containerStyle={$inputField} value={email} onChangeText={(text)=>setEmail(text)}/>
                <Text style={(error==="IncorrectInfo")?$errorText:$hideDisplay} text={(error==="IncorrectInfo")?"Incorrect email or password.":null}/>
                <Text style={$inputlabel} text="Password"/>
                <TextField status={(error==="IncorrectInfo")?"error":null} containerStyle={$inputField} value={password} secureTextEntry={isHiddenPassword} onChangeText={(text)=>setPassword(text)} RightAccessory={()=><Icon style={[$viewIcon, error==="IncorrectInfo"?{tintColor:'red'}:null]} icon={isHiddenPassword?"view":"hidden"} onPress={()=>setIsHiddenPassword(!isHiddenPassword)}/>} />
                <Text style={(error==="IncorrectInfo")?$errorText:$hideDisplay} text={(error==="IncorrectInfo")?"Incorrect email or password.":null}/>
              </View>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsForgotPasswordVisible(true)}>
                <Text style={[$forgotPasswordText, $link]} text="Forgot your password?"/>
              </TouchableOpacity>
              <Button style={$signInButton} text="CONTINUE" textStyle={$signInText} pressedStyle={$buttonPressed} onPress={signIn}/>
              <View style={$footerContainer}>
                <Text style={$footerText} text="New to Unikbase?"/>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate("Register")}>
                  <Text style={[$footerText, $link]} text="Create an account"/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="blc"/>
              <Icon style={$arrowIcon} icon="brc"/>
            </View>
          </View>
        </ScrollView>
        <ForgotPasswordModal isVisible={isForgotPasswordVisible} setIsVisible={setIsForgotPasswordVisible}/>
      </KeyboardAvoidingView>
    </Screen>
  )
})



const {width, height, fontScale} = Dimensions.get('window')

// Styling zone
const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#001B26",
  marginTop: StatusBar.currentHeight,
  alignItems: 'center'
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

// Welcome text section
const $textContainer: TextStyle = {
  marginTop: height*0.07,
  alignItems: "center"
}

const $headerText: TextStyle = {
  color: "white",
  fontSize: 22 / fontScale,
  lineHeight: 50,
}

// Form section
const $formContainer: ViewStyle = {
  backgroundColor: 'white',
  marginTop: height*0.04,
  height: height*0.63,
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

const $inputlabel: TextStyle = {
  fontSize: 15 / fontScale,
  marginBottom: -height*0.012,
}

const $inputFieldContainer: ViewStyle = {
  gap: height*0.013
}

const $inputField: ViewStyle = {
  width: width*0.85,
  height: height*0.05,
  backgroundColor: 'white',
}

const $viewIcon: ImageStyle = {
  marginRight: 10,
  marginVertical: height*0.05/6.5
}

const $forgotPasswordText: TextStyle = {
  fontSize: 12 / fontScale,
  marginTop: height*0.01
}

const $link: TextStyle = {
  color: 'blue',
  textDecorationLine: 'underline'
}

const $signInButton: ViewStyle = {
  width: width*0.85,
  backgroundColor: "#F14300",
  marginTop: height*0.02
}

const $signInText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center'
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}

const $footerContainer: ViewStyle = {
  marginTop: height*0.02,
  alignItems: 'center'
}

const $footerText: TextStyle = {
  fontSize: 14 /fontScale
}

const $errorText: TextStyle = {
  fontSize: 13,
  color: 'red',
  marginTop: -height*0.005,
  width: width*0.85,
  lineHeight: 14
}

const $hideDisplay: ViewStyle = {
  display: 'none'
}