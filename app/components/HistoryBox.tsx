/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react"
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  Dimensions,
  ImageStyle,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { Line } from "app/components/Line"
import { TxKeyPath } from "app/i18n"
import Animated, {
  withTiming,
  Easing,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated"

export interface TokenHistory {
  id: string
  date: Date
  status: number
  operator: number
  tokenName: string
  senderID: string
  receiverID: string
  amount: number
  transactionFee: number
}

export interface HistoryBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data?: TokenHistory
  hideStatus?: boolean
}

/**
 * Describe your component here
 */
export const HistoryBox = observer(function HistoryBox(props: HistoryBoxProps) {
  const { style, data, hideStatus } = props
  const [isDetailShown, setIsDetailShown] = useState(false)
  const animatedController = useSharedValue(0)
  const $styles = [$container, style]
  useEffect(() => {
    animatedController.value = withTiming(isDetailShown ? -180 : 0, {
      duration: 350,
      easing: Easing.inOut(Easing.ease),
    })
  }, [isDetailShown])

  const status: TxKeyPath[] = [
    "mainpageNavigator.history.tokenHistory.status.confirmed",
    "mainpageNavigator.history.tokenHistory.status.refused",
  ]
  const statusTextColor: string[] = ["#73BF44", "#F20000"]
  const operator: TxKeyPath[] = [
    "mainpageNavigator.history.tokenHistory.operator.tokenCreation",
    "mainpageNavigator.history.tokenHistory.operator.tokenReceipt",
    "mainpageNavigator.history.tokenHistory.operator.tokenAccepted",
    "mainpageNavigator.history.tokenHistory.operator.documentUploaded",
  ]
  const downloadOperator: TxKeyPath[] = [
    "mainpageNavigator.history.tokenHistory.operator.tokenReceipt",
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
        duration: 50,
        easing: Easing.inOut(Easing.ease),
      }),
      opacity: withTiming(0, { duration: 50, easing: Easing.inOut(Easing.ease) }),
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
      height: withTiming(values.targetHeight, { duration: 250, easing: Easing.inOut(Easing.ease) }),
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
    <Animated.View style={$styles} layout={layoutTransition}>
      <View style={$generalContainer}>
        <View style={$generalSubContainer}>
          <Text style={$generalInfoText} text={`#${data.id}`} />
          <Text
            style={[$generalInfoText, $textMarginLeft]}
            text={`${data.date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })} at ${
              data.date.getHours() % 12 < 10 && data.date.getHours() % 12 !== 0 ? 0 : ""
            }${data.date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}`}
          />
        </View>
        {!hideStatus && (
          <Text
            style={[$statusText, { color: statusTextColor[data.status] }]}
            tx={status[data.status]}
          />
        )}
      </View>
      <View style={[$generalContainer, { marginTop: 10 }]}>
        <View style={$generalSubContainer}>
          <Icon
            icon={downloadOperator.includes(operator[data.operator]) ? "download" : "upload"}
            style={$mainIcon}
          />
          <View style={$textMarginLeft}>
            <Text style={$tokenOperatorText} tx={operator[data.operator]} />
            <Text style={$tokenNameText} text={data.tokenName} />
          </View>
        </View>
        <TouchableOpacity
          style={{ justifyContent: "flex-end" }}
          activeOpacity={0.7}
          onPress={() => setIsDetailShown(!isDetailShown)}
        >
          <Animated.View style={animatedStyle}>
            <Icon style={$arrowIcon} icon="caretDown3" />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {isDetailShown && (
        <Animated.View style={$detailedInfoContainer} entering={entering} exiting={exiting}>
          <Line style={$line} />
          <Text
            style={$detailedHeader}
            tx={"mainpageNavigator.history.tokenHistory.detailHeader.digitalTwinName"}
          />
          <Text style={$detailedInfoText} text={data.tokenName} />
          <Line style={$line} />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text
                style={$detailedHeader}
                tx={"mainpageNavigator.history.tokenHistory.detailHeader.status"}
              />
              <Text style={$detailedInfoText} tx={status[data.status]} />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={$detailedHeader}
                tx={"mainpageNavigator.history.tokenHistory.detailHeader.date"}
              />
              <Text
                style={$detailedInfoText}
                text={`${data.date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })} at ${
                  data.date.getHours() % 12 < 10 && data.date.getHours() % 12 !== 0 ? 0 : ""
                }${data.date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}`}
              />
            </View>
          </View>
          <Line style={$line} />
          <Text
            style={$detailedHeader}
            tx={"mainpageNavigator.history.tokenHistory.detailHeader.from"}
          />
          <Text style={$detailedInfoText} text={data.senderID} />
          <Line style={$line} />
          <Text
            style={$detailedHeader}
            tx={"mainpageNavigator.history.tokenHistory.detailHeader.to"}
          />
          <Text style={$detailedInfoText} text={data.receiverID} />
          <View style={$costSummaryContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={$costSummaryText}
                tx={"mainpageNavigator.history.tokenHistory.detailHeader.amount"}
              />
              <Text style={$costSummaryText} text={`$${data.amount.toFixed(2)}`} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={$costSummaryText}
                tx={"mainpageNavigator.history.tokenHistory.detailHeader.transactionFee"}
              />
              <Text
                style={$costSummaryText}
                text={`$${data.transactionFee === 0 ? 0 : ""}${data.transactionFee.toFixed(2)}`}
              />
            </View>
            <Line style={$line} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 13 }}>
              <Text
                style={$costSummaryText}
                tx={"mainpageNavigator.history.tokenHistory.detailHeader.totalAmount"}
              />
              <Text
                style={$costSummaryText}
                text={`$${(data.amount - data.transactionFee).toFixed(2)}`}
              />
            </View>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  )
})

const { fontScale, width } = Dimensions.get("screen")

const $container: ViewStyle = {
  width: "100%",
  justifyContent: "center",
  backgroundColor: "#E5E8E9",
  paddingVertical: 14,
  paddingHorizontal: width * 0.03,
}

const $generalContainer: ViewStyle = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
}

const $generalSubContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $generalInfoText: TextStyle = {
  color: "#838D92",
  fontSize: 13 / fontScale,
}

const $statusText: TextStyle = {
  fontSize: 13 / fontScale,
}

const $textMarginLeft: TextStyle = {
  marginLeft: 10,
}

const $mainIcon: ImageStyle = {
  width: 33,
  height: 33,
}

const $arrowIcon: ImageStyle = {
  width: 18,
  height: 18,
}

const $tokenOperatorText: TextStyle = {
  fontSize: 16 / fontScale,
  textAlignVertical: "center",
  fontWeight: "bold",
}

const $tokenNameText: TextStyle = {
  fontSize: 15 / fontScale,
  lineHeight: 20,
}

const $detailedInfoContainer: ViewStyle = {
  paddingTop: 8,
  paddingBottom: 5,
}

const $line: ViewStyle = {
  marginTop: 9,
  backgroundColor: "#838D92",
  borderColor: "#838D92",
  borderWidth: 0.1,
}

const $detailedHeader: TextStyle = {
  color: "#838D92",
  fontSize: 14.5 / fontScale,
  marginTop: 10,
}

const $detailedInfoText: TextStyle = {
  fontSize: 14.5 / fontScale,
  lineHeight: 20,
}

const $costSummaryContainer: ViewStyle = {
  marginTop: 16,
  backgroundColor: "white",
  paddingVertical: 20,
  paddingHorizontal: 17,
}

const $costSummaryText: TextStyle = {
  fontSize: 16 / fontScale,
}
