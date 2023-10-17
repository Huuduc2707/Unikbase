/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { View, ViewStyle, TouchableOpacity, ImageStyle, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { Icon } from "app/components/Icon"
import { Line } from "app/components/Line"
import Modal from "react-native-modal"
import { IconTypes } from "./Icon"

export interface SocialMediaModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const SocialMediaModal = observer(function SocialMediaModal(props: SocialMediaModalProps) {
  const { visibility, setVisibility } = props

  const icon: IconTypes[] = ["gmail", "whatsapp", "instagram", "facebook", "twitter"]

  return (
    <Modal
      style={{ margin: 0, justifyContent: "flex-end" }}
      isVisible={visibility}
      backdropTransitionOutTiming={0}
      onBackdropPress={() => setVisibility(false)}
      onBackButtonPress={() => setVisibility(false)}
    >
      <View style={$container}>
        <View style={$iconContainer}>
          {icon.map((value, index) => (
            <TouchableOpacity
              key={(index + 1) * 100}
              activeOpacity={0.7}
              onPress={() => setVisibility(false)}
            >
              <Icon style={$icon} icon={value} />
            </TouchableOpacity>
          ))}
        </View>
        <Line style={$line} />
        <View style={$loadingContainer}>
          {new Array(3).fill(0).map((_, index) => (
            <TouchableOpacity
              key={(index + 1) * 1000}
              style={$loadingBar}
              activeOpacity={0.7}
            ></TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  )
})

const { width } = Dimensions.get("screen")

const $container: ViewStyle = {
  backgroundColor: "#E5E8E9",
  paddingTop: 23,
  paddingBottom: 40,
  paddingHorizontal: 14,
}

const $iconContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $icon: ImageStyle = {
  width: width * 0.145,
  height: width * 0.145,
}

const $line: ViewStyle = {
  marginVertical: 23,
  borderWidth: 0.1,
  borderColor: "#041C25",
  backgroundColor: "#041C25",
}

const $loadingContainer: ViewStyle = {
  gap: 10,
}

const $loadingBar: ViewStyle = {
  paddingVertical: 22,
  backgroundColor: "white",
  borderRadius: 5,
}
