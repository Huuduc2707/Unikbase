import React, { FC, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, KeyboardAvoidingView, View, TextStyle, ImageStyle, Platform, StatusBar, Dimensions, TouchableOpacity, TextInput } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button, I18NStyle } from "app/components"
import Toast from "react-native-root-toast"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PhoneVerifyAccountScreenProps extends NativeStackScreenProps<AppStackScreenProps<"PhoneVerifyAccount">> {}

export const PhoneVerifyAccountScreen: FC<PhoneVerifyAccountScreenProps> = observer(function PhoneVerifyAccountScreen(this: any) {
  const [codeInput, setCodeInput] = useState('')
  const [isVisible, setIsVisible] = useState("hidden")
  const inputRef = useRef(null)
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  function handleInputChange(text: string){
    if(/^[0-9]*$/.test(text)) setCodeInput(text)
  }

  function verifyCode(){
    if(codeInput === "123456"){
      setIsVisible("success")
      setTimeout(()=>{
        setIsVisible("hidden")
        navigation.navigate("CompleteVerifyAccount")
      }, 1000)
    }
    else{
      setIsVisible("error")
      setTimeout(()=>{
        setIsVisible("hidden")
      }, 1000)
    }
  }

  function focusInput(){
    inputRef.current?.focus()
  }

  function changePhoneNumber(phoneNumber: string){
    return phoneNumber.slice(0,2) + '*'.repeat(phoneNumber.length - 4) + phoneNumber.slice(phoneNumber.length - 2)
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
              <Text style={$formName} tx={"common.formName.phoneNumberVerification"}/> 
              <I18NStyle style={$informText} tx={"common.textAndLink.informPhoneNumberCodeText"} txOptions={{phoneNumber: changePhoneNumber("+33821375400")}} txPlaceholderStyle={{phoneNumber: $phoneNumber}}/>
              <View style={$inputFieldContainer}>
                <View style={$inputFieldSection}>
                  {
                    Array(3).fill(0).map((e, index)=>{
                      const digit = codeInput[index] || ''
                      if(index !== 2) return (
                        <TouchableOpacity style={$inputField} activeOpacity={1} onPress={focusInput}>
                          <Text style={$inputText}>{digit}</Text>
                        </TouchableOpacity>
                      )
                      else return (
                        <TouchableOpacity style={[$inputField, $lastInput]} activeOpacity={1} onPress={focusInput}>
                          <Text style={$inputText}>{digit}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
                <Text text="-"/>
                <View style={$inputFieldSection}>
                  {
                    Array(3).fill(0).map((e, index)=>{
                      const digit = codeInput[index+3] || '';
                      if(index !== 2) return (
                        <TouchableOpacity style={$inputField} activeOpacity={1} onPress={focusInput}>
                          <Text style={$inputText}>{digit}</Text>
                        </TouchableOpacity>
                      )
                      else return (
                        <TouchableOpacity style={[$inputField, $lastInput]} activeOpacity={1} onPress={focusInput}>
                          <Text style={$inputText}>{digit}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
                <TextInput
                  ref={inputRef}
                  value={codeInput}
                  maxLength={6}
                  onChangeText={(text)=>handleInputChange(text)}
                  style={$textInputField}
                  keyboardType="number-pad"
                />
              </View>
              <Text style={$footerText} tx={"common.textAndLink.checkSpamFolder"}/>
              <Button style={$verifyButton} tx={"common.button.verify"} textStyle={$verifyText} pressedStyle={$buttonPressed} onPress={verifyCode}/>
              <Toast visible={isVisible!=="hidden"?true:null} position={Dimensions.get('window').height*0.085} containerStyle={[$toast, isVisible==="success"?$toastBackgroundSuccess:$toastBackgroundError]}>
                <View style={$textContainer}>
                  <View style={[$toastIconContainer, isVisible==='success'?$toastIconBorderSuccess:$toastIconBorderError]}>
                    <Icon style={[$toastIcon, isVisible==="success"?$toastIconSuccess:$toastIconError]} icon={isVisible==='success'?"check":"x"}/>
                  </View>
                  <Text style={$toastText} tx={isVisible==='success'?"common.success.verifyPhoneNumberSuccess":"common.error.verifyPhoneNumberFailed"}/>
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
  width: width*1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: height*0.025,
  paddingBottom: height*0.16
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
  width: width*0.65,
  lineHeight: 18
}

const $phoneNumber: TextStyle = {
  fontWeight: 'bold'
}

const $inputFieldContainer: ViewStyle = {
  gap: 15,
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
  width: 50,
  height: 80,
  backgroundColor: 'white',
  borderWidth: 1,
  borderRightWidth: 0
}

const $lastInput: ViewStyle = {
  borderRightWidth: 1
}

const $inputText: TextStyle = {
  fontSize: 40 / fontScale,
  textAlign: 'center',
  textAlignVertical: 'center',
  lineHeight: 54,
  height: '100%'
}

const $textInputField: ViewStyle = {
  position:'absolute',
  width: '100%',
  height: 0,
  left: 0,
  top: 0,  
  backgroundColor: 'transparent'
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