/* eslint-disable object-shorthand */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from "react"
import { StyleProp, TextStyle, View, ViewStyle, TouchableOpacity, ImageStyle, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { Line } from "app/components/Line"
import { TextField } from "app/components/TextField"
import { Button } from "app/components/Button"
import Modal from "react-native-modal"
import { Formik } from "formik"
import Checkbox from "expo-checkbox"
import { TxKeyPath, translate } from "app/i18n"
import DateTimePicker from '@react-native-community/datetimepicker';

export interface SearchModalProps {
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
export const SearchModal = observer(function SearchModal(props: SearchModalProps) {
  const { style, visibility, setVisibility } = props
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)
  const $styles = [$container, style]

  const digitalTwinStatusValue: TxKeyPath[] = [
    "mainpageNavigator.wallet.checkBoxValue.active", 
    "mainpageNavigator.wallet.checkBoxValue.transferring", 
    "mainpageNavigator.wallet.checkBoxValue.refused"
  ]
  const tokenStatusValue: TxKeyPath[] = [
    "mainpageNavigator.wallet.checkBoxValue.private",
    "mainpageNavigator.wallet.checkBoxValue.shared",
    "mainpageNavigator.wallet.checkBoxValue.public"
  ]
  const tokenOperatorStatusValue: TxKeyPath[] = [
    "mainpageNavigator.wallet.checkBoxValue.owned",
    "mainpageNavigator.wallet.checkBoxValue.managed"
  ]

  function getFormData(values){
    console.log(`Keyword: ${values.keyword}`)
    console.log(`Date: ${new Date(values.date).toLocaleDateString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, '-')}`)
    console.log(`Operator: ${values.operator}`)
    console.log(`DigitalTwin Status: ${values.digitalTwinStatus!==-1?translate(digitalTwinStatusValue[values.digitalTwinStatus]):""}`)
    console.log(`Token Status: ${values.tokenStatus!==-1?translate(tokenStatusValue[values.tokenStatus]):""}`)
    console.log(`Token Operator Status: ${values.tokenOperatorStatus!==-1?translate(tokenOperatorStatusValue[values.tokenOperatorStatus]):""}`)
  }

  return (
    <Modal isVisible={visibility} avoidKeyboard={false} backdropTransitionOutTiming={0}>
      <View style={$styles}>
      {/* Form header */}
      <View style={$form}>
        <View style={$formHeaderContainer}>
          <Text style={$formName} tx={"common.formName.search"}/>
          <TouchableOpacity style={$closeIconContainer} activeOpacity={0.7} onPress={()=>setVisibility(false)}>
            <Icon style={$closeIcon} icon="x" />
          </TouchableOpacity>
        </View>

        <Line style={$line}/>

        {/* Form body */}
        <View style={$formBodyContainer}>
          <Formik
            initialValues={{keyword: "", date: "", operator: "", digitalTwinStatus: -1, tokenStatus: -1, tokenOperatorStatus: -1}}
            onSubmit={(values)=>getFormData(values)}
          >
            {({handleChange, handleSubmit, handleReset, setFieldValue, values})=>(
              <View style={$formInputContainer}>
                <View style={$inputFieldContainer}>
                  <TextField
                    inputWrapperStyle={$inputField}
                    style={$inputText}
                    placeholderTx={"common.inputPlaceholder.search"}
                    placeholderTextColor={'black'}
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
                      placeholderTx={"common.inputPlaceholder.createAt"} 
                      placeholderTextColor={'black'}
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
                    onChange={(event, date)=>{setIsDateTimePickerVisible(false); setFieldValue('date', date.toString())}}
                  />
                  }

                  <TouchableOpacity activeOpacity={0.7}>
                    <TextField
                      inputWrapperStyle={[$inputField]}
                      style={$inputText}
                      status="disabled"
                      placeholderTx={"common.inputPlaceholder.operator"}
                      placeholderTextColor={'black'}
                      value={values.operator}
                      RightAccessory={()=>(
                        <View style={$iconContainer}>
                          <Icon style={$dropDownIcon} icon="caretDown2"/>
                        </View>
                      )}
                    />
                  </TouchableOpacity>
                </View>
                <View style={$statusCheckboxContainer}>
                  <View style={$DTAndTokenStatusContainer}>
                    <View>
                      <Text style={$checkBoxFieldTitle} tx={"mainpageNavigator.wallet.checkboxFieldTitle.digitalTwinStatus"}/>
                      <View style={$DTAndTokenStatusCheckBoxContainer}>
                        {
                          digitalTwinStatusValue.map((value, index)=>(
                            <View key={(index+1)*3} style={$checkBoxAndText}>
                              <Checkbox
                                style={$checkbox}
                                color={values.digitalTwinStatus===index?'black':'#838D92'}
                                value={values.digitalTwinStatus===index} 
                                onValueChange={(status)=>status?setFieldValue('digitalTwinStatus', index):setFieldValue('digitalTwinStatus', -1)}
                              />
                              <Text style={$checkBoxFieldValue} tx={value}/>
                            </View>
      
                          ))
                        }
                      </View>
                    </View>
                    <View>
                      <Text style={$checkBoxFieldTitle} tx={"mainpageNavigator.wallet.checkboxFieldTitle.tokenStatus"}/>
                      <View style={$DTAndTokenStatusCheckBoxContainer}>
                        {
                          tokenStatusValue.map((value, index)=>(
                            <View key={(index+1)*5} style={$checkBoxAndText}>
                              <Checkbox
                                style={$checkbox}
                                color={values.tokenStatus===index?'black':'#838D92'}
                                value={values.tokenStatus===index}
                                onValueChange={(status)=>status?setFieldValue('tokenStatus', index):setFieldValue('tokenStatus', -1)}
                              />
                              <Text style={$checkBoxFieldValue} tx={value}/>
                            </View>
                          ))
                        }
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={$checkBoxFieldTitle} tx={"mainpageNavigator.wallet.checkboxFieldTitle.tokenOperatorStatus"}/>
                    <View style={$tokenOperatorStatusCheckboxContainer}>
                      {
                        tokenOperatorStatusValue.map((value, index)=>(
                          <View key={(index+1)*7} style={$checkBoxAndText}>
                            <Checkbox
                              style={$checkbox}
                              color={values.tokenOperatorStatus===index?'black':'#838D92'}
                              value={values.tokenOperatorStatus===index}
                              onValueChange={(status)=>status?setFieldValue('tokenOperatorStatus', index):setFieldValue('tokenOperatorStatus', -1)}
                            />
                            <Text style={$checkBoxFieldValue} tx={value}/>
                          </View>
                        ))
                      }
                    </View>
                  </View>
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
              </View>
            )}
          </Formik>
        </View>
      </View></View>
    </Modal>
  )
})



const {width, height, fontScale} = Dimensions.get("screen")

const $container: ViewStyle = {
  flex: 1,
  height: height,
  marginTop: height*0.105
}

const $form: ViewStyle = {
  alignSelf: 'center',
  backgroundColor: 'white',
  width: width*0.95
}

const $formHeaderContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 18
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
  paddingTop: 20
}

const $formInputContainer: ViewStyle = {
  width: '85%',
  alignSelf: 'center',
  paddingBottom: 24
}

const $inputFieldContainer: ViewStyle = {
  gap: 12
}

const $inputField: ViewStyle = {
  height: 45
}

const $inputText: TextStyle = {
  height: '100%'
}

const $inputFieldIcon: ImageStyle = {
  width: 25 / fontScale,
  height: 25 / fontScale,
  marginRight: 10,
  marginTop: '21%'
}

const $dropDownIcon: ImageStyle = {
  width: 18 / fontScale,
  height: 18 / fontScale
}

const $iconContainer: ViewStyle = {
  borderLeftWidth: 1,
  borderColor: '#838E91',
  height: '100%',
  width: '15%',
  alignItems: 'center',
  justifyContent: 'center'
}

const $statusCheckboxContainer: ViewStyle = {
  marginTop: 20
}

const $DTAndTokenStatusContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginRight: width*0.08,
  marginBottom: 20
}

const $DTAndTokenStatusCheckBoxContainer: ViewStyle = {
  marginTop: 13,
  gap: 10
}

const $tokenOperatorStatusCheckboxContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginRight: width*0.059,
  marginTop: 15
}

const $checkBoxAndText: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 15
}

const $checkbox: ViewStyle = {
  width: 22,
  height: 22,
  borderWidth: 1,
  borderRadius: 0
}

const $checkBoxFieldTitle: TextStyle = {
  color: '#838D92'
}

const $checkBoxFieldValue: TextStyle = {
  color: '#041C25'
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