/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TouchableOpacity,
  ImageStyle,
  TextStyle,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface VerifyNfcTagScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"VerifyNfcTag">> {}

export const VerifyNfcTagScreen: FC<VerifyNfcTagScreenProps> = observer(
  function VerifyNfcTagScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const navigation = useNavigation()
    const [isVerified, setIsVerified] = useState(false)
    const [isMatched, setIsMatched] = useState(true)

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
          <Text style={$title} tx={"mainpageNavigator.tabName.verifyNFCTag"} />
          <TouchableOpacity
            style={[$headerIconContainer2, { display: isVerified ? "flex" : "none" }]}
            activeOpacity={0.7}
            onPress={() => setIsVerified(false)}
          >
            <Icon style={$headerIcon2} icon="roundX2" />
          </TouchableOpacity>
        </View>

        {/* Main content */}
        <ScrollView
          style={$bodyContainer}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
        >
          {isVerified ? (
            <>
              <TouchableOpacity activeOpacity={0.7} onPress={() => setIsMatched(!isMatched)}>
                <Text style={$scanButton} tx={"mainpageNavigator.more.scanNFCTag.scanComplete"} />
              </TouchableOpacity>
              <Text style={$instructionText} tx={"mainpageNavigator.more.scanNFCTag.tagDetected"} />
              <View style={$mainContainer}>
                <View style={$tagContainer}>
                  <Icon style={$tagIcon} containerStyle={$tagIconContainer} icon="link" />
                  <View style={{ gap: 4 }}>
                    <Text style={$tagText} tx={"mainpageNavigator.more.scanNFCTag.uniqueID"} />
                    <Text style={[$tagText, { fontWeight: "bold" }]} text="04:AD:75:2B:11:F3:34" />
                  </View>
                </View>
                <View
                  style={[
                    $imageContainer2,
                    {
                      backgroundColor: isMatched ? "#E8F5E1" : "#FCD0BF",
                      borderColor: isMatched ? "#73BF44" : "#F24908",
                    },
                  ]}
                >
                  <Text
                    style={$imageText}
                    tx={
                      isMatched
                        ? "mainpageNavigator.more.scanNFCTag.matchScan"
                        : "mainpageNavigator.more.scanNFCTag.mismatchScan"
                    }
                  />
                  <View style={$imageBox2}>
                    <Image
                      style={$image2}
                      source={require("../../assets/images/coverChair.png")}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVerified(true)}>
                <Text style={$scanButton} tx={"mainpageNavigator.more.scanNFCTag.readyToScan"} />
              </TouchableOpacity>
              <Text style={$instructionText} tx={"common.textAndLink.verifyNFCTag"} />
              <View style={$imageContainer}>
                <View style={$imageBox}>
                  <Image
                    style={$image}
                    source={require("../../assets/images/coverChair.png")}
                    resizeMode="contain"
                  />
                </View>
                <View style={$imageBox}>
                  <Image
                    style={$image}
                    source={require("../../assets/images/coverChair.png")}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </Screen>
    )
  },
)

// Styling zone
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
  zIndex: 999,
}

const $headerIcon: ImageStyle = {
  width: 18 / fontScale,
  height: 18 / fontScale,
}

const $headerIconContainer2: ViewStyle = {
  position: "absolute",
  right: width * 0.04,
  zIndex: 2,
}

const $headerIcon2: ImageStyle = {
  width: 22 / fontScale,
  height: 22 / fontScale,
  tintColor: "white",
}

const $bodyContainer: ViewStyle = {
  backgroundColor: "white",
  marginTop: 22,
}

const $scanButton: TextStyle = {
  marginTop: 21,
  fontSize: 20 / fontScale,
  marginLeft: width * 0.04,
}

const $instructionText: TextStyle = {
  marginTop: 5,
  fontSize: 14 / fontScale,
  lineHeight: 18,
  marginLeft: width * 0.04,
  width: width * 0.85,
}

const $imageContainer: ViewStyle = {
  marginHorizontal: width * 0.04,
  gap: 19,
  marginTop: 22,
}

const $imageBox: ViewStyle = {
  borderWidth: 1,
  borderColor: "#041C25",
  justifyContent: "center",
  height: 200,
}

const $image: ImageStyle = {
  width: "100%",
  height: "95%",
}

const $mainContainer: ViewStyle = {
  marginTop: 26,
  marginHorizontal: width * 0.04,
  gap: 5,
}

const $tagContainer: ViewStyle = {
  backgroundColor: "#E5E8E9",
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

const $imageContainer2: ViewStyle = {
  paddingTop: 25,
  paddingBottom: 17,
  paddingHorizontal: 17,
  alignItems: "center",
  borderWidth: 1,
}

const $imageText: TextStyle = {
  fontSize: 15 / fontScale,
  textAlign: "center",
  width: "75%",
  lineHeight: 21,
}

const $imageBox2: ViewStyle = {
  marginTop: 21,
  backgroundColor: "white",
  width: "100%",
  maxHeight: height * 0.2,
  alignItems: "center",
  justifyContent: "center",
}

const $image2: ImageStyle = {
  maxWidth: width * 0.4,
  maxHeight: height * 0.2,
}
