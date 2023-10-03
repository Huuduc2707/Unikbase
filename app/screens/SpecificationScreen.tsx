/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, ImageStyle, TextStyle, Dimensions, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Line, Button, MonetaryUnitPicker } from "app/components"
import { Formik } from "formik"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { TxKeyPath } from "app/i18n"
// import { useStores } from "app/models"

interface InputField{
  label: TxKeyPath
  value: string|number
  unit?: number
}

interface SpecificationScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Specification">> {}

export const SpecificationScreen: FC<SpecificationScreenProps> = observer(function SpecificationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation()
  const {bottom} = useSafeAreaInsets()

  const details:InputField[] = [
    {label: "common.formLabel.id", value: "TPK_1234567"},
    {label: "common.formLabel.tagRef", value: "0123456abcd"},
    {label: "common.formLabel.operator", value: "The Packengers"},
    {label: "common.formLabel.creationDate", value: "2023-04-03T12:12:12"},
    {label: "common.formLabel.price", value: 1000, unit: 0},
  ]

  function submitHandler(values){
    console.log(values.length)
    console.log(values.weight)
    console.log(values.priceUnit)
  }

  return (
    <Screen style={$root} preset="fixed">
      <KeyboardAvoidingView behavior={Platform.OS==="android"?"padding":null} keyboardVerticalOffset={Platform.OS==="android"?6:0}>
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("DigitalTwin")}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.specification"}/>
      </View>

      {/* Body */}
      
        <ScrollView contentContainerStyle={$bodyContentContainer} style={[$bodyContainer, {marginBottom: bottom}]}>
          <Formik
            initialValues={{price: details[4].value, priceUnit: details[4].unit, length: 100, depth: 60, width: 60, weight: 2.6}}
            onSubmit={(values)=>submitHandler(values)}
          >
            {({handleSubmit, handleChange, values})=>(
              <>
                <Text style={$subHeaderText} tx={"mainpageNavigator.tabName.detail"}/>
                <View style={{gap: 9}}>
                  {
                    details.map((value, index)=>(
                      <TextField 
                        key={index}
                        inputWrapperStyle={index===details.length-1?{alignItems: 'center'}:{backgroundColor: '#E5E8E9'}}
                        status={index===details.length-1?null:"disabled"}
                        labelTx={value.label}
                        LabelTextProps={{style: $formLabel}}
                        value={index===details.length-1?values.price.toString():index===details.length-2?new Date(value.value).toLocaleDateString('en-GB').replace(/\//g,'-'):value.value.toString()}
                        onChangeText={index===details.length-1?handleChange('price'):null}
                        LeftAccessory={index===details.length-1?(()=>(
                          <MonetaryUnitPicker style={$monetaryUnitPicker}/>
                        )):null}
                      />
                    ))
                  }
                </View>
                <Line style={$line}/>
                <Text style={$subHeaderText} tx={"common.formLabel.size"}/>
                <View style={$sizeInputFieldContainer}>
                  <TextField
                    inputWrapperStyle={$sizeInputField}
                    labelTx={"common.formLabel.length"}
                    LabelTextProps={{style: $formLabel}}
                    value={`${values.length.toString()}`}
                    onChangeText={handleChange('length')}
                    RightAccessory={()=>(
                      <Text style={$unitText} text="cm"/>
                    )}
                  />
                  <TextField
                    inputWrapperStyle={$sizeInputField}
                    labelTx={"common.formLabel.depth"}
                    LabelTextProps={{style: $formLabel}}
                    value={values.depth.toString()}
                    onChangeText={handleChange('depth')}
                    RightAccessory={()=>(
                      <Text style={$unitText} text="cm"/>
                    )}
                  />
                  <TextField
                    inputWrapperStyle={$sizeInputField}
                    labelTx={"common.formLabel.width"}
                    LabelTextProps={{style: $formLabel}}
                    value={values.width.toString()}
                    onChangeText={handleChange('width')}
                    RightAccessory={()=>(
                      <Text style={$unitText} text="cm"/>
                    )}
                  />
                  <TextField
                    inputWrapperStyle={$sizeInputField}
                    labelTx={"common.formLabel.weight"}
                    LabelTextProps={{style: $formLabel}}
                    value={values.weight.toString()}
                    onChangeText={handleChange('weight')}
                    RightAccessory={()=>(
                      <Text style={$unitText} text="kg"/>
                    )}
                  />
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

const {fontScale, width, height} = Dimensions.get('screen')

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
  width: 18,
  height: 18
}

const $bodyContainer: ViewStyle = {
  marginTop: 22,
  backgroundColor: 'white'
}

const $bodyContentContainer: ViewStyle = {
  flexGrow: 1,
  paddingVertical: 21,
  paddingHorizontal: width*0.04
}

const $subHeaderText: TextStyle = {
  fontSize: 20 / fontScale,
  fontWeight: "bold",
  marginBottom: 21
}

const $formLabel: TextStyle = {
  color: '#838D92',
  marginBottom: 9,
  fontSize: 15 / fontScale
}

const $line: ViewStyle = {
  width: width*0.92,
  backgroundColor: '#E5E8E9',
  borderColor: '#E5E8E9',
  borderWidth: 0.7,
  marginTop: 24,
  marginBottom: 17
}

const $saveButton: ViewStyle = {
  width: 167,
  backgroundColor: "#F14300",
  marginTop: 24,
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

const $sizeInputFieldContainer: ViewStyle = {
  columnGap: 17,
  rowGap: 13,
  flexDirection: 'row',
  flexWrap: 'wrap'
}

const $sizeInputField: ViewStyle = {
  width: width*0.43
}

const $unitText: TextStyle = {
  height: '100%',
  textAlignVertical: 'center',
  fontSize: 17 / fontScale,
  lineHeight: 20,
  marginRight: 7
}

const $monetaryUnitPicker: ViewStyle = {
  marginLeft: 7
}