/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  ImageStyle,
  TextStyle,
  Image,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Line, Button, UploadTagImageModal } from "app/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface NfcLinkScreenProps extends NativeStackScreenProps<AppStackScreenProps<"NfcLink">> {}

export const NfcLinkScreen: FC<NfcLinkScreenProps> = observer(function NfcLinkScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { bottom } = useSafeAreaInsets()
  const navigation = useNavigation()
  const [isUploadTagImageModalVisible, setIsUploadTagImageModalVisible] = useState(false)

  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity
          style={$headerIconContainer}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Icon style={$headerIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.nfcLink"} />
      </View>

      {/* Main content */}
      <ScrollView
        style={[$bodyContainer, { marginBottom: bottom }]}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: width * 0.04,
        }}
      >
        <Text style={$scanCompleteText} tx={"mainpageNavigator.more.scanNFCTag.scanComplete"} />
        <Text style={$informText} tx={"mainpageNavigator.more.scanNFCTag.tagDetected"} />
        <View style={$mainContainer}>
          <View style={$tagContainer}>
            <Icon style={$tagIcon} containerStyle={$tagIconContainer} icon="link" />
            <View style={{ gap: 4 }}>
              <Text style={$tagText} tx={"mainpageNavigator.more.scanNFCTag.uniqueID"} />
              <Text style={[$tagText, { fontWeight: "bold" }]} text="04:AD:75:2B:11:F3:34" />
            </View>
          </View>
          <Line />
          <View style={$imageContainer}>
            <Text style={$imageText} tx={"mainpageNavigator.more.scanNFCTag.linkNow"} />
            <Text style={$imageText} text="[tokenName]" />
            <View style={$imageBox}>
              <Image
                style={$image}
                source={require("../../assets/images/coverChair.png")}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <View style={$textContainer}>
          <Text style={$text} tx={"mainpageNavigator.more.scanNFCTag.scanInstruction"} />
          <Line style={$line} />
          <Text style={$text} tx={"mainpageNavigator.more.scanNFCTag.scanReminder"} />
        </View>
        <Button
          tx={"common.button.startLinkingProcess"}
          style={$startLinkingButton}
          textStyle={$buttonText}
          pressedStyle={$buttonPressed}
          onPress={() => setIsUploadTagImageModalVisible(true)}
        />
      </ScrollView>
      <UploadTagImageModal
        visibility={isUploadTagImageModalVisible}
        setVisibility={setIsUploadTagImageModalVisible}
      />
    </Screen>
  )
})

//* Styling zone
const { fontScale, height, width } = Dimensions.get("screen")

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#041C25",
  alignItems: "center",
  marginTop: StatusBar.currentHeight,
}

const $headerContainer: ViewStyle = {
  justifyContent: "center",
  width: width,
  marginTop: height * 0.06,
}

const $title: TextStyle = {
  color: "white",
  fontSize: 25 / fontScale,
  lineHeight: 30,
  textAlign: "center",
  textAlignVertical: "center",
}

const $headerIconContainer: ViewStyle = {
  position: "absolute",
  left: width * 0.04,
  zIndex: 2,
}

const $headerIcon: ImageStyle = {
  width: 18 / fontScale,
  height: 18 / fontScale,
}

const $bodyContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "white",
  marginTop: 22,
}

const $scanCompleteText: TextStyle = {
  marginTop: 27,
  fontSize: 22 / fontScale,
}

const $informText: TextStyle = {
  marginTop: 12,
  fontSize: 15 / fontScale,
  lineHeight: 15,
}

const $mainContainer: ViewStyle = {
  backgroundColor: "#E5E8E9",
  marginTop: 26,
}

const $tagContainer: ViewStyle = {
  padding: 7,
  flexDirection: "row",
  alignItems: "center",
  gap: 17,
}

const $tagIcon: ImageStyle = {
  width: 75,
  height: 75,
}

const $tagIconContainer: ViewStyle = {
  backgroundColor: "white",
  padding: 8,
}

const $tagText: TextStyle = {
  fontSize: 17 / fontScale,
}

const $imageContainer: ViewStyle = {
  paddingTop: 25,
  paddingBottom: 17,
  paddingHorizontal: 17,
  alignItems: "center",
}

const $imageText: TextStyle = {
  fontSize: 15 / fontScale,
}

const $imageBox: ViewStyle = {
  marginTop: 21,
  backgroundColor: "white",
  width: "100%",
  maxHeight: height * 0.2,
  alignItems: "center",
  justifyContent: "center",
}

const $image: ImageStyle = {
  maxWidth: width * 0.4,
  maxHeight: height * 0.2,
}

const $textContainer: ViewStyle = {
  marginTop: 25,
}

const $text: TextStyle = {
  fontSize: 15 / fontScale,
  lineHeight: 20,
}

const $line: ViewStyle = {
  backgroundColor: "#E5E8E9",
  borderColor: "#E5E8E9",
  borderWidth: 0.7,
  marginTop: 14,
  marginBottom: 16,
}

const $startLinkingButton: ViewStyle = {
  backgroundColor: "#DB5125",
  width: "100%",
  marginTop: 44,
  height: 44,
  maxHeight: 44,
}

const $buttonText: TextStyle = {
  color: "white",
  fontSize: 16 / fontScale,
  lineHeight: 19,
  fontWeight: "bold",
  textAlignVertical: "center",
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#DB5125",
  opacity: 0.7,
}
