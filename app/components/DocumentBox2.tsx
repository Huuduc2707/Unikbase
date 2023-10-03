/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from "react"
import { ImageSourcePropType, StyleProp, TextStyle, View, ViewStyle, Image, ImageStyle, Dimensions, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon, IconTypes } from "app/components/Icon"
import { TxKeyPath, translate } from "app/i18n"
import Animated, {Easing, withTiming} from "react-native-reanimated"

export interface DocumentBox2Props {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  category?: TxKeyPath
  image?: ImageSourcePropType
  documentName?: string
  fileName?: string
  createdDay?: Date
  setNewDocumentNameModalVisibility?: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteDocumentModalVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const DocumentBox2 = observer(function DocumentBox2(props: DocumentBox2Props) {
  const { style, category, image, documentName, fileName, createdDay, setDeleteDocumentModalVisibility, setNewDocumentNameModalVisibility } = props
  const [isToolbarVisible, setIsToolbarVisible] = useState(false)
  const $styles = [$container, style]

  const toolbarIcon: IconTypes[] = ["roundX2", "eye", "pencil", "download2", "trash"]
  
  const exiting = (values)=>{
    'worklet';
    const animations = {
      originX: withTiming(width*0.92/5*4, {duration: 400, easing: Easing.inOut(Easing.ease)}),
      opacity: withTiming(0, {duration: 400, easing: Easing.inOut(Easing.ease)})
    };
    const initialValues = {
      originX: values.currentOriginX,
      opacity: 1,
    };
    return {
      initialValues,
      animations,
    };
  }

  const entering = (targetValues)=>{
    'worklet';
    const animations = {
      originX: withTiming(targetValues.targetOriginX, {duration: 400, easing: Easing.inOut(Easing.ease)}),
      opacity: withTiming(1, {duration: 400, easing: Easing.inOut(Easing.ease)})
    };
    const initialValues = {
      originX: width*0.92/5*4,
      opacity: 0,
    };
    return {
      initialValues,
      animations,
    };
  }

  function formatDate(date: Date): string{
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(monthsDifference / 12);
    if (yearsDifference > 0) {
      return yearsDifference === 1 ? '1 year ago' : `${yearsDifference} years ago`;
    } 
    if (monthsDifference > 0) {
      return monthsDifference === 1 ? '1 month ago' : `${monthsDifference} months ago`;
    }
    if (daysDifference > 0) {
      return daysDifference === 1 ? '1 day ago' : `${daysDifference} days ago`;
    }
    if (hoursDifference > 0) {
      return hoursDifference === 1 ? '1 hour ago' : `${hoursDifference} hours ago`;
    }
    if (minutesDifference > 0) {
      return minutesDifference === 1 ? '1 minute ago' : `${minutesDifference} minutes ago`;
    }
    return secondsDifference <= 10 ? 'just now' : `${secondsDifference} seconds ago`;
  }

  function buttonClicked(index: number){
    switch(index){
      case 0: {
        setIsToolbarVisible(false)
        break
      }
      case 2: {
        setNewDocumentNameModalVisibility(true)
        break
      }
      case 4:{
        setDeleteDocumentModalVisibility(true)
        break
      }
    }
  }

  return (
    <View style={$styles}>
      <View style={$subContainer}>
        <Image style={$image} source={image!==undefined?image:require("../../assets/images/document.png")} resizeMode="contain"/>
        <View style={$textContainer}>
          <Text style={$documentName} text={documentName}/>
          <Text style={$fileName} text={fileName}/>
          <Text style={$categoryName} text={`${translate(category)}  |  ${formatDate(createdDay)}`}/>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsToolbarVisible(true)}>
        <Icon style={$icon} icon="roundMore"/>
      </TouchableOpacity>
      {
        isToolbarVisible &&
        <>
          <View style={$toolbarContainer}>
            {
              toolbarIcon.map((value, index)=>(
                <Animated.View
                  key={index} 
                  style={[
                    $toolbarButton, 
                    {backgroundColor:index===0?'#E5E8E9':'#041C25'},
                    {borderRightWidth: index===toolbarIcon.length-1?0:0.7}
                  ]}
                  entering={entering}
                  exiting={exiting}
                >
                  <TouchableOpacity
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}
                    activeOpacity={0.5} 
                    onPress={()=>buttonClicked(index)}
                  >
                    <Icon style={index===0?$toolbarTurnOffButtonIcon:$toolbarButtonIcon} icon={value}/>
                  </TouchableOpacity>
                </Animated.View>
              ))
            }
          </View>
        </>
      }
    </View>
  )
})

const {fontScale, width} = Dimensions.get('screen')

const $container: ViewStyle = {
  paddingVertical: 16,
  paddingHorizontal: 21,
  backgroundColor: '#E5E8E9',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const $subContainer: ViewStyle = {
  flexDirection: 'row'
}

const $image: ImageStyle = {
  maxWidth: 60,
  maxHeight: 50,
  alignSelf: 'center'
}

const $textContainer: ViewStyle = {
  marginLeft: 10
}

const $icon: ImageStyle = {
  width: 23,
  height: 23
}

const $documentName: TextStyle = {
  fontSize: 15 / fontScale,
  fontWeight: 'bold'
}

const $fileName: TextStyle = {
  fontSize: 13 / fontScale,
  color: '#838D92'
}

const $categoryName: TextStyle = {
  fontSize: 13 / fontScale,
  lineHeight: 15
}

const $toolbarContainer: ViewStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'row'
}

const $toolbarButton: ViewStyle = {
  width: width*0.92/5,
  borderRightColor: '#E5E8E9',
  alignItems: 'center',
  justifyContent: 'center'
}

const $toolbarButtonIcon: ImageStyle = {
  width: 90,
  height: 90,
}

const $toolbarTurnOffButtonIcon: ImageStyle = {
  width: 27,
  height: 27
}