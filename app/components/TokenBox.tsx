import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, TouchableOpacity, Image, ImageSourcePropType, ImageStyle, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { TxKeyPath, translate } from "app/i18n"
import { useNavigation } from "@react-navigation/native"

export interface Token{
  name: string
  operator: string
  description: string
  digitalTwinStatus?: TxKeyPath
  tokenOperatorStatus?: TxKeyPath
  coverImage: ImageSourcePropType
}

export interface TokenBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data?: Token
}

/**
 * Describe your component here
 */
export const TokenBox = observer(function TokenBox(props: TokenBoxProps) {
  const { style, data } = props
  const $styles = [$container, style]

  const navigation = useNavigation()

  return (
    <TouchableOpacity style={$styles} activeOpacity={0.7} onPress={()=>navigation.navigate("DigitalTwin")}>
      <Image style={$coverImage} source={data.coverImage} resizeMode="contain" />
      <View style={$infoContainer}>
        <Text style={$nameText} text={data.name}/>
        <Text style={$operatorText} text={`${translate("common.formLabel.operator")}: ${data.operator}`}/>
        <Text style={$descriptionText} text={data.description} numberOfLines={2} ellipsizeMode="tail"/>
        {
          (data.digitalTwinStatus || data.tokenOperatorStatus) &&
          <View style={$buttonContainer}>
            {
              data.digitalTwinStatus &&
              <View style={$digitalTwinStatusContainer}>
                <Text style={$digitalTwinStatusText} tx={data.digitalTwinStatus}/>
              </View>
            }
            {
              data.tokenOperatorStatus &&
              <View style={$tokenOperatorStatusContainer}>
                <Text style={$tokenOperatorStatusText} text={translate(data.tokenOperatorStatus).toLocaleUpperCase()}/>
              </View>
            }
          </View>
        }
      </View>
    </TouchableOpacity>
  )
})

const {fontScale, width, height} = Dimensions.get('screen')

const $container: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 7,
  backgroundColor: '#E5E8E9',
  width: '100%',
  paddingRight: 10
}

const $coverImage: ImageStyle = {
  maxHeight: height*0.12,
  maxWidth: width*0.3,
}

const $infoContainer: ViewStyle = {
  flex: 1,
  marginLeft: 7
}

const $nameText: TextStyle = {
  fontWeight: 'bold'
}

const $operatorText: TextStyle = {
  fontSize: 12 / fontScale,
  fontWeight: 'bold',
  lineHeight: 14
}

const $descriptionText: TextStyle = {
  fontSize: 11 / fontScale,
  color: '#838D92',
  lineHeight: 14
}

const $buttonContainer: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 7,
  marginTop: 9
}

const $digitalTwinStatusContainer: ViewStyle = {
  backgroundColor: '#838D92',
  height: 25,
  width: 110,
  alignItems: 'center',
  justifyContent: 'center'
}

const $digitalTwinStatusText: TextStyle = {
  fontSize: 11 / fontScale,
  color: "white"
}

const $tokenOperatorStatusContainer: ViewStyle = {
  backgroundColor: 'white',
  height: 25,
  width: 80,
  alignItems: 'center',
  justifyContent: 'center'
}

const $tokenOperatorStatusText: TextStyle = {
  fontSize: 11 / fontScale,
  color: "#838D92",
  fontWeight: 'bold'
}