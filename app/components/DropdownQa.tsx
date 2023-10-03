/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle, TouchableOpacity, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { Line } from "app/components/Line"
import { TxKeyPath } from "app/i18n"
import Animated, {withTiming, Easing, useSharedValue, useDerivedValue, useAnimatedStyle, interpolate} from "react-native-reanimated"

export interface QuestionAndAnswer{
  question: TxKeyPath
  answer: TxKeyPath
}

export interface DropdownQAProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  index?: number
  questionAndAnswer?: QuestionAndAnswer
}

/**
 * Describe your component here
 */
export const DropdownQA = observer(function DropdownQA(props: DropdownQAProps) {
  const { style, questionAndAnswer, index } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const animatedController = useSharedValue(0)
  const $styles = style

const rotation = useDerivedValue(()=>{
    return interpolate(animatedController.value, [0,360], [0,360])
  })

  const animatedStyle = useAnimatedStyle(()=>{
    return {transform: [{rotate: rotation.value + 'deg'}]}
  })

  const startAnimation = ()=>{
    setIsExpanded(!isExpanded)
    animatedController.value = withTiming(!isExpanded?-180:0, {duration: 200, easing: Easing.inOut(Easing.ease)})
  }

  const entering = (targetValues)=>{
    "worklet";
    const animations = {
      originY: withTiming(targetValues.targetOriginY, {duration: 300, easing: Easing.inOut(Easing.ease)}),
      opacity: withTiming(1, {duration: 300, easing: Easing.inOut(Easing.ease)})
    };

    const initialValues = {
      originY: targetValues.targetOriginY - 10,
      opacity: 0
    };

    return {
      initialValues,
      animations
    }
  }

  const exiting = (values)=>{
    "worklet";
    const animations = {
      originY: withTiming(values.currentOriginY-10, {duration: 300, easing: Easing.inOut(Easing.ease)}),
      opacity: withTiming(0, {duration: 0, easing: Easing.inOut(Easing.ease)})
    };

    const initialValues = {
      originY: values.currentOriginY,
      opacity: 1
    };

    return {
      initialValues,
      animations
    }
  }

  return (
    <View style={$styles}>
      <TouchableOpacity style={$headerContainer} activeOpacity={0.7} onPress={startAnimation}>
        <View style={$questionContainer}>
          <Text style={$questionIndex} text={`${index<10?0:null}${index}`} />
          <Text style={$question} tx={questionAndAnswer.question} />
        </View>
        <Animated.View style={animatedStyle}>
          <Icon style={$showAnswerIcon} icon="downArrow" />
        </Animated.View>
      </TouchableOpacity>
      <Line style={$line} />
      {
        isExpanded && 
        <Animated.View style={$answerContainer} entering={entering} exiting={exiting}>
          <Text style={$answer} tx={questionAndAnswer.answer} />
          <Line style={$line}/>
        </Animated.View>
      }
    </View>
  )
})


const {fontScale, width} = Dimensions.get('screen')

const $headerContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const $questionContainer: ViewStyle = {
  flexDirection: 'row'
}

const $questionIndex: TextStyle = {
  fontSize: 12 / fontScale,
  fontWeight: 'bold',
  marginRight: 23
}

const $question: TextStyle = {
  fontSize: 16 / fontScale,
  width: width*0.7,
  lineHeight: 20,
  fontWeight: 'bold',
  textAlignVertical: 'center'
}

const $showAnswerIcon: ImageStyle = {
  width: 18 / fontScale,
  height: 18 / fontScale
}

const $line: ViewStyle = {
  backgroundColor: '#001C26',
  borderColor: '#001C26',
  borderWidth: 0.7,
  marginTop: 14,
  marginBottom: 13
}

const $answerContainer: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}

const $answer: TextStyle = {
  fontSize: 15 / fontScale,
  textAlign: 'justify'
}