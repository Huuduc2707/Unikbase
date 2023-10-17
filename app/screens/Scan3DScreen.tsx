/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TouchableOpacity,
  Image,
  ImageStyle,
  TextStyle,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
// import { useStores } from "app/models"

interface Scan3DScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Scan3D">> {}

export const Scan3DScreen: FC<Scan3DScreenProps> = observer(function Scan3DScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation()
  const { bottom } = useSafeAreaInsets()

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
        <Text style={$title} tx={"mainpageNavigator.wallet.feature.scan"} />
      </View>

      {/* Main content */}
      <ScrollView
        style={[$bodyContainer, { marginBottom: bottom }]}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <Text style={$subHeaderText} tx={"mainpageNavigator.wallet.feature.scan"} />
        <View style={$buttonContainer}>
          <Button
            style={$scanButton}
            tx={"common.button.scanObject3D"}
            textStyle={$buttonText}
            pressedStyle={$scanButtonPressed}
            onPress={() => navigation.navigate("Scanning")}
          />
          <Button
            style={$otherButton}
            tx={"common.button.selectImageFor3DScan"}
            textStyle={$buttonText}
            pressedStyle={$otherButtonPressed}
          />
          <Button
            style={$otherButton}
            tx={"common.button.upload3DScanFromAlbum"}
            textStyle={$buttonText}
            pressedStyle={$otherButtonPressed}
          />
        </View>
        <Image
          style={$image}
          source={require("../../assets/images/scan3D.png")}
          resizeMode="contain"
        />
        <Text style={$informText} tx={"common.textAndLink.scan3D"} />
        <TouchableOpacity style={$startTutorialButton} activeOpacity={0.7}>
          <Text style={$startTutorialText} tx={"common.button.startTutorial"} />
          <Icon style={$arrowIcon} containerStyle={$arrowIconContainer} icon="caretRight" />
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  )
})

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
  zIndex: 2,
}

const $headerIcon: ImageStyle = {
  width: 18 / fontScale,
  height: 18 / fontScale,
}

const $bodyContainer: ViewStyle = {
  backgroundColor: "white",
  marginTop: 22,
}

const $subHeaderText: TextStyle = {
  marginTop: 21,
  fontSize: 20 / fontScale,
  marginLeft: width * 0.04,
}

const $buttonContainer: ViewStyle = {
  marginTop: 23,
  paddingHorizontal: width * 0.02,
  alignItems: "center",
  gap: 10,
}

const $scanButton: ViewStyle = {
  width: "100%",
  backgroundColor: "#F14300",
}

const $otherButton: ViewStyle = {
  width: "100%",
  backgroundColor: "#041C25",
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: "center",
  lineHeight: 18,
}

const $scanButtonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}

const $otherButtonPressed: ViewStyle = {
  backgroundColor: "#041C25",
  opacity: 0.7,
}

const $image: ImageStyle = {
  width: "100%",
  height: height * 0.35,
  marginTop: 43,
}

const $informText: TextStyle = {
  marginTop: 29,
  textAlign: "center",
  fontSize: 15 / fontScale,
  width: width * 0.9,
  alignSelf: "center",
  lineHeight: 22,
}

const $startTutorialButton: ViewStyle = {
  marginTop: 23,
  alignSelf: "center",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: width * 0.42,
  maxWidth: 165,
}

const $startTutorialText: TextStyle = {
  fontSize: 17 / fontScale,
  fontWeight: "bold",
  paddingBottom: 4,
  borderBottomWidth: 3,
}

const $arrowIcon: ImageStyle = {
  width: 20,
  height: 20,
}

const $arrowIconContainer: ViewStyle = {
  position: "absolute",
  right: 0,
}
