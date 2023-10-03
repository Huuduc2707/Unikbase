import React from "react"
import { StyleProp, TextStyle, ViewStyle, ScrollView, TouchableOpacity, View, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Line } from "app/components/Line"
import Modal from "react-native-modal"
import { FormikErrors } from "formik"
import { TxKeyPath, translate } from "app/i18n"

export interface OperatorModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
  setNewValue?: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<{
    keyword: string;
    date: string;
    operator: string;
    digitalTwinStatus: number;
    tokenStatus: number;
    tokenOperatorStatus: number;
}>>
}

/**
 * Describe your component here
 */
export const OperatorModal = observer(function OperatorModal(props: OperatorModalProps) {
  const { style, visibility, setVisibility, setNewValue } = props
  const $styles = [$container, style]
  const operator: TxKeyPath[] = [
    "mainpageNavigator.wallet.operatorValue.topup",
    "mainpageNavigator.wallet.operatorValue.createWallet",
    "mainpageNavigator.wallet.operatorValue.createToken",
    "mainpageNavigator.wallet.operatorValue.acceptToken",
    "mainpageNavigator.wallet.operatorValue.transferTokenRequest",
    "mainpageNavigator.wallet.operatorValue.updateToken",
    "mainpageNavigator.wallet.operatorValue.create3DScan",
    "mainpageNavigator.wallet.operatorValue.operatorChange",
    "mainpageNavigator.wallet.operatorValue.bridgeEthereum"
  ]

  return (
    <Modal style={$styles} isVisible={visibility} backdropTransitionOutTiming={0} onBackdropPress={()=>setVisibility(false)} onBackButtonPress={()=>setVisibility(false)}>
      <ScrollView contentContainerStyle={$listContainer}>
        {
          operator.map((value, index)=>(
            <View key={index}>
              <TouchableOpacity style={$textContainer} activeOpacity={0.7} onPress={()=>{setVisibility(false); setNewValue('operator', translate(value))}}>
                <Text style={$text} tx={value}/>
              </TouchableOpacity>
              <Line style={$line}/>
            </View>
          ))
        }
      </ScrollView>
    </Modal>
  )
})

const {height} = Dimensions.get('screen')

const $container: ViewStyle = {
  width: '80%',
  justifyContent: 'center',
  alignSelf: 'center',
  paddingVertical: height*0.15
}

const $listContainer: ViewStyle = {
  backgroundColor: 'white',
  width: '100%'
}

const $textContainer: ViewStyle = {
  paddingVertical: 15,
  justifyContent: 'center'
}

const $line: ViewStyle = {
  backgroundColor: '#838D92',
  borderColor: '#838D92',
  borderWidth: 0.4
}

const $text: TextStyle = {
  marginLeft: 12
}