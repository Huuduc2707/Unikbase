import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { Button } from "app/components/Button"
import Modal from "react-native-modal"
import { useNavigation } from "@react-navigation/native"

export interface LogoutModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  visibility?: boolean
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const LogoutModal = observer(function LogoutModal(props: LogoutModalProps) {
  const { style, visibility, setVisibility } = props
  const $styles = [$container, style]
  const navigation = useNavigation()

  return (
    <Modal isVisible={visibility} backdropTransitionOutTiming={0} onBackdropPress={()=>setVisibility(false)}>
      <View style={$styles}>
        <View style={$iconContainer}>
          <Icon style={$arrowIcon} icon="tlc"/>
          <Icon style={$arrowIcon} icon="trc"/>
        </View>
        <View style={$form}>
          <Text style={$informText} tx={"mainpageNavigator.more.logout"} />
          <Button 
            style={$confirmButton} 
            tx={"common.button.confirm"} 
            textStyle={$buttonText} 
            pressedStyle={$buttonPressed} 
            onPress={()=>navigation.navigate("Login")}
          />
          <Button 
            style={$cancelButton} 
            tx={"common.button.cancel"} 
            textStyle={$buttonText} 
            pressedStyle={$buttonPressed} 
            onPress={()=>setVisibility(false)}
          />
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
  width: width*0.8,
  marginBottom: 28
}

const $confirmButton: ViewStyle = {
  width: width*0.8,
  backgroundColor: "#F14300",
  marginBottom: height*0.01
}

const $cancelButton: ViewStyle = {
  width: width*0.8,
  backgroundColor: "#041C25",
  marginBottom: height*0.015
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center'
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}