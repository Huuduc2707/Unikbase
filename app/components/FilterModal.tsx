/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, {useState} from "react"
import { StyleProp, TextStyle, View, ViewStyle, TouchableOpacity, Dimensions, ImageStyle, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Line } from "app/components/Line"
import { Icon } from "app/components/Icon"
import { Button } from "app/components/Button"
import { OperatorModal } from "app/components/OperatorModal"
import { TextField } from "app/components/TextField"
import { Formik } from "formik"
import Modal from "react-native-modal"
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from "expo-checkbox"
import { TxKeyPath, translate } from "app/i18n"

export interface FilterModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const FilterModal = observer(function FilterModal(props: FilterModalProps) {
  const { style, visibility, setVisibility } = props
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)
  const [isOperatorModalVisible, setIsOperatorModalVisible] = useState(false)
  const $styles = [$container, style]

  const operator: TxKeyPath[] = [
    "mainpageNavigator.history.tokenHistory.checkboxValue.tokenCreation",
    "mainpageNavigator.history.tokenHistory.checkboxValue.documentUploaded",
    "mainpageNavigator.history.tokenHistory.checkboxValue.tokenTransfer",
    "mainpageNavigator.history.tokenHistory.checkboxValue.documentDeleted",
    "mainpageNavigator.history.tokenHistory.checkboxValue.tokenReceipt",
    "mainpageNavigator.history.tokenHistory.checkboxValue.informationAdded",
    "mainpageNavigator.history.tokenHistory.checkboxValue.tokenAccepted",
    "mainpageNavigator.history.tokenHistory.checkboxValue.informationDeleted",
    "mainpageNavigator.history.tokenHistory.checkboxValue.tokenRefused",
    "mainpageNavigator.history.tokenHistory.checkboxValue.informationModified",
    "mainpageNavigator.history.tokenHistory.checkboxValue.tokenSent",
    "mainpageNavigator.history.tokenHistory.checkboxValue.operatorChange"
  ]

  function getFormData(values){
    console.log(`Keyword: ${values.keyword}`)
    console.log(`Date: ${new Date(values.date).toLocaleDateString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-')}`)
    console.log(`Operator: ${values.operator}`)
    console.log(`Checkbox value: ${translate(operator[values.tokenOperator])}`)
  }

  return (
    <Modal style={{margin: 0}} isVisible={visibility} backdropTransitionOutTiming={0}>
      <View style={$styles}>
        {/* Form header */}
        <View style={$form}>
          <View style={$formHeaderContainer}>
            <Text style={$formName} tx={"common.formName.filter"}/>
            <TouchableOpacity style={$closeIconContainer} activeOpacity={0.7} onPress={()=>setVisibility(false)}>
              <Icon style={$closeIcon} icon="x" />
            </TouchableOpacity>
          </View>

          <Line style={$line}/>
      
          {/* Form body */}
          <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS==="android"?"padding":null} keyboardVerticalOffset={Platform.OS==="android"?25:0}>
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 24}} style={$formBodyContainer}>
            <Formik
              initialValues={{keyword: "", date: "", operator: "", tokenOperator: -1}}
              onSubmit={(values)=>getFormData(values)}
            >
              {({handleChange, handleSubmit, handleReset, setFieldValue, values})=>(
                <View style={$formInputContainer}>
                  <View style={$checkboxFieldContainer}>
                    <View style={$checkboxColumn}>
                      {
                      operator.map((value, index)=>(
                        index % 2 === 0 &&
                        <View key={index} style={$checkboxContainer}>
                          <Checkbox
                            style={$checkbox}
                            color={values.tokenOperator===index?'black':'#838D92'}
                            value={values.tokenOperator===index}
                            onValueChange={(status)=>status?setFieldValue('tokenOperator', index):setFieldValue('tokenOperator', -1)}
                          />
                          <Text style={$checkboxValue} text={translate(value)}/>
                        </View>
                      ))
                    }
                    </View>
                    <View style={$checkboxColumn}>
                      {
                      operator.map((value, index)=>(
                        index % 2 !== 0 &&
                        <View key={index} style={$checkboxContainer}>
                          <Checkbox
                            style={$checkbox}
                            color={values.tokenOperator===index?'black':'#838D92'}
                            value={values.tokenOperator===index}
                            onValueChange={(status)=>status?setFieldValue('tokenOperator', index):setFieldValue('tokenOperator', -1)}
                          />
                          <Text style={$checkboxValue} text={translate(value)}/>
                        </View>
                      ))
                    }
                    </View>
                  </View>
                  <View style={$inputFieldContainer}>
                    <TextField
                      inputWrapperStyle={$inputField}
                      style={$inputText}
                      labelTx={"common.formLabel.search"}
                      LabelTextProps={{style: $inputFieldLabel}}
                      value={values.keyword}
                      onChangeText={handleChange('keyword')}
                      RightAccessory={()=>(
                        <Icon style={$inputFieldIcon} icon="search2"/>
                      )} 
                    />

                    <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsDateTimePickerVisible(true)}>
                      <TextField
                        inputWrapperStyle={$inputField}
                        style={$inputText}
                        status="disabled"
                        labelTx={"common.formLabel.period"}
                        LabelTextProps={{style: $inputFieldLabel}}
                        value={values.date===""?"":new Date(values.date).toLocaleDateString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-')}
                        RightAccessory={()=>(
                          <Icon style={$inputFieldIcon} icon="calendar"/>
                        )}
                      />
                    </TouchableOpacity>
                  
                    {
                      isDateTimePickerVisible &&
                      <DateTimePicker
                      mode="date"
                      value={values.date===""?new Date(): new Date(values.date)}
                      onChange={(event, date)=>{
                        setIsDateTimePickerVisible(false)
                        if(event.type!=="dismissed") setFieldValue('date', date)
                      }}
                    />
                    }

                    <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsOperatorModalVisible(true)}>
                      <TextField
                        inputWrapperStyle={[$inputField]}
                        style={$inputText}
                        status="disabled"
                        labelTx={"common.formLabel.operator"}
                        LabelTextProps={{style: $inputFieldLabel}}
                        value={values.operator}
                        RightAccessory={()=>(
                          <View style={$iconContainer}>
                            <Icon style={$dropDownIcon} icon="caretDown2"/>
                          </View>
                        )}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={$buttonContainer}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>handleReset()}>
                      <Text style={$clearAllButton} tx={"common.button.clearAll"}/>
                    </TouchableOpacity>
                    <Button 
                      style={$applyButton}
                      textStyle={$applyText}
                      pressedStyle={$buttonPressed}
                      tx={"common.button.apply"}
                      onPress={()=>handleSubmit()}
                    />
                  </View>
                  <OperatorModal visibility={isOperatorModalVisible} setVisibility={setIsOperatorModalVisible} setNewValue={setFieldValue}/>
                </View>
              )}
            </Formik>
          </ScrollView></KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  )
})

const {width, height, fontScale} = Dimensions.get("screen")

const $container: ViewStyle = {
  flex: 1,
  alignSelf: 'center',
  position: 'absolute',
  top: height*0.15,
  bottom: height*0.15
}

const $form: ViewStyle = {
  flex: 1,
  alignSelf: 'center',
  backgroundColor: 'white',
  width: width*0.95
}

const $formHeaderContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 23
}

const $formName: TextStyle = {
  fontSize: 23 / fontScale
}

const $closeIconContainer: ViewStyle = {
  position: 'absolute',
  right: width*0.055
}

const $closeIcon: ImageStyle = {
  width: 33 / fontScale,
  height: 33 / fontScale
}

const $line: ViewStyle = {
  backgroundColor: '#E5E8E9',
  borderColor: '#E5E8E9',
  borderWidth: 0.7,
  width: '85%',
  alignSelf: 'center'
}

const $formBodyContainer: ViewStyle = {
  marginTop: 20
}

const $formInputContainer: ViewStyle = {
  width: '85%',
  alignSelf: 'center'
}

const $checkboxFieldContainer: ViewStyle = {
  flexDirection: 'row',
  gap: width*0.05,
  marginBottom: 31
}

const $checkboxColumn: ViewStyle = {
  alignItems: 'flex-start',
  gap: 20
}

const $checkboxContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}

const $checkbox: ViewStyle = {
  width: 20,
  height: 20,
  borderWidth: 0.8
}

const $checkboxValue: TextStyle = {
  fontSize: 13 / fontScale,
  marginLeft: width*0.02
}

const $inputFieldContainer: ViewStyle = {
  gap: 11
}

const $inputField: ViewStyle = {
  height: 45
}

const $inputText: TextStyle = {
  height: '100%',
  color: 'black'
}

const $inputFieldLabel: TextStyle = {
  marginBottom: 5,
  fontSize: 18 / fontScale,
  color: '#838D92'
}

const $inputFieldIcon: ImageStyle = {
  width: 25,
  height: 25,
  marginRight: 10,
  marginTop: '21%'
}

const $dropDownIcon: ImageStyle = {
  width: 18,
  height: 18
}

const $iconContainer: ViewStyle = {
  borderLeftWidth: 1,
  borderColor: '#838E91',
  height: '100%',
  width: '15%',
  alignItems: 'center',
  justifyContent: 'center'
}

const $buttonContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 29,
  marginTop: 26
}

const $applyButton: ViewStyle = {
  backgroundColor: '#EE4300',
  width: '42%'
}

const $applyText: TextStyle = {
  fontSize: 14 / fontScale,
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center',
  textAlign: 'center',
  lineHeight: 17
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#EE4300",
  opacity: 0.7,
}

const $clearAllButton: TextStyle = {
  fontWeight: 'bold'
}