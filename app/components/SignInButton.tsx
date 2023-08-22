import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "app/theme"
import { Text } from "app/components/Text"
import { IconTypes, Icon } from "./Icon"

export interface SignInButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  icon?: IconTypes
  text?: string
}

/**
 * Describe your component here
 */
export const SignInButton = observer(function SignInButton(props: SignInButtonProps) {
  const { style, icon, text } = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity style={$styles} activeOpacity={0.7}>
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
  fontFamily: typography.fonts.hezaedrus.regular,
  fontSize: 14,
  color: 'black',
  marginLeft: 20
}

const $logo: ImageStyle = {
  maxWidth: 20,
  maxHeight: 20,
  marginLeft: 10
}
