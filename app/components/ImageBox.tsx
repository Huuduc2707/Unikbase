import * as React from "react"
import { ImageSourcePropType, StyleProp, TextStyle, View, ViewStyle, Image, ImageStyle, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { translate } from "app/i18n"

export interface ImageBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  source?: ImageSourcePropType
  coverImage?: boolean
  imageStyle?: StyleProp<ImageStyle>
}

/**
 * Describe your component here
 */
export const ImageBox = observer(function ImageBox(props: ImageBoxProps) {
  const { style,source, coverImage, imageStyle } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Image style={[$image, imageStyle]} source={source} resizeMode="contain"/>
      {
        coverImage &&
        <View style={$textContainer}>
          <Text style={$text} text={translate("common.formLabel.coverImage").toLocaleUpperCase()}/>
        </View>
      }
    </View>
  )
})

const {fontScale} = Dimensions.get('screen')

const $container: ViewStyle = {
  borderWidth: 1,
  borderColor: '#E5E8E9',
  justifyContent: 'center',
  alignItems: 'center',
  width: 170,
  height: 130,
  backgroundColor: '#E5E8E9'
}

const $image: ImageStyle = {
  maxWidth: 170,
  maxHeight: 130
}

const $textContainer: ViewStyle = {
  backgroundColor: '#838D92',
  paddingHorizontal: 14,
  position: 'absolute',
  top: 4,
  right: 4
}

const $text: TextStyle = {
  color: 'white',
  fontSize: 10 / fontScale
}