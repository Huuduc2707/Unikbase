import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, TouchableOpacity, Dimensions, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"

export interface MonetaryUnitPickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const MonetaryUnitPicker = observer(function MonetaryUnitPicker(props: MonetaryUnitPickerProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
    <TouchableOpacity style={$subContainer} activeOpacity={0.7}>
      <Icon style={$icon} icon="down"/>
      <Text style={$text} text="$"/>
    </TouchableOpacity>
    </View>
  )
})

const {fontScale, width, height} = Dimensions.get('screen')

const $container: ViewStyle = {
  borderWidth: 1,
  borderColor: 'black',
  width: width*0.1,
  height: height*0.03
}

const $subContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
}

const $text: TextStyle = {
  fontSize: 15 / fontScale,
  color: 'black',
  lineHeight: 21
}

const $icon: ImageStyle = {
  width: 10 / fontScale,
  height: 10 / fontScale,
  tintColor: 'black'
}
