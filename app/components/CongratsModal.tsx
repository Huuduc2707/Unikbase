/* eslint-disable object-shorthand */
import * as React from "react"
import { TextStyle, View, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { Button } from "app/components/Button"
import Modal from "react-native-modal"

export interface CongratsModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const CongratsModal = observer(function CongratsModal(props: CongratsModalProps) {
  const { visibility, setVisibility } = props
  return (
    <Modal isVisible={visibility} backdropTransitionOutTiming={0}>
        <View style={$formContainer}>
            <View style={$iconContainer}>
              <Icon style={$arrowIcon} icon="tlc"/>
              <Icon style={$arrowIcon} icon="trc"/>
            </View>
            <View style={$form}>
              <Text style={$formName} tx={"common.formName.congratulations"}/> 
              <Text style={$informText} tx={"common.textAndLink.completedCreatingDigitalTwin"} txOptions={{name: "Object title"}}/>
              <Button style={$doneButton} tx={"common.button.goToDigitalTwin"} textStyle={$doneText} pressedStyle={$buttonPressed} onPress={()=>setVisibility(false)}/>
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

const $formContainer: ViewStyle = {
  backgroundColor: 'white',
  alignSelf: 'center',
  width: width*0.95,
  paddingVertical: 16,
  paddingHorizontal: 15
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

const $informText: TextStyle = {
  fontSize: 18 / fontScale,
  textAlign: 'center',
  width: width*0.85
}
const $doneButton: ViewStyle = {
  width: width*0.85,
  backgroundColor: "#F14300",
  marginTop: 38,
  marginBottom: 11
}

const $doneText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center'
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}
