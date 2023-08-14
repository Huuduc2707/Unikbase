import * as React from "react"
import { StyleProp, TextStyle, ViewStyle, TouchableOpacity, FlatList, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import Modal from "react-native-modal"
import countryCode from "../../assets/country-codes"
import CountryFlag from "react-native-country-flag"
import { phoneCodeProps } from "./PhoneCodePicker"

export interface PhoneCodeModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  state: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
  setSelected: React.Dispatch<React.SetStateAction<phoneCodeProps>>
}

/**
 * Describe your component here
 */
export const PhoneCodeModal = observer(function PhoneCodeModal(props: PhoneCodeModalProps) {
  const { style, state, setState, setSelected } = props
  const $styles = [$container, style]

  function getPhoneCodeChoice(countryCode: string, dialCode:string){
    setSelected(():phoneCodeProps=> {return{countryCode, dialCode}})
    setState(():boolean=>{return !state})
  }

  return (
    <Modal style={$styles} isVisible={state} animationIn={"slideInUp"} animationInTiming={1000} propagateSwipe={true}>
      <FlatList 
        style={$flatList}
        data={countryCode}
        renderItem={({item})=>
          <TouchableOpacity style={$phoneCodeContainer} onPress={()=>getPhoneCodeChoice(item.countryCode, item.dialCode)}>
            <CountryFlag isoCode={item.countryCode} size={16}/>
            <Text style={$text} text={`${item.name} ${item.dialCode}`}/>
          </TouchableOpacity>
        }
      />
    </Modal>
  )
})

const {fontScale} = Dimensions.get('window')

const $container: ViewStyle = {
  justifyContent: 'center',
  alignSelf: 'center',
  borderWidth: 1,
  borderColor: 'black',
  backgroundColor: 'white',
  opacity: 0.9
}

const $text: TextStyle = {
  fontSize: 15 / fontScale,
  color: 'black',
  width: '85%'
}

const $flatList: ViewStyle = {
  marginLeft: 10
}

const $phoneCodeContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginVertical: 10,
  gap: 20
}
