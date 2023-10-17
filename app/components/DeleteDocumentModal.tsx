import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { Button } from "app/components/Button"
import Modal from "react-native-modal"

export interface DeleteDocumentModalProps {
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
export const DeleteDocumentModal = observer(function DeleteDocumentModal(props: DeleteDocumentModalProps) {
  const { style, visibility, setVisibility } = props
  const $styles = [$container, style]

  return (
    <Modal isVisible={visibility} backdropTransitionOutTiming={0}>
      <View style={$styles}>
        <View style={$iconContainer}>
          <Icon style={$arrowIcon} icon="tlc"/>
          <Icon style={$arrowIcon} icon="trc"/>
        </View>
        <View style={$form}>
          <Text style={$informText} tx={"common.formName.confirmDeletion"} />
          <View style={$buttonContainer}>
            <Button 
              style={$cancelButton} 
              tx={"common.button.cancel"} 
              textStyle={$buttonText} 
              pressedStyle={$cancelButtonPressed} 
              onPress={()=>setVisibility(false)}
            />
            <Button 
              style={$confirmButton} 
              tx={"common.button.confirm"} 
              textStyle={$buttonText} 
              pressedStyle={$confirmButtonPressed} 
              onPress={()=>setVisibility(false)}
            />
          </View>
        </View>
        <View style={$iconContainer}>
          <Icon style={$arrowIcon} icon="blc"/>
          <Icon style={$arrowIcon} icon="brc"/>
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
  alignItems: 'center',
  marginTop: 10,
  width: width*0.8
}

const $informText: TextStyle = {
  fontSize: 18 / fontScale,
  textAlign: 'center',
  lineHeight: 18,
  width: width*0.8
}

const $buttonContainer: ViewStyle = {
  marginTop: 18,
  marginBottom: height*0.015,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}

const $confirmButton: ViewStyle = {
  width: width*0.39,
  backgroundColor: "#F14300"
}

const $cancelButton: ViewStyle = {
  width: width*0.39,
  backgroundColor: "#041C25B5"
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center',
  lineHeight: 18
}

const $confirmButtonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7
}

const $cancelButtonPressed: ViewStyle = {
  backgroundColor: '#041C25B5',
  opacity: 0.7
}