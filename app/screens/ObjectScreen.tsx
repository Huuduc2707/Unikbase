/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, ImageStyle, TextStyle, Dimensions, StatusBar } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
// import { useStores } from "app/models"

interface ObjectScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Object">> {}

export const ObjectScreen: FC<ObjectScreenProps> = observer(function ObjectScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation()

  function submitHandler(values){
    console.log(values.name)
    console.log(values.description)
  }

  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("DigitalTwin")}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.object"}/>
      </View>

      {/* Body */}
      <View style={$bodyContainer}>
        <Text  style={$subHeaderText} tx={"mainpageNavigator.tabName.detail"}/>
        <Formik
          initialValues={{name: "Sleigh Baumann", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo ligula, aliquet sed vulputate in, fringilla sed est. Vestibulum sem orci, porta eu viverra ac, finibus non dui. Curabitur vulputate, libero a efficitur accumsan, arcu odio tincidunt tellus, vitae ultrices elit nibh vel risus. Curabitur finibus elit elit, a semper eros vulputate sit amet. Integer laoreet id neque vitae vestibulum. Aliquam vitae dictum risus, eu lacinia elit. Pellentesque euismod id sapien semper sollicitudin. Vivamus est sem, pharetra eget sapien interdum, congue blandit metus. Mauris pulvinar dui ac aliquet euismod."}}
          onSubmit={(values)=>submitHandler(values)}
        >
          {({handleSubmit, handleChange, values})=>(
            <View style={$inputFieldContainer}>
              <TextField 
                labelTx={"common.formLabel.name"}
                LabelTextProps={{style: $labelText}}
                value={values.name}
                onChangeText={handleChange('name')}
              />
              <TextField
                style={$inputField}
                labelTx={"common.formLabel.description"}
                LabelTextProps={{style: $labelText}}
                value={values.description}
                onChangeText={handleChange('description')}
                multiline={true}
              />
              <Button 
                style={$saveButton} 
                tx={"common.button.save"} 
                textStyle={$buttonText} 
                pressedStyle={$buttonPressed} 
                onPress={()=>handleSubmit()}
              />
            </View>
          )}
        </Formik>
      </View>
    </Screen>
  )
})



// Styling zone

const {fontScale, width, height} = Dimensions.get('screen')

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: '#041C25',
  alignItems: 'center',
  marginTop: StatusBar.currentHeight
}

const $headerContainer: ViewStyle = {
  justifyContent: 'center',
  width: width,
  marginTop: height*0.06
}

const $title: TextStyle = {
  color: 'white',
  fontSize: 25 / fontScale,
  lineHeight: 30,
  textAlign: 'center',
  textAlignVertical: 'center'
}

const $headerIconContainer: ViewStyle = {
  position: 'absolute',
  left: width*0.04,
  zIndex: 2
}

const $headerIcon: ImageStyle = {
  width: 18,
  height: 18
}

const $bodyContainer: ViewStyle = {
  flex: 1,
  marginTop: 22,
  paddingTop: 21,
  paddingHorizontal: width*0.04,
  backgroundColor: 'white'
}

const $subHeaderText: TextStyle = {
  fontSize: 20 / fontScale,
  fontWeight: "bold",
  marginBottom: 21
}

const $inputFieldContainer: ViewStyle = {
  gap: 8
}

const $labelText: TextStyle = {
  marginBottom: 8,
  color: '#838D92',
  fontSize: 15 / fontScale
}

const $inputField: TextStyle = {
  height: '100%'
}

const $saveButton: ViewStyle = {
  width: 167,
  backgroundColor: "#F14300",
  marginTop: 33,
  marginBottom: height*0.015,
  alignSelf: 'flex-end'
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center',
  lineHeight: 18
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}