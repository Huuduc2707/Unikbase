import React, {useState} from "react"
import { StyleProp, TextStyle, ViewStyle, TouchableOpacity, FlatList, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { TextField } from "app/components/TextField"
import { Icon } from "app/components/Icon"
import Modal from "react-native-modal"
import countryCode from "../../assets/country-codes"
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
  const [itemList, setItemList] = useState(countryCode)
  const $styles = [$container, style]

  function getPhoneCodeChoice(flag: string, dialCode:string){
    setSelected(():phoneCodeProps=> {return{flag, dialCode}})
    setState(():boolean=>{return !state})
  }

  async function ListFilter(text: string){
    const newItemList = await countryCode.filter((item)=>item.name.toLowerCase().includes(text.toLowerCase()))
    if(newItemList.length === 0) setItemList(["No match found"])
    else setItemList(newItemList)
  }
  return (
    <Modal style={$styles} isVisible={state} animationIn={"slideInUp"} onBackdropPress={()=>setState(false)}>
      <TextField
        inputWrapperStyle={$searchBar}
        placeholderTx={"common.inputPlaceholder.countryName"}
        onChangeText={(text)=>ListFilter(text)}
        LeftAccessory={()=>(
          <Icon containerStyle={$searchIcon} icon="search" size={20}/>
        )}
      />
      <FlatList
        style={$flatList}
        keyExtractor={(item)=> item.countryCode}
        data={itemList}
        renderItem={
          itemList[0] !== "No match found"?
          ({item})=>
            <TouchableOpacity key={item.countryCode} style={$phoneCodeContainer} activeOpacity={0.3} onPress={()=>getPhoneCodeChoice(item.flag, item.dialCode)}>
              <Text text={`${item.flag}   `}/>
              <Text style={$text} text={`${item.name} (${item.dialCode})`}/>
            </TouchableOpacity>
          :
          ()=>
            <Text style={$errorText} tx={"common.error.noResultFound"}/>
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
  opacity: 0.9,
  width: '85%'
}

const $text: TextStyle = {
  fontSize: 15 / fontScale,
  color: 'black',
  width: '85%'
}

const $errorText: TextStyle = {
  fontSize: 15 / fontScale,
  color: 'black',
  textAlign: 'center',
  marginLeft: -10
}

const $flatList: ViewStyle = {
  flex: 1,
  marginLeft: 10
}

const $phoneCodeContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingVertical: 10
}

const $searchIcon: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginLeft: 10,
  marginRight: -5
}

const $searchBar: ViewStyle = {
  marginTop: 20,
  width: '90%',
  alignSelf: 'center',
  marginBottom: 10
}