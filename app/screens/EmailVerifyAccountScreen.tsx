import React, { FC, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, KeyboardAvoidingView, View, TextStyle, ImageStyle, Platform, StatusBar, Dimensions } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button, TextField } from "app/components"
import Toast from "react-native-root-toast"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface EmailVerifyAccountScreenProps extends NativeStackScreenProps<AppStackScreenProps<"EmailVerifyAccount">> {}

export const EmailVerifyAccountScreen: FC<EmailVerifyAccountScreenProps> = observer(function EmailVerifyAccountScreen() {
  const [codeInput, setCodeInput] = useState([])
  const [isVisible, setIsVisible] = useState("hidden")
  const inputRef = useRef([null, null, null, null, null, null])
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  function handleInputChange(text: string, refIndex: number){
    if(text.length > 1) return
    if(text.length === 1 && /^\d$/.test(text)){
      setCodeInput([...codeInput.slice(0, refIndex), text, ...codeInput.slice(refIndex + 1)])
      if(refIndex < inputRef.current.length - 1) inputRef.current[refIndex + 1].focus()
      return
    }
    if(text.length === 0 ||  !/^\d$/.test(text)){
      setCodeInput([...codeInput.slice(0, refIndex), "", ...codeInput.slice(refIndex + 1)])
    }
  }

  function verifyCode(){
    if(codeInput.join("") === "123456"){
      setIsVisible("success")
      setTimeout(()=>{
        setIsVisible("hidden")
        navigation.navigate("PhoneVerifyAccount")
      }, 1000)
    }
    else{
      setIsVisible("error")
      setTimeout(()=>{
        setIsVisible("hidden")
      }, 1500)
    }
    
  }

  return (
    <Screen style={$root} preset="fixed">
      <KeyboardAvoidingView behavior={Platform.OS==="android"?"padding":null}>
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
              <Icon style={$arrowIcon} icon="trc"/>
            </View>
            <View style={$form}>
              <Text style={$formName} text="Check your email for a code"/> 
              <Text style={$informText}>We have sent a 6-character code to <Text style={[$informText, $email]}>john.doe@gmail.com</Text>. The code expires shortly, so please enter it soon.</Text>
              <View style={$inputFieldContainer}>
                <View style={$inputFieldSection}>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[0]} keyboardType={"number-pad"} ref={(ref)=>{inputRef.current[0]=ref}} onChangeText={(text)=>handleInputChange(text, 0)}/>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[1]} keyboardType={"number-pad"} ref={(ref)=>{inputRef.current[1]=ref}} onChangeText={(text)=>handleInputChange(text, 1)}/>
                  <TextField inputWrapperStyle={[$inputField, $lastInput]} style={$inputText} value={codeInput[2]} keyboardType={"number-pad"} ref={(ref)=>{inputRef.current[2]=ref}} onChangeText={(text)=>handleInputChange(text, 2)}/>
                </View>
                <Text text="-"/>
                <View style={$inputFieldSection}>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[3]} keyboardType={"number-pad"} ref={(ref)=>{inputRef.current[3]=ref}} onChangeText={(text)=>handleInputChange(text, 3)}/>
                  <TextField inputWrapperStyle={$inputField} style={$inputText} value={codeInput[4]} keyboardType={"number-pad"} ref={(ref)=>{inputRef.current[4]=ref}} onChangeText={(text)=>handleInputChange(text, 4)}/>
                  <TextField inputWrapperStyle={[$inputField, $lastInput]} style={$inputText} value={codeInput[5]} keyboardType={"number-pad"} ref={(ref)=>{inputRef.current[5]=ref}} onChangeText={(text)=>handleInputChange(text, 5)}/>
                </View>
              </View>
              <Text style={$footerText} text="Can't find your code? Check your spam folder!"/>
              <Button style={$verifyButton} text="VERIFY" textStyle={$verifyText} pressedStyle={$buttonPressed} onPress={verifyCode}/>
              <Toast visible={isVisible!=="hidden"} position={Dimensions.get('window').height*0.085} containerStyle={[$toast, isVisible==="success"?$toastBackgroundSuccess:$toastBackgroundError]}>
                <View style={$textContainer}>
                  <View style={[$toastIconContainer, isVisible==='success'?$toastIconBorderSuccess:$toastIconBorderError]}>
                    <Icon style={[$toastIcon, isVisible==="success"?$toastIconSuccess:$toastIconError]} icon={isVisible==='success'?"check":"x"}/>
                  </View>
                  <Text style={$toastText} text={isVisible==='success'?"Verify email success!":"Verify email failed!"}/>
                </View>
              </Toast>
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
  marginTop: -10,
  alignItems: 'center'
}

const $formName: TextStyle = {
  fontSize: 19 / fontScale,
  marginBottom: height*0.025
}

const $informText: TextStyle = {
  fontSize: 14 / fontScale,
  textAlign: 'center',
  width: width*0.75,
  lineHeight: 18
}

const $email: TextStyle = {
  fontWeight: 'bold'
}

const $inputFieldContainer: ViewStyle = {
  gap: height*0.013,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginTop: height*0.03,
  width: width*0.85
}

const $inputFieldSection: ViewStyle = {
  flexDirection: 'row'
}

const $inputField: ViewStyle = {
  width: width*0.85/7,
  height: height*0.12,
  backgroundColor: 'white',
  borderRightWidth: 0
}

const $lastInput: ViewStyle = {
  borderRightWidth: 1
}

const $inputText: TextStyle = {
  fontSize: 35 / fontScale,
  textAlign: 'center',
  textAlignVertical: 'center',
  alignSelf: 'center',
  height: '100%'
}

const $footerText: TextStyle = {
  fontSize: 15 / fontScale,
  marginTop: height*0.04,
  width: width*0.85,
  textAlign: 'center'
}

const $verifyButton: ViewStyle = {
  width: width*0.85,
  backgroundColor: "#F14300",
  marginTop: height*0.04,
  marginBottom: height*0.025
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
  height: height*0.05,
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
  width: 15 / fontScale,
  height: 15 / fontScale
}

const $toastIconSuccess: ImageStyle = {
  tintColor: '#73BF44'
}

const $toastIconError: ImageStyle = {
  tintColor: '#F20000'
}

const $toastIconContainer: ViewStyle = {
  width: 25 / fontScale,
  height: 25 / fontScale,
  borderRadius: 30 / fontScale,
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
  fontSize: 15 / fontScale,
  fontWeight: 'bold'
}

const $textContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 15
}