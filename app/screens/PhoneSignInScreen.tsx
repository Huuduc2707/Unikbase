import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, View, ImageStyle, TextStyle, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PhoneSignInScreenProps extends NativeStackScreenProps<AppStackScreenProps<"PhoneSignIn">> {}

export const PhoneSignInScreen: FC<PhoneSignInScreenProps> = observer(function PhoneSignInScreen() {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  function signIn(){
    if(phoneNumber !== "0123456789" || password !== "Johndoe@123"){
      setError("IncorrectInfo")
      return
    }
    navigation.navigate("Login")
  }

  return (
    <Screen style={$root} preset="fixed">
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS==="android"?45:0}>
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
              <Icon style={$arrowIcon} icon="blc"/>
            </View>
            <View style={$form}>
              <Text style={$formName} text="Sign in"/>
              <View style={$inputFieldContainer}>
                <Text style={$inputlabel} text="Phone number"/>
                <TextField status={(error==="IncorrectInfo")?"error":null} containerStyle={$inputField} value={phoneNumber} onChangeText={(text)=>setPhoneNumber(text)}/>
                <Text style={(error==="IncorrectInfo")?$errorText:$hideDisplay} text={(error==="IncorrectInfo")?"Incorrect phone number or password":null}/>
                <Text style={$inputlabel} text="Password"/>
                <TextField status={(error==="IncorrectInfo")?"error":null} containerStyle={$inputField} secureTextEntry={isHiddenPassword} onChangeText={(text)=>setPassword(text)} RightAccessory={()=><Icon style={$viewIcon} icon={isHiddenPassword?"view":"hidden"} onPress={()=>setIsHiddenPassword(!isHiddenPassword)}/>} />
                <Text style={(error==="IncorrectInfo")?$errorText:$hideDisplay} text={(error==="IncorrectInfo")?"Incorrect phone number or password":null}/>
              </View>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate("ForgotPassword")}>
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

// Welcome text section
const $textContainer: TextStyle = {
  marginTop: 65,
  width: 250,
  alignItems: "center",
  alignSelf: "center",
}

const $headerText: TextStyle = {
  color: "white",
  fontSize: 22,
  lineHeight: 50,
}

// Form section
const $formContainer: ViewStyle = {
  backgroundColor: 'white',
  flexDirection: 'row',
  padding: 15,
  marginTop: 20,
}

const $iconContainer: ViewStyle = {
  alignSelf: 'flex-start',
  height: 410,
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
  marginBottom: 15
}

const $inputlabel: TextStyle = {
  fontSize: 15
}

const $inputFieldContainer: ViewStyle = {
  gap: 5
}

const $inputField: ViewStyle = {
  width: 320,
  backgroundColor: 'white',
}

const $viewIcon: ImageStyle = {
  marginVertical: 7.5,
  marginRight: 10
}

const $forgotPasswordText: TextStyle = {
  fontSize: 12
}

const $link: TextStyle = {
  color: 'blue',
  textDecorationLine: 'underline'
}

const $signInButton: ViewStyle = {
  width: 320,
  height: 40,
  backgroundColor: "#F14300",
  marginTop: 25
}

const $signInText: TextStyle = {
  color: "white",
  fontWeight: "bold",
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}

const $footerContainer: ViewStyle = {
  marginTop: 15,
  alignItems: 'center'
}

const $footerText: TextStyle = {
  fontSize: 14
}

const $errorText: TextStyle = {
  fontSize: 13,
  color: 'red',
  width: 320,
  lineHeight: 12
}

const $hideDisplay: ViewStyle = {
  display: 'none'
}