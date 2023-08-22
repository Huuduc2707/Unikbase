import * as React from "react"
import { TextStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { TxKeyPath } from "app/i18n"
import I18n from "i18n-js"

interface PlaceholderStyle{
  [key: string]: TextStyle
}

export interface I18NStyleProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: TextStyle
  tx?: TxKeyPath
  txOptions?: I18n.InterpolateOptions
  txPlaceholderStyle?: PlaceholderStyle
}

/**
 * Describe your component here
 */
export const I18NStyle = observer(function I18NStyle(props: I18NStyleProps) {
  const { style, tx, txOptions, txPlaceholderStyle } = props
  const $styles = [$text, style]
  const placeholders = Object.entries(txOptions)
  const placeholderStyles = txPlaceholderStyle? Object.entries(txPlaceholderStyle):null
  let str = I18n.t(tx)
  const placeholdersInString = str.match(/(\[missing )*{{.*?}}( value\])*/g)
  const arr = []

  function keyExtractor(str: string): string{
    for(const placeholder of placeholders){
      if(str.includes(placeholder[0])) return placeholder[1]
    }
    return ""
  }

  function styleExtractor(str: string): TextStyle{
    for(const placeholderstyle of placeholderStyles){
      if(str.includes(placeholderstyle[0])) return placeholderstyle[1]
    }
    return null
  }

  placeholdersInString.forEach((value, index)=>{
    const placeholderIndex = str.indexOf(value)
    const text = str.slice(0, placeholderIndex)
    str = str.slice(placeholderIndex + value.length)
    if(index < placeholdersInString.length - 1) arr.push(text, value)    
    else arr.push(text, value, str)
  })

  return (
   <Text style={$styles}>
    {
      arr.map((value)=>{
        if(/(\[missing )*{{.*?}}( value\])*/g.test(value)) return <Text style={styleExtractor(value)}>{keyExtractor(value)}</Text>
        else return <Text>{value}</Text>
      })
    }
   </Text>
  )
})


const $text: TextStyle = {
  fontSize: 14,
  fontWeight: 'normal'
}
