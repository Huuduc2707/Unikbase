/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, ImageStyle, TextStyle, Dimensions, StatusBar, ScrollView, Image, ImageSourcePropType } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button } from "app/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Formik } from "formik"
import Checkbox from "expo-checkbox"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SelectCoverImageScreenProps extends NativeStackScreenProps<AppStackScreenProps<"SelectCoverImage">> {}

export const SelectCoverImageScreen: FC<SelectCoverImageScreenProps> = observer(function SelectCoverImageScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation()
  const {bottom} = useSafeAreaInsets()

  const imageSource: ImageSourcePropType[] = [
    require("../../assets/images/chair.png"),
    require("../../assets/images/chair3.png"),
    require("../../assets/images/chair2.png"),
    require("../../assets/images/coverChair.png"),
  ]

  function submitHandler(values){
    console.log(imageSource[values.coverImage])
  }

  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("Gallery")}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.selectCoverImage"}/>
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={$bodyContentContainer} style={[$bodyContainer, {marginBottom: bottom}]}>
        <Text style={$subHeaderText} tx={"mainpageNavigator.tabName.chooseCoverImage"}/>
        <Formik
          initialValues={{coverImage: -1}}
          onSubmit={(values)=>submitHandler(values)}
        >
          {({handleSubmit, setFieldValue, values})=>(
            <View style={$chooseCoverImageSection}>
              <View style={$imageSection}>
                {
                  imageSource.map((value, index)=>(
                    <View key={index} style={$imageContainer}>
                      <Image style={$image} source={value} resizeMode="contain"/>
                      <View style={[$checkboxContainer, $checkboxBorder]}>
                        <Checkbox
                          style={[$checkbox, $checkboxBorder]}
                          color={values.coverImage===index?'black':'#E5E8E9'}
                          value={values.coverImage===index}
                          onValueChange={(status)=>!status?setFieldValue('coverImage', -1):setFieldValue('coverImage', index)}
                        />
                      </View>
                    </View>
                  ))
                }
              </View>
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
      </ScrollView>
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
  marginTop: 22,
  backgroundColor: 'white'
}

const $bodyContentContainer: ViewStyle = {
  flexGrow: 1,
  paddingVertical: 21,
  paddingHorizontal: width*0.04
}

const $subHeaderText: TextStyle = {
  fontSize: 16 / fontScale,
  fontWeight: 'bold'
}

const $chooseCoverImageSection: ViewStyle = {
  marginTop: 28
}

const $imageSection: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  columnGap: 14,
  rowGap: 13
}

const $imageContainer: ViewStyle = {
  borderWidth: 1,
  borderColor: '#E5E8E9',
  backgroundColor: '#E5E8E9',
  justifyContent: 'center',
  alignItems: 'center',
  width: 170,
  height: 130
}

const $image: ImageStyle = {
  maxWidth: 170,
  maxHeight: 130
}

const $checkbox: ViewStyle = {
  width: 33,
  height: 33
}

const $checkboxContainer: ViewStyle = {
  backgroundColor: 'white',
  width: 33,
  height: 33,
  position: 'absolute',
  top: 9,
  right: 9
}

const $checkboxBorder: ViewStyle = {
  borderRadius: 30,
  borderWidth: 0.7,
  borderColor: '#E5E8E9',
}

const $saveButton: ViewStyle = {
  width: 167,
  backgroundColor: "#F14300",
  marginTop: 28,
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