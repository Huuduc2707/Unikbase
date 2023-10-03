/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, StatusBar, Dimensions, TextStyle, ImageStyle, KeyboardAvoidingView, ScrollView, Platform } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, PasswordInput, Line, Button } from "app/components"
import { Formik } from "formik"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ChangePasswordScreenProps extends NativeStackScreenProps<AppStackScreenProps<"ChangePassword">> {}

export const ChangePasswordScreen: FC<ChangePasswordScreenProps> = observer(function ChangePasswordScreen() {
  const [error, setError] = useState("")
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()

  function submitHandler(values){
    if(values.password !== "Johndoe@123"){
      setError("Incorrect password")
      return
    }
    if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(values.newPassword)){
      setError("Invalid new password")
      return
    }
    if(values.newPassword!==values.confirmNewPassword){
      setError("Passwords mismatch")
      return
    }
    navigation.navigate("MainPage", {screen: "Profile"})
  }

  return (
    <Screen style={$root} preset="fixed">
      <KeyboardAvoidingView behavior={Platform.OS==="android"?"padding":null} keyboardVerticalOffset={Platform.OS==="android"?25:0}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* Header title */}
          <View style={$headerContainer}>
            <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("MainPage", {screen: "Profile"})}>
              <Icon style={$headerIcon} icon="caretLeft2" />
            </TouchableOpacity>
            <Text style={$title} tx={"mainpageNavigator.tabName.changePassword"}/>
          </View>

          {/* Main content */}
          <View style={$bodyContainer}>
            <Text style={$subHeaderText} tx={"mainpageNavigator.profile.changePassword.changePassword"}/>
            <Formik
              initialValues={{password: "", newPassword: "", confirmNewPassword: ""}}
              onSubmit={(values)=>submitHandler(values)}
            >
              {({handleSubmit, handleChange, values})=>(
                <>
                  <View style={$passwordFieldContainer}>
                    <PasswordInput
                      status={error==="Incorrect password"?"error":null}
                      labelTx={"common.formLabel.password"} 
                      labelTextProps={{style: $labelText}}
                      helperTx={"common.error.incorrectPassword"}
                      helperTextProps={{style: [$errorText, {display: error==="Incorrect password"?'flex':'none'}]}}
                      value={values.password} 
                      onChangeText={handleChange('password')}
                    />
                  </View>
                  <Line style={$line}/>
                  <Text style={$informText} tx={"mainpageNavigator.profile.changePassword.informText"}/>
                  <View style={$newPasswordFieldContainer}>
                    <PasswordInput
                      status={error==="Invalid new password"?"error":null}
                      labelTx={"common.formLabel.newPassword"} 
                      labelTextProps={{style: $labelText}}
                      helperTx={"common.error.invalidNewPassword"}
                      helperTextProps={{style: [$errorText, {display: error==="Invalid new password"?'flex':'none'}]}}
                      value={values.newPassword} 
                      onChangeText={handleChange('newPassword')}
                    />
                    <PasswordInput
                      status={error==="Passwords mismatch"?"error":null}
                      labelTx={"common.formLabel.confirmNewPassword"} 
                      labelTextProps={{style: $labelText}}
                      helperTx={"common.error.mismatchConfirmPassword"}
                      helperTextProps={{style: [$errorText, {display: error==="Passwords mismatch"?'flex':'none'}]}}
                      value={values.confirmNewPassword} 
                      onChangeText={handleChange('confirmNewPassword')}
                    />
                  </View>
                  <Button 
                    style={$changePasswordButton} 
                    tx={"common.button.changePassword"} 
                    textStyle={$buttonText} 
                    pressedStyle={$buttonPressed}
                    onPress={()=>handleSubmit()}
                  />
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
})



// Styling zone

const {width, height, fontScale} = Dimensions.get('screen')

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: '#041C25',
  alignItems: 'center',
  marginTop: StatusBar.currentHeight
}

const $headerContainer: ViewStyle = {
  justifyContent: 'center',
  width: width,
  marginTop: height*0.06
}

const $title: TextStyle = {
  color: 'white',
  fontSize: 25 / fontScale,
  lineHeight: 30,
  textAlign: 'center',
  textAlignVertical: 'center'
}

const $headerIconContainer: ViewStyle = {
  position: 'absolute',
  left: width*0.04,
  zIndex: 2
}

const $headerIcon: ImageStyle = {
  width: 18 / fontScale,
  height: 18 / fontScale
}

const $bodyContainer: ViewStyle = {
  flex: 1,
  backgroundColor: 'white',
  marginTop: 22,
  paddingHorizontal: width*0.04,
  paddingBottom: 20
}

const $subHeaderText: TextStyle = {
  marginTop: 21,
  fontSize: 20 / fontScale,
  fontWeight: 'bold'
}

const $passwordFieldContainer: ViewStyle = {
  marginTop: 21
}

const $labelText: TextStyle = {
  color: '#838D92',
  fontSize: 14 / fontScale
}

const $errorText: TextStyle = {
  fontSize: 14 / fontScale,
  marginTop: 5
}

const $line: ViewStyle = {
  width: width*0.92,
  marginTop: 27,
  backgroundColor: '#E5E8E9',
  borderColor: '#E5E8E9'
}

const $informText: TextStyle = {
  fontSize: 14 / fontScale,
  marginTop: 21
}

const $newPasswordFieldContainer: ViewStyle = {
  marginTop: 16,
  gap: 8
}

const $changePasswordButton: ViewStyle = {
  width: 190,
  backgroundColor: "#F14300",
  marginTop: 35,
  marginBottom: height*0.015,
  alignSelf: 'flex-end'
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center',
  lineHeight: 18
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}