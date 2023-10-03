import * as React from "react"
import { ImageSourcePropType, StyleProp, TextStyle, View, ViewStyle, Dimensions, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { TxKeyPath } from "app/i18n"

export interface Document{
  image?: ImageSourcePropType
  name: string
}

export interface DocumentBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  category?: TxKeyPath
  document?: Document[]
}

/**
 * Describe your component here
 */
export const DocumentBox = observer(function DocumentBox(props: DocumentBoxProps) {
  const { style, category, document } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Text style={$categoryText} tx={category}/>
      <View style={$documentSection}>
        {
          document.map((value, index)=>(
            <View key={(index+1)*0.1} style={$documentContainer}>
              {
                value.image &&
                <Image style={$image} source={value.image} resizeMode="contain"/>
              }
              <Text style={$documentNameText} text={value.name}/>
            </View>
          ))
        }
      </View>
    </View>
  )
})

const {fontScale, height, width} = Dimensions.get('screen')

const $container: ViewStyle = {
  paddingVertical: 14,
  paddingHorizontal: 13,
  backgroundColor: '#E5E8E9'
}

const $categoryText: TextStyle = {
  fontSize: 15 / fontScale,
  fontWeight: 'bold'
}

const $documentSection: ViewStyle = {
  marginTop: 14,
  gap: 12
}

const $documentContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 22
}

const $image: ImageStyle = {
  maxWidth: width*0.15,
  maxHeight: height*0.07
}

const $documentNameText: TextStyle = {
  fontSize: 15 / fontScale
}