/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, TextStyle, ImageStyle, Dimensions, StatusBar, ScrollView, Image, ImageSourcePropType } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, VersatileModal, FieldHeaderBar, FieldContent, Line, IconTypes, ImageBox, DocumentBox, Document, HistoryBox, TokenHistory } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { TxKeyPath } from "app/i18n"
import Carousel, {Pagination} from "react-native-snap-carousel"
// import { useStores } from "app/models"

interface SizeInfo{
  icon: IconTypes
  type: TxKeyPath
  value: string
}

interface ImageGallery{
  source: ImageSourcePropType
  coverImage: boolean
}

interface DocumentList{
  category: TxKeyPath
  document: Document[]
}

interface DigitalTwinScreenProps extends NativeStackScreenProps<AppStackScreenProps<"DigitalTwin">> {}

export const DigitalTwinScreen: FC<DigitalTwinScreenProps> = observer(function DigitalTwinScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [isCreateTokenModalVisible, setIsCreateTokenModalVisible] = useState(false)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const carouselRef = useRef(null)
  const navigation = useNavigation()
  const {bottom} = useSafeAreaInsets()

  const specificationTag: FieldContent[] = [
    {label: "common.formLabel.id", content: "TPK_1234567"},
    {label: "common.formLabel.tagRef", content: "0123456abcd"},
    {label: "common.formLabel.operator", content: "The Packengers"},
    {label: "common.formLabel.creationDate", content: "03-04-2023"},
    {label: "common.formLabel.price", content: ""},
  ]
  const sizeInfo: SizeInfo[] = [
    {icon: "length", type: "common.formLabel.length", value: ""},
    {icon: "depth", type: "common.formLabel.depth", value: ""},
    {icon: "width", type: "common.formLabel.width", value: ""},
    {icon: "weight", type: "common.formLabel.weight", value: ""}
  ]
  const imageList: ImageGallery[] = [
    {source: require("../../assets/images/coverChair.png"), coverImage: false},
    {source: require("../../assets/images/coverChair.png"), coverImage: true},
    {source: require("../../assets/images/coverVase.png"), coverImage: false},
    {source: require("../../assets/images/coverVase.png"), coverImage: false},
    {source: require("../../assets/images/coverArt.png"), coverImage: false},
    {source: require("../../assets/images/coverArt.png"), coverImage: false},
    {source: require("../../assets/images/coverArt2.png"), coverImage: false},
    {source: require("../../assets/images/coverArt2.png"), coverImage: false},
    {source: require("../../assets/images/coverChair.png"), coverImage: false},
    {source: require("../../assets/images/coverArt2.png"), coverImage: false},
    {source: require("../../assets/images/coverVase.png"), coverImage: false}
  ]
  const documentList: DocumentList[] = [
    {
      category: "common.formLabel.gallery3D",
      document: [
        {image: require("../../assets/images/coverChair.png"), name: "Object-3D-view-1.jpg"}
      ]
    },
    {
      category: "common.formLabel.certificate",
      document: [
        {name: "Object-certificate.doc"}
      ]
    },
    {
      category: "common.formLabel.coverImage",
      document: [
        {image: require("../../assets/images/coverChair.png"), name: "Object-view-1.jpg"}
      ]
    },
    {
      category: "common.formLabel.gallery",
      document: [
        {image: require("../../assets/images/coverChair.png"), name: "Object-view-1.jpg"},
        {image: require("../../assets/images/coverChair.png"), name: "Object-view-2.jpg"}
      ]
    },
    {
      category: "common.formLabel.invoice",
      document: [
        {name: "Invoice-for-artist.pdf"}
      ]
    }
  ]
  const tokenHistory: TokenHistory[] = [
    {
      id: '111',
      date: new Date("2023-04-04T12:12:31"),
      status: 0,
      operator: 0,
      tokenName: 'Sleigh Baumann Chair',
      senderID: '0x850243759A435UX432B321',
      receiverID: '0x850243759A435UX432B321',
      amount: 1758.42,
      transactionFee: 0
    },
    {
      id: '402',
      date: new Date("2023-04-04T12:12:31"),
      status: 0,
      operator: 0,
      tokenName: 'Sleigh Baumann Chair',
      senderID: '0x850243759A435UX432B321',
      receiverID: '0x850243759A435UX432B321',
      amount: 1758.42,
      transactionFee: 0
    },
    {
      id: '304',
      date: new Date("2023-04-04T12:12:31"),
      status: 0,
      operator: 0,
      tokenName: 'Sleigh Baumann Chair',
      senderID: '0x850243759A435UX432B321',
      receiverID: '0x850243759A435UX432B321',
      amount: 1758.42,
      transactionFee: 0
    }
  ]


  function getChunkSize():number{
    const chunkSize = Math.floor((width-34)/170)
    return chunkSize*170+(chunkSize-1)*14 > width-34? chunkSize-1:chunkSize
  }

  function slideDivider(dataList: ImageGallery[], chunkSize: number): ImageGallery[][]{
    const res = []
    for(let i = 0 ; i < dataList.length; i+=chunkSize) res.push(dataList.slice(i, i+chunkSize))
    return res
  }

  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate("MainPage", {screen: "Wallet"})}>
          <Icon style={$leftHeaderIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.digitalTwin"}/>
        <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsCreateTokenModalVisible(true)}>
          <Icon style={$rightHeaderIcon} icon="add" />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={$bodyContentContainer} style={[$bodyContainer, {marginBottom: bottom}]}>
        <View style={$imageArea}>
          <Image style={$image} source={require("../../assets/images/coverChair.png")}/>
          <TouchableOpacity style={$zoomIconContainer} activeOpacity={0.7}>
            <Icon style={$zoomIcon} icon="zoom"/>
          </TouchableOpacity>
        </View>
        <FieldHeaderBar
          headerTextStyle={$boldText}
          tx={"mainpageNavigator.tabName.object"} 
          destinationSreen="Object"
          fieldContent={[
            {
              label: "common.formLabel.name",
              content: "Sleigh Baumann Chair"
            },
            {
              label: "common.formLabel.description", 
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet pretium elit, non pellentesque magna. Aenean mollis tortor lorem, quis volutpat dolor aliquet condimentum. Nunc dignissim commodo sem vel scelerisque."
            }
          ]}
          lineBetweenContent={true}
        />
        <FieldHeaderBar headerTextStyle={$boldText} tx={"mainpageNavigator.tabName.specification"} destinationSreen="Specification"/>
        <View style={$specificationSection}>
          <View>
            {
              specificationTag.map((value, index)=>(
                <Text style={$labelText} key={(index+1)*0.1} tx={value.label}/>
              ))
            }
          </View>
          <View>
            {
              specificationTag.map((value, index)=>(
                <Text style={$specificationText} key={(index+1)*6} text={value.content===""?"unknown":value.content}/>
              ))
            }
          </View>
        </View>
        <Line style={$line}/>
        <View style={$sizeSection}>
          <Text style={$labelText} tx={"common.formLabel.size"}/>
          <View style={$sizeSectionSubContainer}>
            {
              [0,1].map((_,index)=>(
                <View key={index} style={[$sizeInfoContainer, {borderRightWidth: index===0?1:0}]}>
                  {
                    sizeInfo.map((size, idx)=>{
                      if(idx%2===index%2) return (
                        <View key={(idx+1)*0.1} style={$sizeInfoSubContainer}>
                          <Icon style={$sizeIcon} icon={size.icon}/>
                          <View style={[$sizeInfoSubSubContainer, {borderBottomWidth: idx<sizeInfo.length/2?1:0}]}>
                            <Text style={[$labelText, $sizeInfoText]} tx={size.type}/>
                            <Text style={$sizeInfoText} text={size.value===""?"unknown":size.value}/>
                          </View>
                        </View>
                      )
                      else return null
                    })
                  }
                </View>
              ))
            }
          </View>
        </View>
        <FieldHeaderBar headerTextStyle={$boldText} tx={"mainpageNavigator.tabName.gallery"} destinationSreen="Gallery"/>
        <View style={$gallerySection}>
          <Carousel
            ref={carouselRef}
            data={slideDivider(imageList, getChunkSize())}
            renderItem={({item})=>(
              <View style={{flexDirection: 'row', gap: 14, alignItems: 'center', justifyContent: 'center'}}>
                {
                  item.map((value, index)=>(
                    <ImageBox key={index} source={value.source} coverImage={value.coverImage}/>
                  ))
                }
              </View>
            )}
            itemWidth={width-34}
            sliderWidth={width-34}
            onSnapToItem={(index)=>setActiveSlideIndex(index)}
          />
          <Pagination
            carouselRef={carouselRef}
            dotsLength={Math.ceil(imageList.length/getChunkSize())}
            activeDotIndex={activeSlideIndex}
            containerStyle={{paddingBottom: 0}}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: 'gray'
            }}
            tappableDots={true}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
            animatedDuration={50}
          />
        </View>
        <FieldHeaderBar headerTextStyle={$boldText} tx={"mainpageNavigator.tabName.document"} destinationSreen="Document"/>
        <View style={$documentSection}>
            {
              documentList.map((value, index)=>(
                <DocumentBox key={index} category={value.category} document={value.document}/>
              ))
            }
        </View>
        <FieldHeaderBar headerTextStyle={$boldText} tx={"mainpageNavigator.tabName.tokenHistory"} />
        <View style={$historySection}>
            {
              tokenHistory.map((value, index)=>(
                <HistoryBox key={(index+1)*100} data={value} hideStatus={true}/>
              ))
            }
        </View>
      </ScrollView>
      <VersatileModal visibility={isCreateTokenModalVisible} setVisibility={setIsCreateTokenModalVisible}/>
    </Screen>
  )
})



// Styling zone

const {fontScale, width, height} = Dimensions.get('screen')

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: '#041C25',
  alignItems: 'center',
  marginTop: StatusBar.currentHeight
}

const $headerContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: width,
  marginTop: height*0.06,
  paddingHorizontal: width*0.04
}

const $title: TextStyle = {
  color: 'white',
  fontSize: 25 / fontScale,
  lineHeight: 30,
  textAlign: 'center',
  textAlignVertical: 'center'
}

const $leftHeaderIcon: ImageStyle = {
  width: 18,
  height: 18
}

const $rightHeaderIcon: ImageStyle = {
  width: 30,
  height: 30
}

const $bodyContainer: ViewStyle = {
  marginTop: 22
}

const $bodyContentContainer: ViewStyle = {
  flexGrow: 1,
  backgroundColor: 'white',
  paddingBottom: 20
}

const $imageArea: ViewStyle = {
  backgroundColor: '#F3F4F5',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10
}

const $zoomIconContainer: ViewStyle = {
  position: 'absolute',
  bottom: 20,
  right: 20
}

const $zoomIcon: ImageStyle = {
  width: 22,
  height: 22
}

const $image: ImageStyle = {
  maxWidth: width*0.5,
  maxHeight: height*0.25
}

const $boldText: TextStyle = {
  fontWeight: 'bold'
}

const $specificationSection: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: width*0.05,
  gap: 60
}

const $labelText: TextStyle = {
  color: '#838D92'
}

const $specificationText: TextStyle = {
  fontSize: 15 / fontScale
}

const $line: ViewStyle = {
  width: '90%',
  backgroundColor: '#E5E8E9',
  borderColor: '#E5E8E9',
  borderWidth: 0.7,
  alignSelf: 'center',
  marginTop: 15
}

const $sizeSection: ViewStyle = {
  paddingLeft: width*0.05,
  marginTop: 5,
  marginBottom: 27
}

const $sizeSectionSubContainer: ViewStyle = {
  marginTop: 7,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10
}

const $sizeInfoContainer: ViewStyle = {
  paddingRight: 10,
  borderColor: '#E5E8E9'
}

const $sizeIcon: ImageStyle = {
  width: 20,
  height: 20
}

const $sizeInfoSubContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center'
}

const $sizeInfoSubSubContainer: ViewStyle = {
  flexDirection: 'row',
  width: width*0.35,
  marginLeft: 10,
  justifyContent: 'space-between',
  paddingVertical: 6,
  borderColor: '#E5E8E9',
  paddingRight: 5
}

const $sizeInfoText: TextStyle = {
  fontSize: 15 / fontScale
}

const $gallerySection: ViewStyle = {
  marginBottom: 23,
  paddingTop: 18,
  paddingHorizontal: 17
}

const $documentSection: ViewStyle = {
  marginBottom: 26,
  paddingHorizontal: 17,
  gap: 11
}

const $historySection: ViewStyle = {
  paddingTop: 5,
  paddingHorizontal: 18,
  gap: 12
}