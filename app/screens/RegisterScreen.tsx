/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ImageStyle, TextStyle, KeyboardAvoidingView, ScrollView, TouchableOpacity, StatusBar, Dimensions, Platform } from "react-native"
import CheckBox from "expo-checkbox"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button, PhoneCodePicker } from "app/components"
import Toast from "react-native-root-toast"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface Error{
  code: string
  message: string
}

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
  const [error, setError] = useState<Error>({code:"", message:""})
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const errorList = [
    {code:"Invalid username", message: "Your username is invalid."},
    {code: "Duplicated username", message: "Username is already taken. Please try again."},
    {code: "Invalid email", message: "Your email address is invalid."},
    {code: "Duplicated email", message: "This email already in use. Please enter another email."},
    {code: "Invalid phone number", message: "Your phone number is invalid."},
    {code: "Duplicated phone number", message: "This phone number is already in use. Please enter another phone number."},
    {code: "Invalid password", message: "Kindly ensure that your password consists of at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number."},
    {code: "Mismatch confirm password", message: "Password fields must match."},
    {code: "Unchecked checkbox", message: "Please read and accept our policies to continue."}
  ]

  const navigation = useNavigation()


  function checkboxHandle(){
    setIsChecked(!isChecked)
    if(error.code==="Unchecked checkbox") setError({code:"", message:""})
  }

  function createAccount(){
    if(!/^[A-Za-z0-9.\s]{8,30}$/.test(username)){
      setError(errorList[0])
      return
    }
    if(username === "John Doe"){
      setError(errorList[1])
      return
    }
    if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      setError(errorList[2])
      return
    }
    if(email === "john.doe@gmail.com"){
      setError(errorList[3])
      return
    }
    if(!/^\d{9,11}$/.test(phoneNumber)){
      setError(errorList[4])
      return
    }
    if(phoneCode.dialCode + phoneNumber === "+841234567890"){
      setError(errorList[5])
      return
    }
    if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password)){
      setError(errorList[6])
      return
    }
    if(password !== confirmPassword){
      setError(errorList[7])
      return
    }
    if(!isChecked){
      setError(errorList[8])
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
                <TextField status={(["Invalid username", "Duplicated username"].includes(error.code))?"error":null} inputWrapperStyle={$inputField} placeholder="Username" value={username} onChangeText={(text)=>setUsername(text)}/>
                <Text style={(["Invalid username", "Duplicated username"].includes(error.code))?$errorText:$hideDisplay} text={error.message}/>
                <TextField status={(["Invalid email", "Duplicated email"].includes(error.code))?"error":null} inputWrapperStyle={$inputField} placeholder="Email" value={email} onChangeText={(text)=>setEmail(text)}/>
                <Text style={(["Invalid email", "Duplicated email"].includes(error.code))?$errorText:$hideDisplay} text={error.message}/>
                <TextField status={(["Invalid phone number", "Duplicated phone number"].includes(error.code))?"error":null} inputWrapperStyle={$inputField} placeholder="Phone number" value={phoneNumber} LeftAccessory={()=><PhoneCodePicker style={$phoneCodePicker} selected={phoneCode} setSelected={setPhoneCode}/>} onChangeText={(text)=>setPhoneNumber(text)}/>
                <Text style={(["Invalid phone number", "Duplicated phone number"].includes(error.code))?$errorText:$hideDisplay} text={error.message}/>
                <TextField status={error.code==="Invalid password"?"error":null} inputWrapperStyle={$inputField} placeholder="Password" secureTextEntry={isHiddenPassword} value={password} onChangeText={(text)=>setPassword(text)} RightAccessory={()=><Icon style={[$viewIcon, error.code==="Invalid password"?{tintColor:'red'}:null]} icon={isHiddenPassword?"view":"hidden"} onPress={()=>setIsHiddenPassword(!isHiddenPassword)}/>} />
                <Text style={error.code==="Invalid password"?$errorText:$hideDisplay} text={error.message}/>
                <TextField status={error.code==="Mismatch confirm password"?"error":null} inputWrapperStyle={$inputField} placeholder="Confirm Password" secureTextEntry={isHiddenConfirmPassword} value={confirmPassword} onChangeText={(text)=>setConfirmPassword(text)}  RightAccessory={()=><Icon style={[$viewIcon, error.code==="Mismatch confirm password"?{tintColor:'red'}:null]} icon={isHiddenConfirmPassword?"view":"hidden"} onPress={()=>setIsHiddenConfirmPassword(!isHiddenConfirmPassword)}/>} />
                <Text style={error.code==="Mismatch confirm password"?$errorText:$hideDisplay} text={error.message}/>
              </View>
              <View style={$checkboxContainer}>
                <CheckBox style={$checkbox} color={error.code==="Unchecked checkbox"?'red':isChecked?'blue':'black'} value={isChecked} onValueChange={checkboxHandle}/>
                <Text style={$checkboxText}>Accept <Text style={[$checkboxText, $link]}>Privacy Policy</Text> and <Text style={[$checkboxText, $link]}>Terms and Conditions.</Text></Text>
              </View>
              <Toast containerStyle={$toast} textStyle={$toastText} visible={error.code==="Unchecked checkbox"} position={Dimensions.get('window').height * 0.065}>
                {error.message}
              </Toast>
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

const $toast: ViewStyle = {
  width: width*0.8,
  backgroundColor: '#F20000',
  borderRadius: 0
}

const $toastText: TextStyle = {
  fontSize: 16 / fontScale
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