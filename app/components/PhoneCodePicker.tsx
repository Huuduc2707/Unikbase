import React, {useState} from "react"
import { StyleProp, TextStyle, ViewStyle, TouchableOpacity, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "./Icon"
import { PhoneCodeModal } from "./PhoneCodeModal"
import CountryFlag from "react-native-country-flag"

export interface phoneCodeProps {
  countryCode: string
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
      <CountryFlag isoCode={selected.countryCode} size={20}/>
      <Text style={$text} text={selected.dialCode}/>
      <PhoneCodeModal state={isVisible} setState={setIsVisible} setSelected={setSelected}/>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'black',
  width: 90,
  height: 30
}

const $text: TextStyle = {
  fontSize: 14,
  color: 'black'
}

const $icon: ImageStyle = {
  width: 10,
  height: 10
}
