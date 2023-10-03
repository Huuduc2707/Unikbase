/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, StatusBar, Dimensions, View, Image, ImageStyle, ScrollView } from "react-native"
import { Screen, Text, Button, Icon, HistoryBox, TokenHistory, FilterModal } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HistoryScreenProps {}

export const HistoryScreen: FC<HistoryScreenProps> = observer(function HistoryScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [isFilterModalVisibile, setIsFilterModalVisible] = useState(false)

  const data: TokenHistory[] = [
    {
      id: '402',
      date: new Date("2023-03-23T10:30:31"),
      status: 0,
      operator: 0,
      tokenName: 'Apple Macbook Pro',
      senderID: '0x850243759A435UX432B321',
      receiverID: '0x850243759A435UX432B321',
      amount: 1758.42,
      transactionFee: 0
    },
    {
      id: '203',
      date: new Date("2023-03-14T18:32:27"),
      status: 0,
      operator: 1,
      tokenName: 'Grashopper Lamp',
      senderID: '0x850243759A435UX432B321',
      receiverID: '0x850243759A435UX432B321',
      amount: 1758.42,
      transactionFee: 0
    },
    {
      id: '198',
      date: new Date("2023-02-28T15:00:15"),
      status: 1,
      operator: 2,
      tokenName: 'Hippopotamus figurine',
      senderID: '0x850243759A435UX432B321',
      receiverID: '0x850243759A435UX432B321',
      amount: 1758.42,
      transactionFee: 0
    },
    {
      id: '282',
      date: new Date("2023-01-02T21:49:50"),
      status: 0,
      operator: 2,
      tokenName: 'Kaleido Tray',
      senderID: '0x850243759A435UX432B321',
      receiverID: '0x850243759A435UX432B321',
      amount: 1758.42,
      transactionFee: 0
    },
    {
      id: '111',
      date: new Date("2023-12-28T12:12:12"),
      status: 0,
      operator: 3,
      tokenName: 'Buld vase',
      senderID: '0x850243759A435UX432B321',
      receiverID: '0x850243759A435UX432B321',
      amount: 1758.42,
      transactionFee: 0
    }
  ]


  return (
    <Screen style={$root} preset="fixed">
      {/* Screen title */}
      <Text style={$title} tx={"mainpageNavigator.tabName.tokenHistory"}/>

      {/* Main content */}
      <View style={$bodyContainer}>
        {/* <Image style={$emptyHistoryImage} source={require("../../assets/images/emptyHistory.png")} resizeMode="contain"/>
        <Text style={$emptyHistoryText} tx={"mainpageNavigator.history.emptyHistory"}/> */}
        <>
          <Button 
            style={$filterButton} 
            tx={"common.button.filter"} 
            textStyle={$buttonText} 
            pressedStyle={$buttonPressed}
            LeftAccessory={()=>(
              <Icon style={$filterIcon} containerStyle={$filterIconContainer} icon="filter"/>
            )}
            onPress={()=>setIsFilterModalVisible(true)}
          />
          <ScrollView contentContainerStyle={$listContentContainer} style={$listContainer}>
            {
              data.map((value, index)=>(
                <HistoryBox key={index} data={value}/>
              ))
            }
          </ScrollView>
        </>
      </View>
      <FilterModal visibility={isFilterModalVisibile} setVisibility={setIsFilterModalVisible}/>
    </Screen>
  )
})



// Styling zone
const {width, fontScale, height} = Dimensions.get("screen")
const $root: ViewStyle = {
  flex: 1,
  backgroundColor: '#041C25',
  alignItems: 'center',
  marginTop: StatusBar.currentHeight
}

const $title: TextStyle = {
  color: 'white',
  fontSize: 25 / fontScale,
  lineHeight: 25,
  marginTop: height*0.06,
  alignSelf: 'center',
  paddingBottom: 26
}

const $bodyContainer: ViewStyle = {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  width: width
}

const $emptyHistoryImage: ImageStyle = {
  width: width,
  height: height*0.35,
  marginTop: height*0.125
}

const $emptyHistoryText: TextStyle = {
  fontSize: 14 / fontScale,
  lineHeight: 20,
  textAlign: 'center',
  width: width*0.9,
  marginTop: height*0.1
}

const $filterButton: ViewStyle = {
  width: '90%',
  backgroundColor: "#838D92",
  marginTop: 17,
  borderRadius: 5
}

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlignVertical: 'center',
  lineHeight: 18
}

const $buttonPressed: ViewStyle = {
  backgroundColor: "#838D92",
  opacity: 0.7,
}

const $filterIconContainer: ViewStyle = {
  position: 'absolute',
  left: 10
}

const $filterIcon: ImageStyle = {
  width: 19,
  height: 19
}

const $listContentContainer: ViewStyle = {
  alignItems: 'center',
  gap: 12
}

const $listContainer: ViewStyle = {
  marginVertical: 17, 
  width: '90%'
}