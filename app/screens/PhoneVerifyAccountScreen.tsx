import React, { FC, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, KeyboardAvoidingView, View, TextStyle, ImageStyle, Platform } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button, TextField } from "app/components"
import Toast from "react-native-root-toast"
import { useNavigation } from "@react-navigation/native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PhoneVerifyAccountScreenProps extends NativeStackScreenProps<AppStackScreenProps<"PhoneVerifyAccount">> {}

export const PhoneVerifyAccountScreen: FC<PhoneVerifyAccountScreenProps> = observer(function PhoneVerifyAccountScreen() {
  const [codeInput, setCodeInput] = useState([])
  const [isVisible, setIsVisible] = useState("hidden")
  const inputRef = useRef([null, null, null, null, null, null])
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  function handleInputChange(text: string, refIndex: number){
    if(text.length === 1 && /^\d$/.test(text)){
      setCodeInput([...codeInput.slice(0, refIndex), text, ...codeInput.slice(refIndex + 1)])
      if(refIndex < inputRef.current.length - 1) inputRef.current[refIndex + 1].focus()
      return
    }
    if(text.length === 0) setCodeInput([...codeInput.slice(0, refIndex), "", ...codeInput.slice(refIndex + 1)])
  }

  function verifyCode(){
    if(codeInput.join("") === "123456"){
      setIsVisible("success")
      setTimeout(()=>{
        setIsVisible("hidden")
        navigation.navigate("CompleteVerifyAccount")
      }, 10)
    }
    else{
      setIsVisible("error")
      setTimeout(()=>{
        setIsVisible("hidden")
      }, 10)
    }
    
  }

  function changePhoneNumber(phoneNumber: string){
    return phoneNumber.slice(0,2) + '*'.repeat(phoneNumber.length - 4) + phoneNumber.slice(phoneNumber.length - 2)
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

          {/* Verify form */}
          <View style={$formContainer}>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="tlc"/>
              <Icon style={$arrowIcon} icon="blc"/>
            </View>
            <View style={$form}>
              <Text style={$formName} text="Check your mobile for a code"/> 
              <Text style={$informText}>We have sent a 6-character code to <Text style={[$informText, $email]}>{changePhoneNumber("+33821375400")}</Text>. The code expires shortly, so please enter it soon.</Text>
              <View style={$inputFieldContainer}>
                <View style={$inputFieldSection}>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[0]} ref={(ref)=>{inputRef.current[0]=ref}} onChangeText={(text)=>handleInputChange(text, 0)}/>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[1]} ref={(ref)=>{inputRef.current[1]=ref}} onChangeText={(text)=>handleInputChange(text, 1)}/>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[2]} ref={(ref)=>{inputRef.current[2]=ref}} onChangeText={(text)=>handleInputChange(text, 2)}/>
                </View>
                <Text text="-"/>
                <View style={$inputFieldSection}>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[3]} ref={(ref)=>{inputRef.current[3]=ref}} onChangeText={(text)=>handleInputChange(text, 3)}/>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[4]} ref={(ref)=>{inputRef.current[4]=ref}} onChangeText={(text)=>handleInputChange(text, 4)}/>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[5]} ref={(ref)=>{inputRef.current[5]=ref}} onChangeText={(text)=>handleInputChange(text, 5)}/>
                </View>
              </View>
              <Text style={$footerText} text="Can't find your code? Check your spam folder!"/>
              <Button style={$verifyButton} text="VERIFY" textStyle={$verifyText} pressedStyle={$buttonPressed} onPress={verifyCode}/>
              <Toast visible={isVisible!=="hidden"?true:null} position={90} containerStyle={[$toast, isVisible==="success"?$toastBackgroundSuccess:$toastBackgroundError]}>
                <View style={$textContainer}>
                  <View style={[$toastIconContainer, isVisible==='success'?$toastIconBorderSuccess:$toastIconBorderError]}>
                    <Icon style={[$toastIcon, isVisible==="success"?$toastIconSuccess:$toastIconError]} icon={isVisible==='success'?"check":"x"}/>
                  </View>
                  <Text style={$toastText} text={isVisible==='success'?"Verify phone number success!":"Verify phone number failed!"}/>
                </View>
              </Toast>
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
  height: 320,
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
  marginBottom: 10
}

const $informText: TextStyle = {
  fontSize: 14,
  textAlign: 'center',
  width: 280,
  lineHeight: 18
}

const $email: TextStyle = {
  fontWeight: 'bold'
}

const $inputFieldContainer: ViewStyle = {
  gap: 10,
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 20
}

const $inputFieldSection: ViewStyle = {
  flexDirection: 'row'
}

const $inputField: ViewStyle = {
  width: 50,
  height: 70,
  backgroundColor: 'white'
}

const $inputText: TextStyle = {
  fontSize: 35,
  textAlign: 'center',
  textAlignVertical: 'center',
  alignSelf: 'center',
  height: '100%'
}

const $footerText: TextStyle = {
  fontSize: 15,
  marginTop: 20,
  width: 350,
  textAlign: 'center'
}

const $verifyButton: ViewStyle = {
  width: 320,
  height: 40,
  backgroundColor: "#F14300",
  marginTop: 25
}

const $verifyText: TextStyle = {
  color: "white",
  fontWeight: "bold"
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}

const $toast: ViewStyle = {
  width: '95%',
  height: 40,
  borderRadius: 0,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0
}

const $toastBackgroundSuccess: ViewStyle = {
  backgroundColor: '#E8F5E1'
}

const $toastBackgroundError: ViewStyle = {
  backgroundColor: '#F5E1E1'
}

const $toastIcon: ImageStyle = {
  width: 15,
  height: 15
}

const $toastIconSuccess: ImageStyle = {
  tintColor: '#73BF44'
}

const $toastIconError: ImageStyle = {
  tintColor: '#F20000'
}

const $toastIconContainer: ViewStyle = {
  width: 25,
  height: 25,
  borderRadius: 30,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  alignSelf: 'center'
}

const $toastIconBorderSuccess: ViewStyle = {
  borderColor: '#73BF44'
}

const $toastIconBorderError: ViewStyle = {
  borderColor: '#F20000'
}

const $toastText: TextStyle = {
  fontSize: 15,
  fontWeight: 'bold'
}

const $textContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 15
}