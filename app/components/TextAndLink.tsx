import * as React from "react"
import { StyleProp, TextStyle, Dimensions, TouchableOpacity, GestureResponderEvent } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { TxKeyPath } from "app/i18n"
import I18n from "i18n-js"

export interface TextAndLinkProps {
  textStyle?: StyleProp<TextStyle>
  linkStyle?: StyleProp<TextStyle>
  text?: string
  link?: string
  tx?: TxKeyPath
  txOptions?: I18n.TranslateOptions
  txLink?: TxKeyPath
  txLinkOptions?: I18n.TranslateOptions
  noTrailingSpace?: boolean
  linkBeforeText?: boolean
  onLinkPress?: (event: GestureResponderEvent) => void
  activeOpacity?: number
}

/**
 * Describe your component here
 */
export const TextAndLink = observer(function TextAndLink(props: TextAndLinkProps) {
  const { textStyle, linkStyle, text, link, tx, txLink, txOptions, txLinkOptions, noTrailingSpace, linkBeforeText, onLinkPress, activeOpacity } = props
  const $textStyle = [$text, textStyle]
  const $linkStyle = [$link, $text, linkStyle]
  
  return (
    linkBeforeText?
      <>
        {(link||txLink)?
          <>
            <TouchableOpacity activeOpacity={activeOpacity||0.7} onPress={onLinkPress}>
              <Text style={$linkStyle} tx={txLink} text={link} txOptions={txLinkOptions}/>
            </TouchableOpacity>
            <Text style={$textStyle} text=" "/>
          </>
          :
          null
        }
        {(text||tx)?
          <>
            <Text style={$textStyle} tx={tx} text={text} txOptions={txOptions} />
            <Text style={$textStyle} text={noTrailingSpace?null:" "} />
          </>
          : 
          null
        }
      </>
      :
      <>
        {(text||tx)?
          <>
            <Text style={$textStyle} tx={tx} text={text} txOptions={txOptions} />
            <Text style={$textStyle} text=" " />
          </>
          : 
          null
        }
        {(link||txLink)?
          <>
            <TouchableOpacity activeOpacity={activeOpacity||0.7} onPress={onLinkPress}>
              <Text style={$linkStyle} tx={txLink} text={link} txOptions={txLinkOptions}/>
            </TouchableOpacity>
            <Text style={$textStyle} text={noTrailingSpace?null:" "}/>
          </>
          :
          null
        }
      </>
  )
})

const {fontScale} = Dimensions.get('window')

const $text: TextStyle = {
  fontSize: 12 / fontScale
}

const $link: TextStyle = {
  color: 'blue',
  textDecorationLine: 'underline',
  padding: 0
}
