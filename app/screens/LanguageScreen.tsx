/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Dimensions, StatusBar, TextStyle, ImageStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Line, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import Checkbox from "expo-checkbox"
import { TxKeyPath, translate } from "app/i18n"
// import { useStores } from "app/models"

interface LanguageScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Language">> {}

export const LanguageScreen: FC<LanguageScreenProps> = observer(function LanguageScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const navigation = useNavigation()
  const language: TxKeyPath[] = [
    "mainpageNavigator.profile.language.languageValue.english",
    "mainpageNavigator.profile.language.languageValue.french"
  ]
  const unit: TxKeyPath[] = [
    "mainpageNavigator.profile.language.unitValue.metric",
    "mainpageNavigator.profile.language.unitValue.imperial"
  ]

  function submitHandler(values){
    console.log(values.language!==-1?translate(language[values.language]):"")
    console.log(values.unit!==-1?translate(unit[values.unit]):"")
  }

  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("MainPage", {screen: "Profile"})}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.language"}/>
      </View>

      {/* Main content */}
      <View style={$bodyContainer}>
        <Formik
          initialValues={{language: 0, unit: 0}}
          onSubmit={(values)=>submitHandler(values)}
        >
          {({handleSubmit, setFieldValue, values})=>(
            <>
              <Text style={$subHeaderText} tx={"mainpageNavigator.profile.language.languageSetting"}/>
              <View style={$checkboxFieldContainer}>
                {
                  language.map((value, index)=>(
                    <View key={(index+1)*0.1} style={$checkboxContainer}>
                      <Checkbox
                        style={$checkbox}
                        color='#081D24'
                        value={values.language===index}
                        onValueChange={(status)=>status?setFieldValue('language', index):null}
                      />
                      <Text style={$checkboxText} tx={value}/>
                    </View>
                  ))
                }
              </View>
              <Line style={$line}/>
              <Text style={$subHeaderText} tx={"mainpageNavigator.profile.language.unit"}/>
              <View style={$checkboxFieldContainer}>
                {
                  unit.map((value, index)=>(
                    <View key={(index+1)*6} style={$checkboxContainer}>
                      <Checkbox 
                        style={$checkbox}
                        color='#081D24'
                        value={values.unit===index}
                        onValueChange={(status)=>status?setFieldValue('unit', index):null}
                      />
                      <Text style={$checkboxText} tx={value}/>
                    </View>
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
      </View>
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

const $checkboxFieldContainer: ViewStyle = {
  marginTop: 25,
  gap: 16
}

const $checkboxContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center'
}

const $checkbox: ViewStyle = {
  width: 35,
  height: 35
}

const $checkboxText: TextStyle = {
  fontSize: 17 / fontScale,
  marginLeft: 16
}

const $line: ViewStyle = {
  width: width*0.92,
  alignSelf: 'center',
  backgroundColor: '#E5E8E9',
  borderColor: '#E5E8E9',
  marginTop: 23
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