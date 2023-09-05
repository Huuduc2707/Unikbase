/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle, TouchableOpacity, ImageStyle, Animated, LayoutAnimation } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { Line } from "app/components/Line"
import { TxKeyPath } from "app/i18n"

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
  const animatedController = useRef(new Animated.Value(0)).current
  const $styles = style

  function ExpandAccordion(){
    Animated.timing(animatedController, {
      duration: 300,
      toValue: isExpanded?0:1,
      useNativeDriver: true
    }).start();
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        duration: 300,
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.easeInEaseOut
      },
      delete: {
        duration: 200,
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.easeInEaseOut
      }
    });
    setIsExpanded(!isExpanded)
  }

  const arrowTransform = animatedController.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg', '-180deg']
  })

  return (
    <View style={[$styles, {overflow: 'hidden'}]}>
      <TouchableOpacity style={$headerContainer} activeOpacity={0.7} onPress={ExpandAccordion}>
        <View style={$questionContainer}>
          <Text style={$questionIndex} text={`${index<10?0:null}${index}`} />
          <Text style={$question} tx={questionAndAnswer.question} />
        </View>
        <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
          <Icon style={$showAnswerIcon} icon="downArrow" />
        </Animated.View>
      </TouchableOpacity>
      <Line style={$line} />
      {
        isExpanded && 
        <View style={$answerContainer}>
          <Text style={$answer} tx={questionAndAnswer.answer} />
          <Line style={$line}/>
        </View>
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