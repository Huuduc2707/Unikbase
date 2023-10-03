/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, StatusBar, Dimensions, TextStyle, ImageStyle, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button } from "app/components"
import { Formik } from "formik"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from 'expo-image-picker'
import { TxKeyPath } from "app/i18n"
// import { useStores } from "app/models"

interface DetailedInfo{
  label: TxKeyPath
  value: string
}

interface DetailsScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Details">> {}

export const DetailsScreen: FC<DetailsScreenProps> = observer(function DetailsScreen() {
  const [error, setError] = useState("")
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const profileDetails: DetailedInfo[] = [
    {label: "common.formLabel.firstName", value: "firstName"},
    {label: "common.formLabel.lastName", value: "lastName"},
    {label: "common.formLabel.profileImage", value: "profileImage"}
  ]
  const contactDetails: DetailedInfo[] = [
    {label: "common.formLabel.email", value: "email"},
    {label: "common.formLabel.mobilePhone", value: "mobilePhone"}
  ]

  function submitHandler(values){
    if(!/^\+[0-9]{2,4}\s[0-9]{8,9}$/.test(values.mobilePhone)){
      setError("Invalid phone number")
      return
    }
    setError("")
    console.log(values.firstName)
    console.log(values.lastName)
    console.log(values.profileImage)
  }

  return (
    <Screen style={$root} preset="fixed">
      <KeyboardAvoidingView behavior={Platform.OS==="android"?"padding":null} keyboardVerticalOffset={Platform.OS==="android"?25:0}>
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("MainPage", {screen: "Profile"})}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.detail"}/>
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={$bodyContainer}>
        <Formik
          initialValues={{firstName: "John", lastName: "Doe", profileImage: "", email: "john.doe@gmail.com", mobilePhone: "+00 123456789"}}
          onSubmit={(values)=>submitHandler(values)}
        >
          {({handleSubmit, handleChange, setFieldValue, values})=>(
            <>
              <Text style={$subHeaderText} tx={"mainpageNavigator.profile.detail.profileDetail"}/>
              <View style={$inputFieldContainer}>
                {
                  profileDetails.map((value, index)=>{
                    if(index !== profileDetails.length - 1) return (
                      <TextField
                        key={(index+1)*0.1}
                        labelTx={value.label}
                        LabelTextProps={{style:$label}}
                        value={values[value.value]}
                        onChangeText={handleChange(value.value)}
                      />
                    )
                    else return (
                      <>
                        <Text key={(index+1)*0.1} style={$label} preset="formLabel" tx={value.label}/>
                        <TouchableOpacity 
                          key={(index+1)*0.1+0.1} 
                          activeOpacity={0.7} 
                          onPress={async ()=>{
                            const image = await ImagePicker.launchImageLibraryAsync({
                              mediaTypes: ImagePicker.MediaTypeOptions.Images,
                              allowsEditing: true,
                              quality: 1
                            })
                            if(!image.canceled) setFieldValue('profileImage', image.assets[0].uri)
                          }}
                        >
                          <TextField 
                            status="disabled"
                            placeholderTx={"common.inputPlaceholder.choosePhoto"}
                            placeholderTextColor={'#838D92'}
                            value = {values[value.value]}
                            LeftAccessory={()=>(
                              <Icon style={$imageIcon} icon="image"/>
                            )}
                          />
                        </TouchableOpacity>
                      </>

                    )
                  })
                }
              </View>
              <Text style={[$subHeaderText, {marginTop: 48}]} tx={"mainpageNavigator.profile.detail.contactDetail"}/>
              <View style={$inputFieldContainer}>
                {
                  contactDetails.map((value, index)=>(
                    <TextField
                      status={index===0?"disabled":null} 
                      key={(index+1)*6}
                      inputWrapperStyle={index===0?$disabledInput:null}
                      style={index===0?$disabledTextInput:null}
                      labelTx={value.label}
                      LabelTextProps={{style:$label}}
                      helperTx={(index===1&&error==="Invalid phone number")?"common.error.invalidPhoneNumber":null}
                      HelperTextProps={{style:$errorText}}
                      value={values[value.value]}
                      onChangeText={index===0?null:handleChange(value.value)}
                    />
                  ))
                }
              </View>
              <Button 
                style={$saveButton} 
                tx={"common.button.save"} 
                textStyle={$buttonText} 
                pressedStyle={$buttonPressed} 
                onPress={()=>handleSubmit()}
              />
            </>
          )}
        </Formik>
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
  flexGrow: 1,
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

const $inputFieldContainer: ViewStyle = {
  marginTop: 21,
  gap: 8
}

const $label: TextStyle = {
  color: '#80898E',
  fontSize: 14 / fontScale
}

const $disabledInput: ViewStyle = {
  backgroundColor: '#C1C6C8'
}

const $disabledTextInput: TextStyle = {
  color: 'black'
}

const $saveButton: ViewStyle = {
  width: 167,
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

const $imageIcon: ImageStyle = {
  width: 27,
  height: 27,
  marginTop: 4.5,
  marginLeft: 4
}

const $errorText: TextStyle = {
  fontSize: 14 / fontScale,
  color: 'red',
  marginTop: 4
}