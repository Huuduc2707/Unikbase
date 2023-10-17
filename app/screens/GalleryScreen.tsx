/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, ImageStyle, TextStyle, Dimensions, StatusBar, ScrollView, ImageSourcePropType } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, ImageBox } from "app/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import * as ImagePicker from "expo-image-picker"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface GalleryScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Gallery">> {}

export const GalleryScreen: FC<GalleryScreenProps> = observer(function GalleryScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const {bottom} = useSafeAreaInsets()
  const navigation = useNavigation()

  const imageSource: ImageSourcePropType[] = [
    require("../../assets/images/chair.png"),
    require("../../assets/images/chair3.png"),
    require("../../assets/images/chair2.png"),
    require("../../assets/images/coverChair.png"),
  ]

  return (
   <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("DigitalTwin")}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.gallery"}/>
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={$bodyContentContainer} style={[$bodyContainer, {marginBottom: bottom}]}>
        <View style={$subHeader}>
          <Text style={$subHeaderText} tx={"common.formLabel.coverImage"}/>
          <TouchableOpacity style={$changeButton} activeOpacity={0.7} onPress={()=>navigation.navigate("SelectCoverImage")}>
            <Text style={$changeButtonText} tx={"common.button.change"}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate("ImageDetail")}>
          <ImageBox source={require('../../assets/images/coverChair.png')}/>
        </TouchableOpacity>
        <Text style={[$subHeaderText, {marginTop: 45}]} tx={"mainpageNavigator.tabName.galleryImage"}/>
        <View style={$galleryImageSection}>
          {
            imageSource.map((value, index)=>(
              <TouchableOpacity key={index} activeOpacity={0.7} onPress={()=>navigation.navigate("ImageDetail")}>
                <ImageBox source={value}/>
              </TouchableOpacity>
            ))
          }
          <TouchableOpacity style={$addButton} activeOpacity={0.7} onPress={async()=>{
              const image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
              })
              if(!image.canceled) console.log(image.assets[0].uri)
            }}
          >
            <Icon style={$addIcon} icon="add"/>
            <Text style={$addText} tx={"common.button.addPhoto"}/>
          </TouchableOpacity>
        </View>
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

const $subHeader: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 18
}

const $subHeaderText: TextStyle = {
  fontSize: 20 / fontScale,
  fontWeight: 'bold'
}

const $changeButton: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center'
}

const $changeButtonText: TextStyle = {
  fontSize: 16 / fontScale,
  textDecorationLine: 'underline'
}

const $galleryImageSection: ViewStyle = {
  marginTop: 18,
  flexDirection: 'row',
  flexWrap: 'wrap',
  columnGap: 14,
  rowGap: 13
}

const $addButton: ViewStyle = {
  width: 170,
  height: 130,
  borderWidth: 1,
  borderColor: '#E5E8E9',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 12
}

const $addIcon: ImageStyle = {
  tintColor: 'black',
  width: 28,
  height: 28
}

const $addText: TextStyle = {
  fontWeight: 'bold'
}