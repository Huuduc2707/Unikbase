import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, ViewStyle, TouchableOpacity, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { IconTypes, Icon } from "./Icon"
import { useNavigation } from "@react-navigation/native"
import { TxKeyPath } from "app/i18n"

export interface SignInButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  icon?: IconTypes
  tx?: TxKeyPath
  navigateTo: string
}

/**
 * Describe your component here
 */
export const SignInButton = observer(function SignInButton(props: SignInButtonProps) {
  const { style, icon, tx , navigateTo} = props
  const $styles = [$container, style]

  const navigation = useNavigation()

  return (
    <TouchableOpacity style={$styles} activeOpacity={0.7} onPress={()=>navigation.navigate(navigateTo)}>
      <Icon style={$logo} icon={icon} size={20/Dimensions.get('window').fontScale}/>
      <Text style={$text} tx={tx}/>
    </TouchableOpacity>
  )
})



const {width, height, fontScale} = Dimensions.get('window')

const $container: ViewStyle = {
  width: width*0.81,
  height: height*0.053,
  backgroundColor: 'white',
  borderColor: 'black',
  borderWidth: 1,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center'
}

const $text: TextStyle = {
  fontSize: 14 / fontScale,
  color: 'black',
  marginLeft: 20
}

const $logo: ImageStyle = {
  marginLeft: 10
}
