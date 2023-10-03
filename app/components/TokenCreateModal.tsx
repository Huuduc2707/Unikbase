/* eslint-disable object-shorthand */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import {TextStyle, View, ViewStyle, TouchableOpacity, ScrollView, Dimensions, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { TextField } from "app/components/TextField"
import { Button } from "app/components/Button"
import { Formik } from "formik"
import * as ImagePicker from "expo-image-picker"
import Modal from "react-native-modal"

export interface TokenCreateModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
  setSubModalVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const TokenCreateModal = observer(function TokenCreateModal(props: TokenCreateModalProps) {
  const { visibility, setVisibility, setSubModalVisibility } = props

  function submitHandler(values){
    console.log(`TPK_${values.id}`)
    console.log(values.name)
    console.log(values.coverImage)
    setVisibility(false)
    setSubModalVisibility(true)
  }

  return (
    <Modal isVisible={visibility} avoidKeyboard={true} backdropTransitionOutTiming={0}>
      <View style={$root}>
        <View style={$formContainer}>
          {/* Form header */}
          <View style={$formHeaderContainer}>
            <Text style={$formHeaderText} tx={"common.button.createDigitalTwin"}/>
            <TouchableOpacity activeOpacity={0.7} onPress={()=>setVisibility(false)}>
              <Icon style={$closeIcon} icon="roundX"/>
            </TouchableOpacity>
          </View>

          {/* Form body */}
          <View style={$formBodyContainer}>
            <Formik
              initialValues={{id: "", tagRef: "", name: "", description: "", coverImage: ""}}
              onSubmit={(values)=>submitHandler(values)}
            >
              {({handleSubmit, handleChange, setFieldValue, values})=>(
                <ScrollView contentContainerStyle={$inputFieldContentContainer} style={$inputFieldContainer}>
                  <TextField
                    inputWrapperStyle={$inputField}
                    style={{marginLeft: -2.5}}
                    labelTx={"common.formLabel.id"}
                    LabelTextProps={{style:$inputLabel}}
                    value={values.id}
                    onChangeText={handleChange('id')}
                    LeftAccessory={()=>(
                      <Text style={$constantText} text="TPK_"/>  
                    )}
                  />
                  <TextField
                    inputWrapperStyle={$inputField}
                    labelTx={"common.formLabel.tagRef"}
                    LabelTextProps={{style:$inputLabel}}
                    value={values.tagRef}
                    onChangeText={handleChange('tagRef')}
                  />
                  <TextField
                    inputWrapperStyle={$inputField}
                    labelTx={"common.formLabel.digitalTwinName"}
                    LabelTextProps={{style:$inputLabel}}
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                  <TextField
                    inputWrapperStyle={[$inputField, {minHeight: 69}]}
                    labelTx={"common.formLabel.description"}
                    LabelTextProps={{style:$inputLabel}}
                    multiline={true}
                    value={values.description}
                    onChangeText={handleChange('description')}
                  />
                  <>
                    <Text style={[$inputLabel, {marginBottom: -5}]} preset="formLabel" tx={"common.formLabel.coverImage"}/>
                    <TouchableOpacity
                      style={$inputField}
                      activeOpacity={0.7} 
                      onPress={async ()=>{
                        const image = await ImagePicker.launchImageLibraryAsync({
                          mediaTypes: ImagePicker.MediaTypeOptions.Images,
                          allowsEditing: true,
                          quality: 1
                        })
                        if(!image.canceled) setFieldValue('coverImage', image.assets[0].uri)
                      }}
                    >
                      <TextField
                        inputWrapperStyle={{width: '100%'}}
                        status="disabled"
                        placeholderTx={"common.inputPlaceholder.downloadImage"}
                        placeholderTextColor={'#838D92'}
                        value = {values.coverImage}
                        LeftAccessory={()=>(
                          <Icon style={$imageIcon} icon="image"/>
                        )}
                      />
                    </TouchableOpacity>
                  </>
                  <Button 
                    style={$addButton} 
                    textStyle={$addText} 
                    pressedStyle={$buttonPressed} 
                    tx={"common.button.createDigitalTwin"}
                    onPress={()=>handleSubmit()}
                  />
                </ScrollView>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </Modal>
  )
})

const {fontScale, width, height} = Dimensions.get('screen')

const $root: ViewStyle = {
  flex: 1,
  height: height
}

const $formContainer: ViewStyle = {
  backgroundColor: 'white',
  paddingTop: 21,
  width: width,
  alignSelf: 'center',
  paddingHorizontal: 16
}

const $formHeaderContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const $formHeaderText: TextStyle = {
  fontSize: 18 / fontScale,
  fontWeight: 'bold'
}

const $closeIcon: ImageStyle = {
  width: 34,
  height: 34
}

const $formBodyContainer: ViewStyle = {
  marginTop: 21
}

const $inputFieldContainer: ViewStyle = {
  
}

const $inputFieldContentContainer: ViewStyle = {
  gap: 12,
  paddingBottom: 40
}

const $inputLabel: TextStyle = {
  fontSize: 15 / fontScale,
  color: '#838D92',
  marginBottom: 7
}

const $inputField: ViewStyle = {
  width: '100%'
}

const $constantText: TextStyle = {
  height: '100%',
  textAlignVertical: 'center',
  fontSize: 16 / fontScale,
  marginLeft: 12
}

const $addButton: ViewStyle = {
  backgroundColor: '#EE4300',
  width: '100%',
  marginTop: 56
}

const $addText: TextStyle = {
  fontSize: 14 / fontScale,
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center',
  lineHeight: 17
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#EE4300",
  opacity: 0.7,
}

const $imageIcon: ImageStyle = {
  width: 27,
  height: 27,
  marginTop: 4.5,
  marginLeft: 4
}