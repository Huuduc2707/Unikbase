/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ImageStyle, TextStyle, KeyboardAvoidingView, ScrollView, StatusBar, Dimensions, Platform } from "react-native"
import CheckBox from "expo-checkbox"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button, PhoneCodePicker, TextAndLink, PasswordInput } from "app/components"
import Toast from "react-native-root-toast"
import { useNavigation } from "@react-navigation/native"
import { TxKeyPath } from "app/i18n"
import countryCode from "../../assets/country-codes"
import {Formik} from "formik"
// import { useStores } from "app/models"

interface Error{
  code: string
  message: TxKeyPath
}

interface RegisterScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Register">> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen() {
  const [phoneCode, setPhoneCode] = useState({flag: getFlag("+84"), dialCode:"+84"})
  const [error, setError] = useState<Error>({code:"", message:null})
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const errorList: Error[] = [
    {code: "Invalid username", message: "common.error.invalidUsername"},
    {code: "Duplicated username", message: "common.error.duplicatedUsername"},
    {code: "Invalid email", message: "common.error.invalidEmail"},
    {code: "Duplicated email", message: "common.error.duplicatedEmail"},
    {code: "Invalid phone number", message: "common.error.invalidPhoneNumber"},
    {code: "Duplicated phone number", message: "common.error.duplicatedPhoneNumber"},
    {code: "Invalid password", message: "common.error.invalidPassword"},
    {code: "Mismatch confirm password", message: "common.error.mismatchConfirmPassword"},
    {code: "Unchecked checkbox", message: "common.error.uncheckedCheckbox"}
  ]

  const navigation = useNavigation()

  function getFlag(dialCode: string){
    for(const country of countryCode){
      if(country.dialCode === dialCode) return country.flag
    }
  }

  function createAccount(values){
    if(!/^[A-Za-z0-9.\s]{8,30}$/.test(values.username)){
      setError(errorList[0])
      return
    }
    if(values.username === "John Doe"){
      setError(errorList[1])
      return
    }
    if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
      setError(errorList[2])
      return
    }
    if(values.email === "john.doe@gmail.com"){
      setError(errorList[3])
      return
    }
    if(!/^\d{9,11}$/.test(values.phoneNumber)){
      setError(errorList[4])
      return
    }
    if(phoneCode.dialCode + values.phoneNumber === "+841234567890"){
      setError(errorList[5])
      return
    }
    if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(values.password)){
      setError(errorList[6])
      return
    }
    if(values.password !== values.confirmPassword){
      setError(errorList[7])
      return
    }
    if(!values.isChecked){
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
            <Formik
              initialValues={{username: '', email: '', phoneNumber: '', password: '', confirmPassword: '', isChecked: false}}
              onSubmit={(values)=>createAccount(values)}
            >
              {
                ({handleChange, handleSubmit, setFieldValue, values}) => (
                  <View style={$form}>
                    <Text style={$formName} tx={"common.formName.createAccount"}/>
                    <View style={$inputFieldContainer}>
                      <TextField 
                        status={(["Invalid username", "Duplicated username"].includes(error.code))?"error":null} 
                        inputWrapperStyle={$inputField} 
                        placeholderTx={"common.inputPlaceholder.username"}
                        helperTx={(["Invalid username", "Duplicated username"].includes(error.code))? error.message: null}
                        HelperTextProps={{style: $errorText}}
                        value={values.username} 
                        onChangeText={handleChange('username')} 
                      />

                      <TextField 
                        status={(["Invalid email", "Duplicated email"].includes(error.code))?"error":null} 
                        inputWrapperStyle={$inputField} 
                        placeholderTx={"common.inputPlaceholder.email"}
                        helperTx={(["Invalid email", "Duplicated email"].includes(error.code))?error.message:null}
                        HelperTextProps={{style: $errorText}}
                        value={values.email} 
                        onChangeText={handleChange('email')}
                      />

                      <TextField 
                        status={(["Invalid phone number", "Duplicated phone number"].includes(error.code))?"error":null} 
                        inputWrapperStyle={$inputField} 
                        placeholderTx={"common.inputPlaceholder.phoneNumber"}
                        helperTx={(["Invalid phone number", "Duplicated phone number"].includes(error.code))?error.message:null}
                        HelperTextProps={{style: $errorText}}
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')} 
                        LeftAccessory={()=>
                          <PhoneCodePicker 
                            style={$phoneCodePicker} 
                            selected={phoneCode} 
                            setSelected={setPhoneCode}
                          />
                        } 
                      />

                      <PasswordInput 
                        status={error.code==="Invalid password"?"error":null}
                        style={$inputField} 
                        placeholderTx={"common.inputPlaceholder.password"}
                        helperTx={(error.code==="Invalid password")?error.message:null}
                        helperTextProps={{style: $errorText}}
                        value={values.password} 
                        onChangeText={handleChange('password')}
                      />

                      <PasswordInput 
                        status={error.code==="Mismatch confirm password"?"error":null} 
                        style={$inputField} 
                        placeholderTx={"common.inputPlaceholder.confirmPassword"}
                        helperTx={(error.code==="Mismatch confirm password")?error.message:null}
                        helperTextProps={{style: $errorText}}
                        value={values.confirmPassword} 
                        onChangeText={handleChange('confirmPassword')}
                      />
                    </View>
                    <View style={$checkboxContainer}>
                      <CheckBox 
                        style={$checkbox} 
                        color={error.code==="Unchecked checkbox"?'red':values.isChecked?'blue':'black'} 
                        value={values.isChecked} 
                        onValueChange={(state)=>{
                            setFieldValue('isChecked', state);
                            if(error.code==="Unchecked checkbox") setError({code:"", message:null})
                          }
                        }
                      />
                      <TextAndLink tx={"registerScreen.accept"} txLink={"common.textAndLink.privacyPolicies"} />
                      <TextAndLink tx={"registerScreen.and"} txLink={"common.textAndLink.termAndCondition"} />
                    </View> 
                    <Toast containerStyle={$toast} visible={error.code==="Unchecked checkbox"} position={Dimensions.get('window').height * 0.065}>
                      <Text tx={"common.error.uncheckedCheckbox"} style={$toastText}/>
                    </Toast>
                    <Button style={$createAccountButton} tx={"common.button.createAccount"} textStyle={$createAccountText} pressedStyle={$buttonPressed} onPress={()=>handleSubmit()}/>
                  </View>
                )
              }
            </Formik>
            <View style={$footerContainer}>
              <Text style={$footerText} tx={"common.textAndLink.hasAccountQuestion"}/>
              <TextAndLink linkStyle={$footerText} txLink={"common.textAndLink.signIn"} noTrailingSpace={true} onLinkPress={()=>navigation.navigate("Login")} />
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
  marginTop: StatusBar.currentHeight,
  alignItems: 'center',
  flexDirection: 'column'
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
  flex: 1,
  backgroundColor: 'white',
  marginTop: height*0.065,
  width: width*1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: height*0.025,
  paddingBottom: height*0.06
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
  marginTop: -10,
}

const $formName: TextStyle = {
  fontSize: 19 / fontScale,
  marginBottom: height*0.025
}

const $inputFieldContainer: ViewStyle = {
  gap: 10
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

const $checkboxContainer: ViewStyle = {
  width: width*0.85,
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: height*0.01
}

const $checkbox: ViewStyle = {
  width: width*0.06,
  height: width*0.06,
  maxWidth: 30,
  maxHeight: 30,
  borderWidth: 1,
  marginRight: 5
}

const $toast: ViewStyle = {
  width: width*0.8,
  backgroundColor: '#F20000',
  borderRadius: 0
}

const $toastText: TextStyle = {
  fontSize: 16 / fontScale,
  color: 'white'
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
  width: width*0.85,
  lineHeight: 15
}