import React, {useState} from "react"
import { StyleProp, TextProps, ViewStyle, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { TextField } from "app/components/TextField"
import { Icon } from "app/components/Icon"
import { TxKeyPath } from "app/i18n"

export interface PasswordInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  status?: "error" | "disabled"
  placeholderTx?: TxKeyPath
  helperTx?: TxKeyPath
  helperTextProps?: TextProps
  labelTx?: TxKeyPath
  labelTextProps?: TextProps
  value?: string
  onChangeText?: (text: string)=>void
  iconStyle?: ImageStyle
}

/**
 * Describe your component here
 */
export const PasswordInput = observer(function PasswordInput(props: PasswordInputProps) {
  const { style, status, placeholderTx, helperTx, helperTextProps, value, onChangeText, iconStyle, labelTx, labelTextProps } = props
  const [isHidden, setIsHidden] = useState(true)
  const $styles = [$container, style]
  const $iconStyle = [$viewIcon, iconStyle]

  return (
    <TextField
      status={status}
      inputWrapperStyle={$styles}
      placeholderTx={placeholderTx}
      helperTx={helperTx}
      HelperTextProps={helperTextProps}
      labelTx={labelTx}
      LabelTextProps={labelTextProps}
      secureTextEntry={isHidden} 
      value={value} 
      onChangeText={onChangeText}
      RightAccessory={()=>
        <Icon 
          style={[$iconStyle, status==="error"?$errorIcon:null]} 
          icon={isHidden?"view":"hidden"} 
          onPress={()=>setIsHidden(!isHidden)}
        />
      } 
    />
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $viewIcon: ImageStyle = {
  marginRight: 10,
  marginVertical: '21%'
}

const $errorIcon: ImageStyle = {
  tintColor: 'red'
}
