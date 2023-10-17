import React, {useState} from "react"
import { StyleProp, TextStyle, View, ViewStyle, Dimensions, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { TextField } from "app/components/TextField"
import { Button } from "app/components/Button"
import Modal from "react-native-modal"
import { useNavigation } from "@react-navigation/native"

export interface ForgotPasswordModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible?: boolean
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const ForgotPasswordModal = observer(function ForgotPasswordModal(props: ForgotPasswordModalProps) {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const { style, isVisible, setIsVisible } = props
  const $styles = [$container, style]

  const navigation = useNavigation()

  function submitEmail(){
    if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email
      )) setError("Error")
    else setError("No error")
  }

  return (
    <Modal style={$styles} isVisible={isVisible} coverScreen={false} onBackdropPress={()=>setIsVisible(false)} backdropTransitionOutTiming={0}>
      <View style={$iconContainer}>
        <Icon style={$arrowIcon} icon="tlc"/>
        <Icon style={$arrowIcon} icon="trc"/>
      </View>
      <View style={$form}>
        {error!=="No error"?
          <>
            <Text style={$formName} tx={"common.textAndLink.forgotPassword"} />
            <Text style={$informText} tx={"forgotPasswordModal.instruction"}/>
            <TextField 
              inputWrapperStyle={$inputField} 
              status={(error==="Error")?"error":null} 
              placeholderTx={"common.inputPlaceholder.email"}
              helperTx={(error==="Error")?"common.error.invalidEmail":null}
              HelperTextProps={{style: $errorText}}
              value={email} 
              onChangeText={(text)=>setEmail(text)}
            />
            <Button 
              style={$submitButton} 
              tx={"common.button.submit"} 
              textStyle={$buttonText} 
              pressedStyle={$buttonPressed} 
              onPress={submitEmail}
            />
          </>
          :
          <>
          <Text style={$formName} tx={"common.textAndLink.warning"} />
          <Text style={$informText} tx={"forgotPasswordModal.warning"} />
          <Button 
            style={$removeButton} 
            tx={"common.button.removeWalletAndProceed"} 
            textStyle={$buttonText} 
            pressedStyle={$buttonPressed} 
            onPress={()=>navigation.navigate("Login")}
          />
          <Button 
            style={$cancelButton} 
            tx={"common.button.cancel"} 
            textStyle={$buttonText} 
            pressedStyle={$buttonPressed} 
            onPress={()=>{setIsVisible(false); setError("")}}
          />
          </>
      }
      </View>
      <View style={$iconContainer}>
        <Icon style={$arrowIcon} icon="blc"/>
        <Icon style={$arrowIcon} icon="brc"/>
      </View>
    </Modal>
  )
})



const {width, height, fontScale} = Dimensions.get('window')

const $container: ViewStyle = {
  position: 'absolute',
  top: height*0.25,
  justifyContent: "flex-start",
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: 'white',
  width: width*0.95,
  paddingVertical: height*0.02
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
  marginTop: -10,
  width: width*0.85
}

const $formName: TextStyle = {
  fontSize: 19 / fontScale,
  marginBottom: height*0.015
}

const $informText: TextStyle = {
  fontSize: 14 / fontScale,
  textAlign: 'center',
  lineHeight: 18,
  width: width*0.85,
  marginBottom: height*0.025
}

const $inputField: ViewStyle = {
  width: width*0.85,
  height: height*0.05,
  backgroundColor: 'white',
}

const $submitButton: ViewStyle = {
  width: width*0.85,
  backgroundColor: "#F14300",
  marginTop: height*0.01,
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

const $errorText: TextStyle = {
  fontSize: 14,
  color: 'red',
  width: width*0.85,
  lineHeight: 14
}

const $removeButton: ViewStyle = {
  width: width*0.85,
  backgroundColor: "#F14300",
  marginBottom: height*0.01
}

const $cancelButton: ViewStyle = {
  width: width*0.85,
  backgroundColor: "#041C25",
  marginBottom: height*0.015
}