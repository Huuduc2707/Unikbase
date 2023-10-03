/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, ScrollView, TouchableOpacity, ImageStyle, Dimensions, KeyboardAvoidingView, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { TextField } from "app/components/TextField"
import { Button } from "app/components/Button"
import Modal from "react-native-modal"
import { Formik } from "formik"
import { TxKeyPath, translate } from "app/i18n"
import DocumentPicker, {types} from "react-native-document-picker"
import Toast from "react-native-root-toast"

export interface AddDocumentModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const AddDocumentModal = observer(function AddDocumentModal(props: AddDocumentModalProps) {
  const { style, visibility, setVisibility } = props
  const [reRenderToggle, setReRenderToggle] = React.useState(false)
  const [isToastVisible, setIsToastVisible] = React.useState(false)
  const $styles = [$container, style]

  const category: TxKeyPath[] = [
    "mainpageNavigator.wallet.documentCategory.gallery3D",
    "mainpageNavigator.wallet.documentCategory.certificate",
    "mainpageNavigator.wallet.documentCategory.coverImage",
    "mainpageNavigator.wallet.documentCategory.gallery",
    "mainpageNavigator.wallet.documentCategory.invoice",
    "mainpageNavigator.wallet.documentCategory.markProof",
    "mainpageNavigator.wallet.documentCategory.otherDocument"
  ]

  function submitHandler(values){
    values.name.forEach((_, idx)=>{
      console.log(`${idx+1} form:`)
      console.log(`   -> ${values.name[idx]}`)
      console.log(`   -> ${translate(category[values.category[idx]])}`)
      console.log(`   -> ${values.document[idx]}`)
    })
  }

  function addForm(values){
    values.name.push("")
    values.category.push(-1)
    values.document.push("")
    setReRenderToggle(!reRenderToggle)
  }

  function removeForm(values, idx){
    if(values.name.length > 1){
      values.name.splice(idx, 1)
      values.category.splice(idx, 1)
      values.document.splice(idx, 1)
      setReRenderToggle(!reRenderToggle)
    }
    else{
      setIsToastVisible(true)
      setTimeout(()=>setIsToastVisible(false), 1500)
    }
  }

  return (
    <Modal style={$modal} isVisible={visibility} coverScreen={false} backdropTransitionOutTiming={0}>
      <Toast visible={isToastVisible} position={height*0.085} style={$toast} backgroundColor="#F2416D">
        <Text style={$toastText}tx={"common.error.noDocument"}/>
      </Toast>
      <View style={{flex: 1}}>
        <TouchableOpacity style={[$closeModalButton, {marginRight: width*0.04}]} activeOpacity={0.7} onPress={()=>setVisibility(false)}>
          <Icon style={[$closeModalIcon, {tintColor: 'white'}]} icon="roundX2"/>
        </TouchableOpacity>
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS==="android"?"padding":null} keyboardVerticalOffset={Platform.OS==="android"?80:0}>
          <ScrollView style={$styles} contentContainerStyle={$bodyContentContainer}>
            <Text style={$modalName} tx={"common.formName.uploadDocument"}/>
            <Formik
              initialValues={{name: [""], category: [-1], document: [""]}}
              onSubmit={(values)=>submitHandler(values)}
            >
              {({handleChange, setFieldValue, handleSubmit, values})=>(
                <View style={$formContainer}>
                  {
                    values.name.map((_, idx)=>(
                      <>
                        <View style={$inputFieldContainer}>
                          <TouchableOpacity style={$closeModalButton} activeOpacity={0.7} onPress={()=>removeForm(values, idx)}>
                            <Icon style={[$closeModalIcon, {tintColor: '#828C91'}]} icon="roundX2"/>
                          </TouchableOpacity>
                          <TextField
                            labelTx={"common.formLabel.name"}
                            LabelTextProps={{style: $formLabel}}
                            inputWrapperStyle={$inputField}
                            value={values.name[idx]}
                            onChangeText={handleChange(`name[${idx}]`)}
                          />
                          <View>
                            <Text style={$formLabel} tx={"common.formLabel.selectCategory"} preset="formLabel"/>
                            <View style={[$categoryContainer, $inputField]}>
                              {
                                category.map((value, index)=>(
                                  <TouchableOpacity 
                                    key={index} 
                                    style={[$categoryBox, {backgroundColor: values.category[idx]===index?'#F14300':'#E5E8E9'}]}
                                    activeOpacity={0.7}
                                    onPress={()=>values.category[idx]!==index?setFieldValue(`category[${idx}]`, index):setFieldValue(`category[${idx}]`, -1)}
                                  >
                                    <Text style={[$categoryText, {color: values.category[idx]===index?'white':'black'}]} tx={value}/>
                                  </TouchableOpacity>
                                ))
                              }
                            </View>
                          </View>
                          <View>
                            <Text style={$formLabel} tx={"common.formLabel.selectDocument"} preset="formLabel"/>
                            <TouchableOpacity activeOpacity={0.7} onPress={async (err: unknown)=> {
                                const document = await DocumentPicker.pickSingle({
                                  copyTo: "cachesDirectory",
                                  type: [types.images, types.pdf, types.doc, types.docx, types.plainText]
                                })
                                if(!DocumentPicker.isCancel(err)) setFieldValue(`document[${idx}]`, document.fileCopyUri)
                              }}
                            >
                              <TextField 
                                status="disabled"
                                inputWrapperStyle={$inputField}
                                value={values.document[idx]}
                                LeftAccessory={()=>(
                                  <Icon style={$documentIcon} icon="image"/>
                                )}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </>
                    ))
                  }
                  <View style={$buttonContainer}>
                    <Button 
                      style={$addButton} 
                      tx={"common.button.addMoreDocument"} 
                      textStyle={$buttonText} 
                      pressedStyle={$addButtonPressed} 
                      onPress={()=>addForm(values)}
                    />
                    <Button 
                      style={$uploadButton} 
                      tx={"common.button.uploadDocument"} 
                      textStyle={$buttonText} 
                      pressedStyle={$uploadButtonPressed}
                      onPress={()=>handleSubmit()}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
})

const {fontScale, height, width} = Dimensions.get("screen")

const $modal: ViewStyle = {
  width: '100%',
  alignSelf: 'center',
  marginTop: height*0.064,
  margin: 0
}

const $toast: ViewStyle = {
  width: '95%',
  height: height*0.05,
  borderRadius: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F2416D'
}

const $toastText: TextStyle = {
  color: 'white', 
  fontSize: 16 / fontScale,
  fontWeight: 'bold',
  lineHeight: 18
}

const $container: ViewStyle = {
  marginTop: 28,
  backgroundColor: 'white'
}

const $bodyContentContainer: ViewStyle = {
  flexGrow: 1,
  paddingTop: 19,
  paddingBottom: 40
}

const $closeModalButton: ViewStyle = {
  alignItems: 'flex-end'
}

const $closeModalIcon: ImageStyle = {
  width: 23,
  height: 23
}

const $modalName: TextStyle = {
  fontSize: 22 / fontScale,
  marginLeft: width*0.04
}

const $formContainer: ViewStyle = {
  marginTop: 20,
  marginHorizontal: 10,
  gap: 20
}

const $inputFieldContainer: ViewStyle = {
  backgroundColor: '#E5E8E9',
  paddingHorizontal: 8,
  paddingBottom: 21,
  paddingTop: 10
}

const $formLabel: TextStyle = {
  fontSize: 15 / fontScale,
  color: '#838D92',
  marginBottom: 8
}

const $inputField: ViewStyle = {
  marginBottom: 7,
  borderColor: 'black'
}

const $categoryContainer: ViewStyle = {
  backgroundColor: 'white',
  borderWidth: 1,
  paddingVertical: 22,
  paddingHorizontal: 17,
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 9
}

const $categoryBox: ViewStyle = {
  borderRadius: 100,
  paddingVertical: 7,
  paddingHorizontal: 15
}

const $categoryText: TextStyle = {
  fontSize: 15 / fontScale,
  lineHeight: 18
}

const $documentIcon: ImageStyle = {
  width: 27,
  height: 27,
  marginVertical: 5,
  marginLeft: 5
}

const $buttonContainer: ViewStyle = {
  marginTop: 40,
  gap: 10
}

const $addButton: ViewStyle = {
  backgroundColor: '#041C25B5'
}

const $uploadButton: ViewStyle = {
  backgroundColor: '#F14300'
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center',
  lineHeight: 18
}

const $addButtonPressed: ViewStyle = {
  backgroundColor: "#041C25B5",
  opacity: 0.7,
}

const $uploadButtonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}