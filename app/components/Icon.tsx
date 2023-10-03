import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        style={[
          $imageStyle,
          color && { tintColor: color },
          size && { width: size, height: size },
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  back: require("../../assets/icons/back.png"),
  bell: require("../../assets/icons/bell.png"),
  caretLeft: require("../../assets/icons/caretLeft.png"),
  caretRight: require("../../assets/icons/caretRight.png"),
  check: require("../../assets/icons/check.png"),
  clap: require("../../assets/icons/clap.png"),
  community: require("../../assets/icons/community.png"),
  components: require("../../assets/icons/components.png"),
  debug: require("../../assets/icons/debug.png"),
  github: require("../../assets/icons/github.png"),
  heart: require("../../assets/icons/heart.png"),
  hidden: require("../../assets/icons/hidden.png"),
  ladybug: require("../../assets/icons/ladybug.png"),
  lock: require("../../assets/icons/lock.png"),
  menu: require("../../assets/icons/menu.png"),
  more: require("../../assets/icons/more.png"),
  pin: require("../../assets/icons/pin.png"),
  podcast: require("../../assets/icons/podcast.png"),
  settings: require("../../assets/icons/settings.png"),
  slack: require("../../assets/icons/slack.png"),
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),
  unikbase: require("../../assets/icons/unikbase.png"),
  facebook: require("../../assets/icons/facebook.png"),
  google: require("../../assets/icons/google.png"),
  phone: require("../../assets/icons/phone.png"),
  mail: require("../../assets/icons/mail.png"),
  tlc: require("../../assets/icons/top-left-corner.png"),
  trc: require("../../assets/icons/top-right-corner.png"),
  blc: require("../../assets/icons/bottom-left-corner.png"),
  brc: require("../../assets/icons/bottom-right-corner.png"),
  down: require("../../assets/icons/down.png"),
  search: require("../../assets/icons/search.png"),
  wallet: require("../../assets/icons/wallet.png"),
  history: require("../../assets/icons/history.png"),
  profile: require("../../assets/icons/profile.png"),
  moreList: require("../../assets/icons/moreList.png"),
  roundLogo: require("../../assets/icons/roundLogo.png"),
  caretDown: require("../../assets/icons/caretDown.png"),
  copy: require("../../assets/icons/copy.png"),
  roundSearch: require("../../assets/icons/roundSearch.png"),
  add: require("../../assets/icons/add.png"),
  search2: require("../../assets/icons/search2.png"),
  calendar: require("../../assets/icons/calendar.png"),
  caretDown2: require("../../assets/icons/caretDown2.png"),
  caretLeft2: require("../../assets/icons/caretLeft2.png"),
  downArrow: require("../../assets/icons/downArrow.png"),
  image: require("../../assets/icons/image.png"),
  filter: require("../../assets/icons/filter.png"),
  upload: require("../../assets/icons/upload.png"),
  download: require("../../assets/icons/download.png"),
  caretDown3: require("../../assets/icons/caretDown3.png"),
  roundX: require("../../assets/icons/roundX.png"),
  zoom: require("../../assets/icons/zoom.png"),
  length: require("../../assets/icons/length.png"),
  width: require("../../assets/icons/width.png"),
  weight: require("../../assets/icons/weight.png"),
  depth: require("../../assets/icons/depth.png"),
  roundMore: require("../../assets/icons/roundMore.png"),
  document: require("../../assets/icons/document.png"),
  transfer: require("../../assets/icons/transfer.png"),
  share: require("../../assets/icons/share.png"),
  scan: require("../../assets/icons/scan.png"),
  link: require("../../assets/icons/link.png"),
  insurance: require("../../assets/icons/insurance.png"),
  report: require("../../assets/icons/report.png"),
  eye: require("../../assets/icons/eye.png"),
  pencil: require("../../assets/icons/pencil.png"),
  download2: require("../../assets/icons/download2.png"),
  trash: require("../../assets/icons/trash.png"),
  roundX2: require("../../assets/icons/roundX2.png")
}

const $imageStyle: ImageStyle = {  
  resizeMode: "contain",
}
