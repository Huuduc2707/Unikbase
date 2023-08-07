import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { IconTypes, Icon } from "./Icon"
import { useNavigation } from "@react-navigation/native"

export interface SignInButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  icon?: IconTypes
  text?: string
  navigateTo: string
}

/**
 * Describe your component here
 */
export const SignInButton = observer(function SignInButton(props: SignInButtonProps) {
  const { style, icon, text , navigateTo} = props
  const $styles = [$container, style]

  const navigation = useNavigation()

  return (
    <TouchableOpacity style={$styles} activeOpacity={0.7} onPress={()=>navigation.navigate(navigateTo)}>
      <Icon style={$logo} icon={icon}/>
      <Text style={$text}>{text}</Text>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  width: 300,
  height: 40,
  backgroundColor: 'white',
  borderColor: 'black',
  borderWidth: 1,
  flexDirection: 'row',
  alignItems: 'center'
}

const $text: TextStyle = {
  fontSize: 14,
  color: 'black',
  marginLeft: 20
}

const $logo: ImageStyle = {
  maxWidth: 20,
  maxHeight: 20,
  marginLeft: 10
}