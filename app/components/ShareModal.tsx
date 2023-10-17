import * as React from "react"
import { TextStyle, View, ViewStyle, Dimensions, ImageStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Icon } from "app/components/Icon"
import { Button } from "app/components/Button"
import * as Clipboard from "expo-clipboard"
import { Popover } from "react-native-popable"
import Modal from "react-native-modal"

export interface ShareModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
  setSubModalVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const ShareModal = observer(function ShareModal(props: ShareModalProps) {
  const { visibility, setVisibility, setSubModalVisibility } = props
  const [isCopied, setIsCopied] = React.useState(false)

  function copyToClipboard() {
    setIsCopied(true)
    Clipboard.setStringAsync(
      "http://collector.unikbase.com/SleighBaumann1234567890123456789012345678901234567890123456789012345678901234567890123456",
    )
    setTimeout(() => setIsCopied(false), 1500)
  }

  return (
    <Modal
      isVisible={visibility}
      backdropTransitionOutTiming={0}
      onBackdropPress={() => setVisibility(false)}
      onBackButtonPress={() => setVisibility(false)}
    >
      <View style={$formContainer}>
        <View style={$iconContainer}>
          <Icon style={$arrowIcon} icon="tlc" />
          <Icon style={$arrowIcon} icon="trc" />
        </View>
        <View style={$form}>
          <Text style={$formName} text={"Sleigh Baumann Chair"} />
          <Text
            style={$informText}
            tx={"common.textAndLink.shareTokenLink"}
            txOptions={{ name: "Object title" }}
          />
          <View style={$linkContainer}>
            <Text
              style={$linkText}
              text="http://collector.unikbase.com/SleighBaumann1234567890123456789012345678901234567890123456789012345678901234567890123456"
            />
            <TouchableOpacity activeOpacity={0.7} onPress={copyToClipboard}>
              <Icon style={isCopied ? $hideIcon : $copyIcon} icon="copy" />
              <Icon style={isCopied ? $checkIcon : $hideIcon} icon="check" />
            </TouchableOpacity>
            <Popover style={$popover} visible={isCopied} position="left">
              <Text style={$popoverText} tx={"mainpageNavigator.wallet.copied"} />
            </Popover>
          </View>
          <Button
            style={$shareButton}
            tx={"common.button.share"}
            textStyle={$shareText}
            pressedStyle={$buttonPressed}
            onPress={() => setSubModalVisibility(true)}
          />
        </View>
        <View style={$iconContainer}>
          <Icon style={$arrowIcon} icon="blc" />
          <Icon style={$arrowIcon} icon="brc" />
        </View>
      </View>
    </Modal>
  )
})

const { fontScale, width, height } = Dimensions.get("screen")

const $formContainer: ViewStyle = {
  backgroundColor: "white",
  alignSelf: "center",
  width: width * 0.95,
  paddingVertical: 16,
  paddingHorizontal: 15,
}

const $iconContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: width * 0.82,
}

const $arrowIcon: ImageStyle = {
  width: 15 / fontScale,
  height: 15 / fontScale,
}

const $form: ViewStyle = {
  alignItems: "center",
  marginTop: -10,
}

const $formName: TextStyle = {
  fontSize: 19 / fontScale,
  marginBottom: height * 0.025,
}

const $informText: TextStyle = {
  fontSize: 18 / fontScale,
  textAlign: "center",
  width: width * 0.75,
}

const $linkContainer: ViewStyle = {
  backgroundColor: "#E5E8E9",
  paddingVertical: 13,
  paddingLeft: 17,
  paddingRight: 10,
  marginTop: 20,
  width: width * 0.82,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 5,
}

const $copyIcon: ImageStyle = {
  width: 20 / fontScale,
  height: 22 / fontScale,
}

const $checkIcon: ImageStyle = {
  width: 20 / fontScale,
  height: 22 / fontScale,
  tintColor: "green",
}

const $linkText: TextStyle = {
  width: "85%",
  fontSize: 11 / fontScale,
  lineHeight: 16,
}

const $popover: ViewStyle = {
  position: "absolute",
  right: width * 0.075,
  width: 180,
}

const $popoverText: TextStyle = {
  color: "white",
  height: 35,
  fontSize: 14 / fontScale,
  textAlign: "center",
  textAlignVertical: "center",
}

const $hideIcon: ImageStyle = {
  display: "none",
}

const $shareButton: ViewStyle = {
  width: width * 0.82,
  backgroundColor: "#F14300",
  marginTop: 17,
  marginBottom: 11,
}

const $shareText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: "center",
  lineHeight: 18,
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#F14300",
  opacity: 0.7,
}
