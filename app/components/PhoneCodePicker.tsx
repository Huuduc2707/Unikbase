import React, {useState} from "react"
import { StyleProp, TextStyle, ViewStyle, TouchableOpacity, ImageStyle, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "./Icon"
import { PhoneCodeModal } from "./PhoneCodeModal"

export interface phoneCodeProps {
  flag: string
  dialCode: string
}

export interface PhoneCodePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  selected: phoneCodeProps
  setSelected: React.Dispatch<React.SetStateAction<phoneCodeProps>>
}

/**
 * Describe your component here
 */
export const PhoneCodePicker = observer(function PhoneCodePicker(props: PhoneCodePickerProps) {
  const { style, selected, setSelected } = props
  const $styles = [$container, style]
  const [isVisible, setIsVisible] = useState(false)

  return (
    <TouchableOpacity style={$styles} activeOpacity={0.7} onPress={()=>setIsVisible(!isVisible)}>
      <Icon style={$icon} icon="down"/>
      <Text style={$flag} text={selected.flag}/>
      <Text style={$text} text={selected.dialCode}/>
      <PhoneCodeModal state={isVisible} setState={setIsVisible} setSelected={setSelected}/>
    </TouchableOpacity>
  )
})


const {width, height, fontScale} = Dimensions.get('window')

const $container: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'black',
  width: width*0.25,
  height: height*0.04
}

const $text: TextStyle = {
  fontSize: 14 / fontScale,
  color: 'black'
}

const $flag: TextStyle = {
  fontSize: 20 / fontScale
}

const $icon: ImageStyle = {
  width: 10 / fontScale,
  height: 10 / fontScale
}
