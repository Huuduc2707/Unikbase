/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, ImageStyle, TextStyle, Dimensions, StatusBar, Image } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Line, ImageBox } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ImageDetailScreenProps extends NativeStackScreenProps<AppStackScreenProps<"ImageDetail">> {}

export const ImageDetailScreen: FC<ImageDetailScreenProps> = observer(function ImageDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation()
  
  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("Gallery")}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.updatedDate"} txOptions={{date: new Date('2023-04-04').toLocaleDateString('en-GB', {year: 'numeric', month: 'short', day: 'numeric'})}}/>
      </View>

      {/* Body */}
      <View style={$bodyContainer}>
        <ImageBox style={$imageContainer} imageStyle={$image} source={require("../../assets/images/chair.png")}/>
        <Line style={$line}/>
        <View style={$captionSection}>
          <View style={$captionHeader}>
            <Text style={$captionHeaderText} tx={"common.formLabel.caption"}/>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={$editCaptionAndDeletePhotoButton} tx={"mainpageNavigator.profile.edit"}/>
            </TouchableOpacity>
          </View>
          <Text text="Sleigh Baumann Chair angle"/>
          <Line style={[$line, {marginTop: 22, marginBottom: 33}]}/>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={$editCaptionAndDeletePhotoButton} tx={"common.button.deletePhoto"}/>
          </TouchableOpacity>
        </View>
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
  backgroundColor: 'white'
}

const $imageContainer: ViewStyle = {
  width: '80%',
  height: '27%',
  alignSelf: 'center'
}

const $image: ImageStyle = {
  maxWidth: width*0.8*0.85,
  maxHeight: height*0.27
}

const $line: ViewStyle = {
  backgroundColor: '#E5E8E9',
  borderColor: '#E5E8E9',
  borderWidth: 0.8
}

const $captionSection: ViewStyle = {
  marginTop: 19,
  paddingHorizontal: width*0.04
}

const $captionHeader: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const $captionHeaderText: TextStyle = {
  color: '#838D92',
  fontSize: 15 / fontScale
}

const $editCaptionAndDeletePhotoButton: TextStyle = {
  textDecorationLine: 'underline',
  fontWeight: 'bold',
  fontSize: 15 / fontScale
}