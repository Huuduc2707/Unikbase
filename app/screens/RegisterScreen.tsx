/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ImageStyle, TextStyle, KeyboardAvoidingView, ScrollView, TouchableOpacity, StatusBar, Dimensions, Platform } from "react-native"
import CheckBox from "expo-checkbox"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button, PhoneCodePicker } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface RegisterScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Register">> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen() {
  const [isChecked, setIsChecked] = useState(false)
  const [isHiddenPassword, setIsHiddenPassword] = useState(true)
  const [isHiddenConfirmPassword, setIsHiddenConfirmPassword] = useState(true)
  const [phoneCode, setPhoneCode] = useState({countryCode: "VN", dialCode:"+84"})
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()


  function createAccount(){
    if(username === "John Doe"){
      setError("Username")
      return
    }
    if(email === "john.doe@gmail.com"){
      setError("Email")
      return
    }
    if(phoneCode.dialCode + phoneNumber === "+84818314202"){
      setError("PhoneNumber")
      return
    }
    if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password)){
      setError("Password")
      return
    }
    if(password !== confirmPassword){
      setError("ConfirmPassword")
      return
    }
    navigation.navigate("EmailVerifyAccount")
  }

  return (
    <Screen style={$root} preset="fixed">
      <KeyboardAvoidingView behavior={ Platform.OS==="android"?"padding":null } keyboardVerticalOffset={Platform.OS==="android"?25:0}>
        <ScrollView>
          {/* Logo and brand name */}
          <View style={$title}>
            <Icon style={$logo} icon="unikbase"/>
            <Text style={$brandNameText} text="unikbase"/>
          </View>
          {/* Register form */}
          <View style={$formContainer}>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="tlc"/>
              <Icon style={$arrowIcon} icon="trc"/>
            </View>
            <View style={$form}>
              <Text style={$formName} text="Create Account"/>
              <View style={$inputFieldContainer}>
                <TextField status={(error==="Username")?"error":null} inputWrapperStyle={$inputField} placeholder="Username" value={username} onChangeText={(text)=>setUsername(text)}/>
                <Text style={(error==="Username")?$errorText:$hideDisplay} text={(error==="Username")? "Username is already taken. Please try again.":null}/>
                <TextField status={(error==="Email")?"error":null} inputWrapperStyle={$inputField} placeholder="Email" value={email} onChangeText={(text)=>setEmail(text)}/>
                <Text style={(error==="Email")?$errorText:$hideDisplay} text={(error==="Email")? "This email already in use. Please enter another email.":null}/>
                <TextField status={(error==="PhoneNumber")?"error":null} inputWrapperStyle={$inputField} placeholder="Phone number" value={phoneNumber} LeftAccessory={()=><PhoneCodePicker style={$phoneCodePicker} selected={phoneCode} setSelected={setPhoneCode}/>} onChangeText={(text)=>setPhoneNumber(text)}/>
                <Text style={(error==="PhoneNumber")?$errorText:$hideDisplay} text={(error==="PhoneNumber")? "This phone number is already in use. Please enter another phone number.":null}/>
                <TextField status={(error==="Password")?"error":null} inputWrapperStyle={$inputField} placeholder="Password" secureTextEntry={isHiddenPassword} value={password} onChangeText={(text)=>setPassword(text)} RightAccessory={()=><Icon style={[$viewIcon, error==="Password"?{tintColor:'red'}:null]} icon={isHiddenPassword?"view":"hidden"} onPress={()=>setIsHiddenPassword(!isHiddenPassword)}/>} />
                <Text style={(error==="Password")?$errorText:$hideDisplay} text={(error==="Password")? "Kindly ensure that your password consists of at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.":null}/>
                <TextField status={(error==="ConfirmPassword")?"error":null} inputWrapperStyle={$inputField} placeholder="Confirm Password" secureTextEntry={isHiddenConfirmPassword} value={confirmPassword} onChangeText={(text)=>setConfirmPassword(text)}  RightAccessory={()=><Icon style={[$viewIcon, error==="ConfirmPassword"?{tintColor:'red'}:null]} icon={isHiddenConfirmPassword?"view":"hidden"} onPress={()=>setIsHiddenConfirmPassword(!isHiddenConfirmPassword)}/>} />
                <Text style={(error==="ConfirmPassword")?$errorText:$hideDisplay} text={(error==="ConfirmPassword")? "Password fields must match.":null}/>
              </View>
              <View style={$checkboxContainer}>
                <CheckBox style={$checkbox} color={isChecked?'blue':'black'} value={isChecked} onValueChange={()=>setIsChecked(!isChecked)}/>
                <Text style={$checkboxText}>Accept <Text style={[$checkboxText, $link]}>Privacy Policy</Text> and <Text style={[$checkboxText, $link]}>Terms and Conditions.</Text></Text>
              </View>
              <Button style={$createAccountButton} text="CREATE ACCOUNT" textStyle={$createAccountText} pressedStyle={$buttonPressed} onPress={createAccount}/>
              <View style={$footerContainer}>
                <Text style={$footerText} text="Already using Unikbase?"/>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate("Login")}>
                  <Text style={[$footerText, $link]} text="Sign in"/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="blc"/>
              <Icon style={$arrowIcon} icon="brc"/>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
})



const {width, height, fontScale} = Dimensions.get('window')
// Styling zone
const $root: ViewStyle = {
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

const $inputFieldContainer: ViewStyle = {
  gap: height*0.013
}

const $inputField: ViewStyle = {
  width: width*0.85,
  height: height*0.05,
  backgroundColor: 'white',
}

const $phoneCodePicker: ViewStyle = {
  alignSelf: 'center',
  marginLeft: 5
}

const $viewIcon: ImageStyle = {
  marginRight: 10,
  marginVertical: height*0.05/6.5
}

const $checkboxContainer: ViewStyle = {
  width: width*0.85,
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: height*0.003
}

const $checkbox: ViewStyle = {
  width: width*0.06,
  height: width*0.06,
  maxWidth: 30,
  maxHeight: 30,
  borderWidth: 1,
  marginRight: 5
}

const $checkboxText: TextStyle = {
  fontSize: 12/ fontScale
}

const $link: TextStyle = {
  color: 'blue',
  textDecorationLine: 'underline'
}

const $createAccountButton: ViewStyle = {
  width: width*0.85,
  backgroundColor: "#F14300",
  marginTop: height*0.02
}

const $createAccountText: TextStyle = {
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
  fontSize: 14 / fontScale
}

const $errorText: TextStyle = {
  fontSize: 12,
  color: 'red',
  marginTop: -height*0.01,
  width: width*0.85,
  lineHeight: 15
}

const $hideDisplay: ViewStyle = {
  display: 'none'
}