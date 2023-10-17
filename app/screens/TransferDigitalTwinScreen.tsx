/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TouchableOpacity,
  TextStyle,
  ImageStyle,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, TextField, I18NStyle, Line, Button } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TxKeyPath } from "app/i18n"
import Animated, {
  withTiming,
  Easing,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated"
// import { useStores } from "app/models"

interface TokenDocumentDetail {
  header: TxKeyPath
  content: string[] | string
}

interface TransferDigitalTwinScreenProps
  extends NativeStackScreenProps<AppStackScreenProps<"TransferDigitalTwin">> {}

export const TransferDigitalTwinScreen: FC<TransferDigitalTwinScreenProps> = observer(
  function TransferDigitalTwinScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const navigation = useNavigation()
    const { bottom } = useSafeAreaInsets()
    const [isShow, setIsShow] = useState(false)
    const animatedController = useSharedValue(0)
    useEffect(() => {
      animatedController.value = withTiming(isShow ? -180 : 0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      })
    }, [isShow])

    const tokenDocumentDetail: TokenDocumentDetail[] = [
      {
        header: "mainpageNavigator.wallet.sharingConfig.digitalTwinOrigin",
        content: "The Packengers",
      },
      {
        header: "mainpageNavigator.wallet.sharingConfig.creationDate",
        content: "03-04-2023",
      },
      {
        header: "mainpageNavigator.wallet.sharingConfig.price",
        content: "Unknown",
      },
      {
        header: "mainpageNavigator.wallet.sharingConfig.gallery",
        content: ["Object-view-1.jpg", "Object-view-2.jpg"],
      },
      {
        header: "mainpageNavigator.wallet.sharingConfig.gallery3D",
        content: ["3D-object"],
      },
    ]

    const rotation = useDerivedValue(() => {
      return interpolate(animatedController.value, [0, 360], [0, 360])
    })
    const animatedStyle = useAnimatedStyle(() => {
      return { transform: [{ rotate: rotation.value + "deg" }] }
    })

    const entering = (targetValues) => {
      "worklet"
      const animations = {
        originY: withTiming(targetValues.targetOriginY, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }),
        opacity: withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) }),
      }

      const initialValues = {
        originY: targetValues.targetOriginY - 10,
        opacity: 0,
      }

      return {
        initialValues,
        animations,
      }
    }

    const exiting = (values) => {
      "worklet"
      const animations = {
        originY: withTiming(values.currentOriginY - 10, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }),
        opacity: withTiming(0, { duration: 0, easing: Easing.inOut(Easing.ease) }),
      }

      const initialValues = {
        originY: values.currentOriginY,
        opacity: 1,
      }

      return {
        initialValues,
        animations,
      }
    }

    const layoutTransition = (values) => {
      "worklet"
      const animations = {
        height: withTiming(values.targetHeight, {
          duration: 250,
          easing: Easing.inOut(Easing.ease),
        }),
      }

      const initialValues = {
        height: values.currentHeight,
      }

      return {
        initialValues,
        animations,
      }
    }

    return (
      <Screen style={[$root, { marginBottom: bottom }]} preset="fixed">
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "android" ? 30 : 0}
        >
          {/* Header title */}
          <View style={$headerContainer}>
            <TouchableOpacity
              style={$headerIconContainer}
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Icon style={$headerIcon} icon="caretLeft2" />
            </TouchableOpacity>
            <Text style={$title} tx={"mainpageNavigator.tabName.transferDigitalTwin"} />
            <TouchableOpacity style={$addIconContainer} activeOpacity={0.7}>
              <Icon style={$addIcon} icon="add" />
            </TouchableOpacity>
          </View>

          {/* Main content */}
          <ScrollView
            style={$bodyContainer}
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: width * 0.04,
              paddingBottom: 30,
              paddingTop: 17,
            }}
          >
            <View style={$objectInfoContainer}>
              <View style={$objectInfoSubContainer}>
                <View style={$imageContainer}>
                  <Image
                    style={$image}
                    source={require("../../assets/images/coverChair.png")}
                    resizeMode="contain"
                  />
                </View>
                <View style={$objectDetailContainer}>
                  <Text style={$objectTitleText} text="Object title" />
                  <Text
                    style={$objectDescriptionText}
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in sagittis diam."
                    numberOfLines={2}
                  />
                </View>
              </View>
              <Animated.View layout={layoutTransition}>
                <TouchableOpacity
                  style={[$tokenDocumentButton, { height: 40, justifyContent: "center" }]}
                  activeOpacity={0.7}
                  onPress={() => setIsShow(!isShow)}
                >
                  <Text
                    style={[$buttonText, { textAlign: "center" }]}
                    tx={"common.button.tokenDocument"}
                  />
                  <Animated.View style={[$buttonIconContainer, animatedStyle]}>
                    <Icon style={$buttonIcon} icon="download3" />
                  </Animated.View>
                </TouchableOpacity>
                {isShow && (
                  <Animated.View
                    style={$tokenDetailedContainer}
                    entering={entering}
                    exiting={exiting}
                  >
                    <Line style={$line2} />
                    <Text
                      style={$tokenDocumentText}
                      tx={"common.textAndLink.tokenDocumentInform"}
                    />
                    <Line style={[$line2, { marginTop: 13 }]} />
                    <View style={$detailedInfoContainer}>
                      <View>
                        {tokenDocumentDetail.map((value, index) => (
                          <View key={(index + 1) * 0.01}>
                            <Text style={$detailedInfoHeader} tx={value.header} />
                            {typeof value.content === "string" ? null : (
                              <>
                                {new Array(value.content.length - 1).fill(0).map((_, i) => (
                                  <Text key={(i + 1) * 0.001} />
                                ))}
                              </>
                            )}
                          </View>
                        ))}
                      </View>
                      <View>
                        {tokenDocumentDetail.map((value, index) => (
                          <View key={index}>
                            {typeof value.content === "string" ? (
                              <Text style={$detailedInfoText} text={value.content} />
                            ) : (
                              <>
                                {value.content.map((v, i) => (
                                  <Text style={$detailedInfoText} key={(i + 1) * 0.1} text={v} />
                                ))}
                              </>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                    <Line style={[$line2, { marginTop: 13 }]} />
                    <Text
                      style={[$tokenDocumentText, { fontSize: 10 / fontScale, lineHeight: 13 }]}
                      tx={"common.textAndLink.tokenDocumentInform2"}
                    />
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text
                        style={{
                          textDecorationLine: "underline",
                          fontSize: 12.5 / fontScale,
                          lineHeight: 13,
                        }}
                        tx={"common.button.changeTokenData"}
                      />
                    </TouchableOpacity>
                  </Animated.View>
                )}
              </Animated.View>
            </View>
            <View style={$inputContainer}>
              <Text style={$text} tx={"common.textAndLink.transferInstruction"} />
              <TextField
                LabelTextProps={{ style: $label }}
                labelTx={"common.formLabel.emailWalletAddress"}
              />
            </View>
            <View style={$textContainer}>
              <Text style={$text} tx={"common.textAndLink.transferWarning"} />
              <Line style={$line} />
              <I18NStyle
                style={$text}
                tx={"common.textAndLink.transferTimeoutWarning"}
                txOptions={{ time: "2 days" }}
                txPlaceholderStyle={{ time: { fontWeight: "bold" } }}
              />
              <Line style={$line} />
              <Text style={$text} tx={"common.textAndLink.transferInform"} />
            </View>
            <View style={$buttonContainer}>
              <Button
                style={$transferButton}
                textStyle={[$buttonText, { color: "white" }]}
                pressedStyle={$transferButtonPressed}
                tx={"common.button.transfer"}
              />
              <Button
                style={$cancelButton}
                textStyle={[$buttonText, { color: "white" }]}
                pressedStyle={$cancelButtonPressed}
                tx={"common.button.cancel"}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    )
  },
)

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

const $addIconContainer: ViewStyle = {
  position: "absolute",
  right: width * 0.04,
}

const $headerIcon: ImageStyle = {
  width: 18,
  height: 18,
}

const $addIcon: ImageStyle = {
  width: 22,
  height: 22,
}

const $bodyContainer: ViewStyle = {
  backgroundColor: "white",
  marginTop: 22,
}

const $objectInfoContainer: ViewStyle = {
  padding: 7,
  backgroundColor: "#E5E8E9",
}

const $objectInfoSubContainer: ViewStyle = {
  flexDirection: "row",
  gap: 12,
}

const $imageContainer: ViewStyle = {
  maxWidth: width * 0.3,
  height: height * 0.15,
  backgroundColor: "white",
}

const $image: ImageStyle = {
  maxWidth: width * 0.3,
  height: height * 0.15,
}

const $objectDetailContainer: ViewStyle = {
  gap: 5,
  marginTop: height * 0.01,
}

const $objectTitleText: TextStyle = {
  fontSize: 16 / fontScale,
}

const $objectDescriptionText: TextStyle = {
  fontSize: 14 / fontScale,
  color: "#838D92",
  lineHeight: 15,
  width: width * 0.55,
}

const $tokenDocumentButton: ViewStyle = {
  width: "100%",
  backgroundColor: "#CED3D5",
  marginTop: 6,
}

const $tokenDetailedContainer: ViewStyle = {
  backgroundColor: "#CED3D5",
  paddingHorizontal: 12,
  paddingBottom: 20,
}

const $detailedInfoContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: width * 0.15,
}

const $detailedInfoHeader: TextStyle = {
  color: "#041C25",
  fontSize: 13 / fontScale,
  fontWeight: "bold",
}

const $detailedInfoText: TextStyle = {
  color: "#46555C",
  fontSize: 13 / fontScale,
  fontWeight: "bold",
}

const $tokenDocumentText: TextStyle = {
  fontSize: 12 / fontScale,
  lineHeight: 15,
}

const $buttonText: TextStyle = {
  fontSize: 15 / fontScale,
  fontWeight: "bold",
  textAlignVertical: "center",
  lineHeight: 18,
}

const $buttonIcon: ImageStyle = {
  width: 12,
  height: 12,
}

const $buttonIconContainer: ViewStyle = {
  height: "100%",
  justifyContent: "center",
  position: "absolute",
  right: 15,
}

const $inputContainer: ViewStyle = {
  marginTop: 9,
  paddingVertical: 27,
  paddingHorizontal: 18,
  backgroundColor: "#E5E8E9",
  gap: 9,
}

const $text: TextStyle = {
  fontSize: 14 / fontScale,
  lineHeight: 18,
  color: "black",
}

const $label: TextStyle = {
  color: "#80898E",
  fontSize: 14 / fontScale,
  marginBottom: 5,
}

const $textContainer: ViewStyle = {
  marginTop: 22,
}

const $line: ViewStyle = {
  backgroundColor: "#E5E8E9",
  borderColor: "#E5E8E9",
  borderWidth: 0.8,
  marginVertical: 12,
}

const $line2: ViewStyle = {
  backgroundColor: "#041C25",
  borderColor: "#041C25",
  borderWidth: 0.1,
  marginTop: 7,
  marginBottom: 10,
}

const $buttonContainer: ViewStyle = {
  marginTop: 29,
  gap: 6,
}

const $transferButton: ViewStyle = {
  width: "100%",
  backgroundColor: "#EE4300",
}

const $transferButtonPressed: ViewStyle = {
  backgroundColor: "#EE4300",
  opacity: 0.7,
}

const $cancelButton: ViewStyle = {
  width: "100%",
  backgroundColor: "#041C25",
}

const $cancelButtonPressed: ViewStyle = {
  backgroundColor: "#041C25",
  opacity: 0.7,
}
