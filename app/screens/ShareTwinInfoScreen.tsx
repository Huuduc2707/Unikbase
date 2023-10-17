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
  Dimensions,
  StatusBar,
  ScrollView,
  ImageSourcePropType,
  Image,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import {
  Screen,
  Text,
  Icon,
  IconTypes,
  Button,
  Line,
  SocialMediaModal,
  ShareModal,
} from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TxKeyPath } from "app/i18n"
import Checkbox from "expo-checkbox"
import { Formik } from "formik"
// import { useStores } from "app/models"

interface HeaderBarSection {
  icon: IconTypes
  name: TxKeyPath
}

interface SubContent {
  image: ImageSourcePropType
  imageName: string
}

interface SettingConfig {
  name: TxKeyPath
  subContent?: SubContent[]
}

interface ShareTwinInfoScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"ShareTwinInfo">> {}

export const ShareTwinInfoScreen: FC<ShareTwinInfoScreenProps> = observer(
  function ShareTwinInfoScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const navigation = useNavigation()
    const { bottom } = useSafeAreaInsets()
    const [isShareModalVisible, setIsShareModalVisible] = useState(false)
    const [isSocialMediaModalVisible, setIsSocialMediaModalVisible] = useState(false)

    const headerBarSection: HeaderBarSection[] = [
      { icon: "private", name: "mainpageNavigator.wallet.sharingConfig.private" },
      { icon: "restricted", name: "mainpageNavigator.wallet.sharingConfig.restricted" },
      { icon: "public", name: "mainpageNavigator.wallet.sharingConfig.public" },
    ]
    const settingConfig: SettingConfig[] = [
      { name: "mainpageNavigator.wallet.sharingConfig.selectAll" },
      { name: "mainpageNavigator.wallet.sharingConfig.price" },
      { name: "mainpageNavigator.wallet.sharingConfig.creationDate" },
      { name: "mainpageNavigator.wallet.sharingConfig.dimension" },
      { name: "mainpageNavigator.wallet.sharingConfig.coverPhotoAndName" },
      {
        name: "mainpageNavigator.wallet.sharingConfig.gallery",
        subContent: [
          {
            image: require("../../assets/images/coverChair.png"),
            imageName: "Object-view-1-front.png",
          },
          { image: require("../../assets/images/chair.png"), imageName: "Object-view-1-side.png" },
        ],
      },
      {
        name: "mainpageNavigator.wallet.sharingConfig.gallery3D",
        subContent: [
          {
            image: require("../../assets/images/coverChair.png"),
            imageName: "Object-view-1-front.png",
          },
        ],
      },
    ]

    function submitHandler(values) {
      console.log(values.mainField)
      console.log(values.subField)
    }

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
          <Text style={$title} tx={"mainpageNavigator.tabName.sharingConfig"} />
        </View>

        {/* Main content */}
        <ScrollView
          style={[$bodyContainer, { marginBottom: bottom }]}
          contentContainerStyle={$bodyContentContainer}
        >
          <View style={$headerBar}>
            {headerBarSection.map((value, index) => (
              <View key={index} style={{ alignItems: "center" }}>
                <Icon style={$headerBarIcon} icon={value.icon} />
                <Text style={$headerBarText} tx={value.name} />
              </View>
            ))}
          </View>
          <Formik
            initialValues={{
              mainField: new Array(settingConfig.length).fill(-1),
              subField: new Array(settingConfig.length)
                .fill(0)
                .map((_, index) =>
                  settingConfig[index].subContent
                    ? new Array(settingConfig[index].subContent.length).fill(-1)
                    : null,
                ),
            }}
            onSubmit={(values) => submitHandler(values)}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <>
                <View style={{ gap: 7 }}>
                  {settingConfig.map((value, index) => (
                    <View key={index} style={$checkboxFieldContainer}>
                      <View style={$checkboxFieldHeader}>
                        <Text style={{ fontWeight: "bold" }} tx={value.name} />
                        <View style={$checkboxContainer}>
                          {[0, 1, 2].map((e) => (
                            <View key={(e + 1) * 0.001} style={$checkbox}>
                              <Checkbox
                                style={$innerCheckbox}
                                color="#041C25"
                                value={values.mainField[index] === e}
                                onValueChange={(status) => {
                                  if (status) {
                                    setFieldValue(`mainField[${index}]`, e)
                                    if (values.subField[index] !== null)
                                      values.subField[index].forEach((subValue, idx) =>
                                        subValue > e
                                          ? setFieldValue(`subField[${index}][${idx}]`, e)
                                          : null,
                                      )
                                  } else setFieldValue(`mainField[${index}]`, -1)
                                }}
                              />
                            </View>
                          ))}
                        </View>
                      </View>
                      {value.subContent !== undefined && (
                        <>
                          <Line style={$line} />
                          <View style={{ gap: 15 }}>
                            {value.subContent.map((e, idx) => (
                              <View
                                key={idx + 100}
                                style={{ flexDirection: "row", justifyContent: "space-between" }}
                              >
                                <View
                                  style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                                >
                                  <View style={$imageContainer}>
                                    <Image style={$image} source={e.image} resizeMode="contain" />
                                  </View>
                                  <Text
                                    style={$subContentText}
                                    text={e.imageName}
                                    numberOfLines={1}
                                  />
                                </View>
                                <View style={$checkboxContainer}>
                                  {[0, 1, 2].map((e) => (
                                    <View key={(e + 1) * 0.001} style={$checkbox}>
                                      <Checkbox
                                        disabled={
                                          e > values.mainField[index] &&
                                          values.mainField[index] !== -1
                                        }
                                        style={$innerCheckbox}
                                        color="#041C25"
                                        value={values.subField[index][idx] === e}
                                        onValueChange={(status) =>
                                          status
                                            ? setFieldValue(`subField[${index}][${idx}]`, e)
                                            : setFieldValue(`subField[${index}][${idx}]`, -1)
                                        }
                                      />
                                    </View>
                                  ))}
                                </View>
                              </View>
                            ))}
                          </View>
                        </>
                      )}
                    </View>
                  ))}
                </View>
                <View style={$buttonContainer}>
                  <Button
                    style={$saveConfigButton}
                    tx={"common.button.saveConfig"}
                    textStyle={$buttonText}
                    pressedStyle={$saveConfigButtonPressed}
                    onPress={() => handleSubmit()}
                  />
                  <View style={$subButtonContainer}>
                    <Button
                      style={$otherButton}
                      tx={"common.button.sharePublicInfo"}
                      textStyle={$buttonText}
                      pressedStyle={$otherButtonPressed}
                      onPress={() => setIsShareModalVisible(true)}
                    />
                    <Button
                      style={$otherButton}
                      tx={"common.button.shareRestrictedInfo"}
                      textStyle={$buttonText}
                      pressedStyle={$otherButtonPressed}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
        <ShareModal
          visibility={isShareModalVisible}
          setVisibility={setIsShareModalVisible}
          setSubModalVisibility={setIsSocialMediaModalVisible}
        />
        <SocialMediaModal
          visibility={isSocialMediaModalVisible}
          setVisibility={setIsSocialMediaModalVisible}
        />
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

const $bodyContentContainer: ViewStyle = {
  flexGrow: 1,
  paddingBottom: 30,
  paddingHorizontal: width * 0.04,
}

const $headerBar: ViewStyle = {
  marginTop: 17,
  marginBottom: 10,
  backgroundColor: "#041C25",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: width * 0.04,
  paddingVertical: 11,
  paddingRight: width * 0.035,
}

const $headerBarIcon: ImageStyle = {
  width: 27,
  height: 27,
  tintColor: "white",
}

const $headerBarText: TextStyle = {
  fontSize: 13 / fontScale,
  fontWeight: "bold",
  color: "white",
}

const $checkboxFieldContainer: ViewStyle = {
  paddingRight: width * 0.048,
  paddingLeft: width * 0.025,
  paddingVertical: 10,
  width: "100%",
  backgroundColor: "#E5E8E9",
}

const $checkboxFieldHeader: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $checkboxContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: width * 0.098,
}

const $checkbox: ViewStyle = {
  width: 27,
  height: 27,
  backgroundColor: "white",
}

const $innerCheckbox: ViewStyle = {
  flex: 1,
  width: "100%",
  borderWidth: 0,
}

const $line: ViewStyle = {
  borderColor: "white",
  borderWidth: 0.8,
  backgroundColor: "white",
  marginBottom: 10,
  marginTop: 14,
}

const $imageContainer: ViewStyle = {
  backgroundColor: "white",
  maxWidth: width * 0.12,
  maxHeight: height * 0.06,
}

const $image: ImageStyle = {
  maxWidth: width * 0.12,
  maxHeight: height * 0.06,
}

const $subContentText: TextStyle = {
  width: width * 0.25,
  fontSize: 14 / fontScale,
}

const $buttonContainer: ViewStyle = {
  gap: 12,
  marginTop: 23,
}

const $saveConfigButton: ViewStyle = {
  width: "100%",
  backgroundColor: "#081C25",
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: 14 / fontScale,
  textAlignVertical: "center",
  lineHeight: 17,
}

const $saveConfigButtonPressed: ViewStyle = {
  backgroundColor: "#081C25",
  opacity: 0.7,
}

const $subButtonContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $otherButton: ViewStyle = {
  width: "48.5%",
  backgroundColor: "#EE4300",
  paddingHorizontal: 0,
}

const $otherButtonPressed: ViewStyle = {
  backgroundColor: "#EE4300",
  opacity: 0.7,
}
