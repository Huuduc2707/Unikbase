import * as React from "react"
import { TextStyle, View, ViewStyle, ImageStyle, Dimensions, ScrollView, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "app/components/Text"
import { Line } from "app/components/Line"
import { Icon, IconTypes } from "app/components/Icon"
import Modal from "react-native-modal"
import { TxKeyPath } from "app/i18n"
import { useNavigation } from "@react-navigation/native"

interface Feature{
  icon: IconTypes
  name: TxKeyPath
}

export interface VersatileModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  visibility?: boolean
  setVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Describe your component here
 */
export const VersatileModal = observer(function VersatileModal(props: VersatileModalProps) {
  const { visibility, setVisibility } = props
  const navigation = useNavigation()

  const features: Feature[] = [
    {icon: "document", name: "mainpageNavigator.wallet.feature.document"},
    {icon: "transfer", name: "mainpageNavigator.wallet.feature.transfer"},
    {icon: "share", name: "mainpageNavigator.wallet.feature.share"},
    {icon: "scan", name: "mainpageNavigator.wallet.feature.scan"},
    {icon: "link", name: "mainpageNavigator.wallet.feature.link"},
    {icon: "link", name: "mainpageNavigator.wallet.feature.verify"}
  ]
  const comingFeature: Feature[] = [
    {icon: "insurance", name: "mainpageNavigator.wallet.feature.insurance"},
    {icon: "report", name: "mainpageNavigator.wallet.feature.report"}
  ]
  const destinationScreen: string[] = ["Document", "TransferDigitalTwin", "ShareTwinInfo", "Scan3D", "LinkNfcTag", "VerifyNfcTag"]
  return (
    <Modal isVisible={visibility} coverScreen={false} backdropTransitionOutTiming={0} onBackdropPress={()=>setVisibility(false)}>
      <View style={$container}>
        <ScrollView>
          <View style={$iconContainer}>
            <Icon style={$arrowIcon} icon="tlc"/>
            <Icon style={$arrowIcon} icon="trc"/>
          </View>
          <View style={$bodyContainer}>
            <View style={$featureContainer}>
              {
                features.map((value, index)=>(
                  <TouchableOpacity key={(index+1)*0.1} style={$featureBox} activeOpacity={0.7} onPress={()=>navigation.navigate(destinationScreen[index])}>
                    <Icon style={$featureIcon} icon={value.icon}/>
                    <Text style={$featureText} tx={value.name}/>
                  </TouchableOpacity>
                ))
              }
            </View>
            <Line style={$line}/>
            <Text style={$text} tx={"mainpageNavigator.wallet.comingSoon"}/>
            <View style={$featureContainer}>
              {
                comingFeature.map((value, index)=>(
                  <View key={(index+1)*6} style={[$featureBox, $comingFeatureBox]}>
                    <Icon style={$featureIcon} icon={value.icon}/>
                    <Text style={[$featureText, $comingFeatureText]} tx={value.name}/>
                  </View>
                ))
              }
            </View>
          </View>
          <View style={$iconContainer}>
            <Icon style={$arrowIcon} icon="blc"/>
            <Icon style={$arrowIcon} icon="brc"/>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
})

const {fontScale, width} = Dimensions.get('screen')


const $container: ViewStyle = {
  alignSelf: 'center',
  backgroundColor: 'white',
  width: width*0.9,
  paddingVertical: 16,
  paddingHorizontal: 15
}

const $iconContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}

const $arrowIcon: ImageStyle = {
  width: 15 / fontScale,
  height: 15 / fontScale
}

const $bodyContainer: ViewStyle = {
  paddingTop: 15,
  paddingBottom: 8
}

const $featureContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 13
}

const $featureBox: ViewStyle = {
  width: 89,
  height: 109,
  paddingVertical: 25,
  paddingHorizontal: 10,
  backgroundColor: '#E5E8E9',
  gap: 12,
  alignItems: 'center',
  justifyContent: 'center'
}

const $featureIcon: ImageStyle = {
  width: 26,
  height: 26
}

const $featureText: TextStyle = {
  fontSize: 13 / fontScale,
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: 16
}

const $comingFeatureBox: ViewStyle = {
  borderColor: '#E5E8E9',
  borderWidth: 1,
  backgroundColor: 'white'
}

const $comingFeatureText: TextStyle = {
  color: '#818D92'
}

const $line: ViewStyle = {
  backgroundColor: '#E5E8E9',
  borderColor: '#E5E8E9',
  borderWidth: 0.7,
  marginTop: 15,
  marginBottom: 17
}

const $text: TextStyle = {
  fontSize: 14 / fontScale,
  marginBottom: 18,
  textAlign: 'center',
  color: '#818D92',
  fontWeight: 'bold'
}