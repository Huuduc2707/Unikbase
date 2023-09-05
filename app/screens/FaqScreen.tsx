/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, View, TouchableOpacity, Dimensions, TextStyle, ImageStyle, FlatList } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, QuestionAndAnswer, DropdownQA } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
// import { useStores } from "app/models"

interface FaqScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Faq">> {}

export const FaqScreen: FC<FaqScreenProps> = observer(function FaqScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation()
  const {bottom} = useSafeAreaInsets()

  const QA:QuestionAndAnswer[] = [
    {question: "mainpageNavigator.more.FAQ.question.question1", answer: "mainpageNavigator.more.FAQ.answer.shortAnswer"},
    {question: "mainpageNavigator.more.FAQ.question.question2", answer: "mainpageNavigator.more.FAQ.answer.mediumAnswer"},
    {question: "mainpageNavigator.more.FAQ.question.question3", answer: "mainpageNavigator.more.FAQ.answer.longAnswer"},
    {question: "mainpageNavigator.more.FAQ.question.question4", answer: "mainpageNavigator.more.FAQ.answer.longAnswer"},
    {question: "mainpageNavigator.more.FAQ.question.question5", answer: "mainpageNavigator.more.FAQ.answer.shortAnswer"},
    {question: "mainpageNavigator.more.FAQ.question.question6", answer: "mainpageNavigator.more.FAQ.answer.mediumAnswer"},
    {question: "mainpageNavigator.more.FAQ.question.question7", answer: "mainpageNavigator.more.FAQ.answer.mediumAnswer"},
    {question: "mainpageNavigator.more.FAQ.question.question8", answer: "mainpageNavigator.more.FAQ.answer.shortAnswer"},
    {question: "mainpageNavigator.more.FAQ.question.question9", answer: "mainpageNavigator.more.FAQ.answer.longAnswer"},
  ]

  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity style={$headerIconContainer} activeOpacity={0.7} onPress={()=>navigation.navigate("MainPage", {screen: "More"})}>
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.FAQ"}/>
      </View>

      {/* Main content */}
      <View style={$bodyContainer}>
        <Text style={$subHeaderText} tx={"mainpageNavigator.more.FAQ.frequentlyAskedQuestion"}/>
        <Text style={$introText} tx={"mainpageNavigator.more.FAQ.introText"}/>
        <FlatList
          style={[$QASection, {marginBottom: bottom}]}
          data={QA}
          keyExtractor={(_, index)=>`${index}`}
          renderItem={({item, index})=>(
            <DropdownQA key={index} index={index+1} questionAndAnswer={item} />
         )}
        >
        </FlatList>
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
  width: 18 / fontScale,
  height: 18 / fontScale
}

const $bodyContainer: ViewStyle = {
  flex: 1,
  backgroundColor: 'white',
  marginTop: 22,
  paddingHorizontal: width*0.04
}

const $subHeaderText: TextStyle = {
  marginTop: 21,
  fontSize: 20 / fontScale
}

const $introText: TextStyle = {
  marginTop: 21,
  fontSize: 15 / fontScale,
}

const $QASection: ViewStyle = {
  marginTop: 33
}