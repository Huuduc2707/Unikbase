/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, Dimensions, TextStyle, View, ScrollView, ImageStyle } from "react-native"
import { Screen, Text, Icon, FieldHeaderBar, FieldContent } from "app/components"
import { TxKeyPath } from "app/i18n"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface Content{
  fieldLabel: TxKeyPath
  fieldContent: FieldContent[]
}

interface ProfileScreenProps {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const destinationSreen: string[] = ["Details", "ChangePassword", "Language", "Account"]
  const content: Content[] = [
    {
      fieldLabel: "mainpageNavigator.profile.headerBarLabel.details",
      fieldContent: [
        {label: "common.formLabel.username", content: "John doe"},
        {label: "common.formLabel.email", content: "john.doe@gmail.com"},
        {label: "common.formLabel.mobilePhone", content: "+00 123456789"}
      ],
    },
    {
      fieldLabel: "mainpageNavigator.profile.headerBarLabel.password",
      fieldContent: [
        {label: "common.formLabel.password", content: "Johndoe@123".replace(/./g, '*')}
      ]
    },
    {
      fieldLabel: "mainpageNavigator.profile.headerBarLabel.language",
      fieldContent: [
        {label: "common.formLabel.language", content: "English"},
        {label: "common.formLabel.unit", content: "Metric"}
      ]
    },
    {
      fieldLabel: "mainpageNavigator.profile.headerBarLabel.account",
      fieldContent: [
        {label: "common.formLabel.account", content: "Active"}
      ]
    }
  ]

  return (
    <Screen style={$root} preset="fixed">
      {/* Screen title */}
      <Text style={$title} tx={"mainpageNavigator.tabName.profile"} />

      {/* Main content */}
      <ScrollView contentContainerStyle={$bodyContainer}>
        {/* Header */}
        <View>
          <View style={$headerContainer}>
            <Icon style={$roundLogo} icon="roundLogo" />
            <View>
              <Text style={$headerNameText} text="John Doe"/>
              <Text style={$headerEmailText} text="forifthemailaddressislong@gmail.com" numberOfLines={1} ellipsizeMode="tail" />
            </View>
          </View>
        </View>
        
        {/* Content */}
        <View>
          {
            content.map((value, index)=>(
              <FieldHeaderBar 
                key={index} 
                tx={value.fieldLabel} 
                destinationSreen={destinationSreen[index]} 
                fieldContent={value.fieldContent}
                lineBetweenContent={index===0}
              />
            ))
          }
        </View>
      </ScrollView>
    </Screen>
  )
})



// Styling zone
const {fontScale, height, width} = Dimensions.get("screen")
const $root: ViewStyle = {
  flex: 1,
  backgroundColor: '#041C25',
  alignItems: 'center',
  marginTop: StatusBar.currentHeight
}

const $title: TextStyle = {
  color: 'white',
  fontSize: 25 / fontScale,
  lineHeight: 25,
  marginTop: height*0.06,
  alignSelf: 'center',
  paddingBottom: 26
}

const $bodyContainer: ViewStyle = {
  flexGrow: 1,
  backgroundColor: 'white',
  width: width,
  paddingBottom: 10
}

const $headerContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 17
}

const $roundLogo: ImageStyle = {
  width: 60 / fontScale,
  height: 60 / fontScale,
  marginHorizontal: 17
}

const $headerNameText: TextStyle = {
  fontSize: 20 / fontScale
}

const $headerEmailText: TextStyle = {
  fontSize: 16 / fontScale,
  width: width*0.7
}