/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Dimensions, ImageStyle, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { Button } from "app/components/Button"
import { TextField } from "app/components/TextField"
import Modal from "react-native-modal"

export interface NewDocumentNameModalProps {
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
export const NewDocumentNameModal = observer(function NewDocumentNameModal(props: NewDocumentNameModalProps) {
  const { style, visibility, setVisibility } = props
  const $styles = [$container, style]

  return (
    <Modal style={{flex: 1, justifyContent: 'center'}} isVisible={visibility} backdropTransitionOutTiming={0} avoidKeyboard={false}>
      <View style={{flex: 1, marginTop: height*0.3}}>
        <View style={$styles}>
          <View style={$iconContainer}>
            <Icon style={$arrowIcon} icon="tlc"/>
            <Icon style={$arrowIcon} icon="trc"/>
          </View>
          <KeyboardAvoidingView style={$form} behavior={Platform.OS==="android"?"padding":null}>
          <ScrollView>
            <Text style={$informText} tx={"common.formName.newDocumentName"} />
            <TextField inputWrapperStyle={$inputField}/>
            <View style={$buttonContainer}>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>setVisibility(false)}>
                <Text style={$clearAllButton} tx={"common.button.cancel2"}/>
              </TouchableOpacity>
              <Button 
                style={$confirmButton} 
                tx={"common.button.confirm"} 
                textStyle={$buttonText} 
                pressedStyle={$confirmButtonPressed} 
                onPress={()=>setVisibility(false)}
              />
            </View>
          </ScrollView></KeyboardAvoidingView>
          <View style={$iconContainer}>
            <Icon style={$arrowIcon} icon="blc"/>
            <Icon style={$arrowIcon} icon="brc"/>
          </View>
        </View>
      </View>
    </Modal>
  )
})

const {fontScale, width, height} = Dimensions.get('screen')


const $container: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: 'white',
  width: width*0.9,
  paddingVertical: height*0.02
}

const $iconContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: width*0.77
}

const $arrowIcon: ImageStyle = {
  width: 15 / fontScale,
  height: 15 / fontScale
}

const $form: ViewStyle = {
  backgroundColor: 'white',
  // alignItems: 'center',
  marginTop: 10,
  width: width*0.8
}

const $informText: TextStyle = {
  fontSize: 18 / fontScale,
  textAlign: 'center',
  lineHeight: 18,
  width: width*0.8
}

const $inputField: ViewStyle = {
  marginTop: 19,
  width: '100%'
}

const $buttonContainer: ViewStyle = {
  marginTop: 23,
  marginBottom: height*0.015,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  gap: 22
}

const $confirmButton: ViewStyle = {
  width: width*0.39,
  backgroundColor: "#F14300"
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center'
}

const $confirmButtonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7
}

const $clearAllButton: TextStyle = {
  fontWeight: 'bold'
}