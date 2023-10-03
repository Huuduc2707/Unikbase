import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, TouchableOpacity, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Line } from "./Line"
import { TxKeyPath } from "app/i18n"
import { useNavigation } from "@react-navigation/native"

export interface FieldContent{
  label: TxKeyPath
  content: string
}

export interface FieldHeaderBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  headerTextStyle?: StyleProp<TextStyle>
  tx?: TxKeyPath
  destinationSreen?: string
  fieldContent?: FieldContent[]
  lineBetweenContent?: boolean
}

/**
 * Describe your component here
 */
export const FieldHeaderBar = observer(function FieldHeaderBar(props: FieldHeaderBarProps) {
  const { style, tx, destinationSreen, fieldContent, lineBetweenContent, headerTextStyle } = props
  const navigation = useNavigation()

  return (
    <View style={style}>
      <View style={$headercontainer}>
        <View style={$header}>
          <Text style={[$headerLabel, headerTextStyle]} tx={tx}/>
          <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate(destinationSreen)}>
           {
            destinationSreen &&
            <Text style={[$editButton, headerTextStyle]} tx={"mainpageNavigator.profile.edit"}/>
           }
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {
          fieldContent &&
          fieldContent.map((value, index)=>(
            <View key={(index+1)*10}>
              {
                index !== 0 && lineBetweenContent && <Line style={$line}/>
              }
              <View style={$contentContainer}>
                <Text style={$label} tx={value.label} />
                <Text style={(index===fieldContent.length-1)?[$content, $marginToLabel]:(lineBetweenContent)?$content:[$content, $marginToContent]} text={value.content} />
              </View>
            </View>
          ))
        }
      </View>
    </View>
  )
})


const {fontScale} = Dimensions.get("screen")

const $headercontainer: ViewStyle = {
  backgroundColor: '#E5E8E9',
  paddingVertical: 16,
  marginBottom: 21
}

const $header: ViewStyle = {
  width: '90%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'center'
}

const $headerLabel: TextStyle = {
  fontSize: 20 / fontScale
}

const $editButton: TextStyle = {
  fontSize: 15 / fontScale,
  textDecorationLine: 'underline'
}

const $line: ViewStyle = {
  width: '90%',
  backgroundColor: '#E5E8E9',
  borderColor: '#E5E8E9',
  borderWidth: 0.7,
  alignSelf: 'center',
  marginVertical: 11
}

const $contentContainer: ViewStyle = {
  width: '90%',
  alignSelf: 'center'
}

const $label: TextStyle = {
  fontSize: 14 / fontScale,
  color: '#838D92',
  lineHeight: 15
}

const $content: TextStyle = {
  fontSize: 14 / fontScale
}

const $marginToLabel: ViewStyle = {
  marginBottom: 24
}

const $marginToContent: ViewStyle = {
  marginBottom: 15
}