import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

export interface LineProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Line = observer(function Line(props: LineProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
    </View>
  )
})

const $container: ViewStyle = {
  width: 121,
  height: 1,
  borderWidth: 1,
  borderColor: 'white'
}
