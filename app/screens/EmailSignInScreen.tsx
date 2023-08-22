/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView, View, ImageStyle, TextStyle, KeyboardAvoidingView, Platform, StatusBar, Dimensions } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button, ForgotPasswordModal, TextAndLink, PasswordInput } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
// import { useStores } from "app/models"

interface EmailSignInScreenProps extends NativeStackScreenProps<AppStackScreenProps<"EmailSignIn">> {}

export const EmailSignInScreen: FC<EmailSignInScreenProps> = observer(function EmailSignInScreen() {
  const [error, setError] = useState("")
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false)
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  function signIn(values){
    if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email) || values.email !== "john.doe@gmail.com" || !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(values.password) || values.password !== "Johndoe@123"){
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
          <Text style={$headerText} tx={"common.textAndLink.welcomeText"} />

          {/* Sign in form */}
          <View style={$formContainer}>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="tlc"/>
              <Icon style={$arrowIcon} icon="trc"/>
            </View>
            <Formik
              initialValues={{email: "", password: ""}}
              onSubmit={(values)=>signIn(values)}
            >
              {
                ({handleSubmit, handleChange, values})=> (
                  <View style={$form}>
                    <Text style={$formName} tx={"common.formName.signIn"}/>
                    <View style={$inputFieldContainer}>
                      <TextField 
                        status={(error==="IncorrectInfo")?"error":null} 
                        inputWrapperStyle={$inputField} 
                        value={values.email}
                        labelTx={"common.formLabel.email"}
                        LabelTextProps={{style: $inputlabel}}
                        helperTx={(error==="IncorrectInfo")?"common.error.incorrectEmailOrPassword":null}
                        HelperTextProps={{style: $errorText}}
                        onChangeText={handleChange("email")}
                      />

                      <PasswordInput 
                        status={(error==="IncorrectInfo")?"error":null} 
                        style={$inputField} 
                        value={values.password} 
                        labelTx={"common.formLabel.password"}
                        labelTextProps={{style: $inputlabel}}
                        helperTx={(error==="IncorrectInfo")?"common.error.incorrectEmailOrPassword":null}
                        helperTextProps={{style: $errorText}}
                        onChangeText={handleChange("password")}
                      />
                    </View>
                    <TextAndLink 
                      txLink={"common.textAndLink.forgotPassword"} 
                      linkStyle={$forgotPasswordText} 
                      noTrailingSpace={true} 
                      onLinkPress={()=>setIsForgotPasswordVisible(true)}
                    />
                    <Button 
                      style={$signInButton} 
                      tx={"common.button.continue"} 
                      textStyle={$signInText} 
                      pressedStyle={$buttonPressed} 
                      onPress={()=>handleSubmit()}
                    />
                  </View>
                )
              }
            </Formik>
            <View style={$footerContainer}>
              <Text style={$footerText} tx={"common.textAndLink.createAccountQuestion"}/>
              <TextAndLink 
                txLink={"common.textAndLink.createAccount"}
                linkStyle={$footerText}
                noTrailingSpace={true}
                onLinkPress={()=>navigation.navigate("Register")}
              />
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

const $headerText: TextStyle = {
  color: "white",
  fontSize: 22 / fontScale,
  lineHeight: 50,
  textAlign: 'center',
  marginTop: 30
}

// Form section
const $formContainer: ViewStyle = {
  flex: 1,
  backgroundColor: 'white',
  marginTop: height*0.04,
  width: width*1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: height*0.025,
  paddingBottom: height*0.077
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
  fontSize: 15 / fontScale
}

const $inputFieldContainer: ViewStyle = {
  gap: 10
}

const $inputField: ViewStyle = {
  width: width*0.85,
  height: height*0.05,
  backgroundColor: 'white',
}

const $forgotPasswordText: TextStyle = {
  fontSize: 13 / fontScale,
  marginTop: height*0.01
}

const $signInButton: ViewStyle = {
  width: width*0.85,
  backgroundColor: "#F14300",
  marginTop: height*0.01
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
  width: width*0.85,
  lineHeight: 14
}