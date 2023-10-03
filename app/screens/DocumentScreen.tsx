/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-shorthand */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, ImageStyle, TextStyle, Dimensions, StatusBar, ImageSourcePropType, FlatList } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Icon, DocumentBox2, NewDocumentNameModal, DeleteDocumentModal, AddDocumentModal } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { TxKeyPath } from "app/i18n"
// import { useStores } from "app/models"

interface Document{
  category: TxKeyPath
  image?: ImageSourcePropType
  documentName: string
  fileName: string
  createdDay: Date
}

interface DocumentScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Document">> {}

export const DocumentScreen: FC<DocumentScreenProps> = observer(function DocumentScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation()
  const [isNewDocumentNameModalVisible, setIsNewDocumentNameModalVisible] = useState(false)
  const [isDeleteDocumentModalVisible, setIsDeleteDocumentModalVisible] = useState(false)
  const [isAddDocumentModalVisible, setIsAddDocumentModalVisible] = useState(false)

  const data: Document[] = [
    {category: "common.formLabel.certificate", documentName: "Document Name", fileName: "File-name.jpg", createdDay: new Date("2023-09-18T11:12:12")},
    {category: "common.formLabel.coverImage", image: require("../../assets/images/coverChair.png"), documentName: "Document Name", fileName: "File-name.jpg", createdDay: new Date("2023-09-15T13:12:12")},
    {category: "common.formLabel.invoice", documentName: "Document Name", fileName: "File-name.jpg", createdDay: new Date("2023-09-11T14:12:12")},
    {category: "common.formLabel.gallery3D", image: require("../../assets/images/chair.png"), documentName: "Document Name", fileName: "File-name.jpg", createdDay: new Date("2023-08-22T12:12:12")},
  ]

  return (
    <Screen style={$root} preset="fixed">
      {/* Header title */}
      <View style={$headerContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate("DigitalTwin")}>
          <Icon style={$leftHeaderIcon} icon="caretLeft2" />
        </TouchableOpacity>
        <Text style={$title} tx={"mainpageNavigator.tabName.document"}/>
        <TouchableOpacity style={{opacity: !isAddDocumentModalVisible?1:0}} activeOpacity={0.7} onPress={()=>setIsAddDocumentModalVisible(true)}>
          <Icon style={$rightHeaderIcon} icon="add" />
        </TouchableOpacity>
      </View>

      {/* Body */} 
      <FlatList
        style={$bodyContainer}
        contentContainerStyle={$bodyContentContainer}
        data={data}
        keyExtractor={(item)=>JSON.stringify(item)}
        renderItem={({item:value, index})=> (
          <DocumentBox2 
            key={index} 
            category={value.category} 
            image={value.image} 
            documentName={value.documentName} 
            fileName={value.fileName} 
            createdDay={value.createdDay}
            setNewDocumentNameModalVisibility={setIsNewDocumentNameModalVisible}
            setDeleteDocumentModalVisibility={setIsDeleteDocumentModalVisible}
          />
        )}
      />
      <NewDocumentNameModal visibility={isNewDocumentNameModalVisible} setVisibility={setIsNewDocumentNameModalVisible}/>
      <DeleteDocumentModal visibility={isDeleteDocumentModalVisible} setVisibility={setIsDeleteDocumentModalVisible}/>
      <AddDocumentModal visibility={isAddDocumentModalVisible} setVisibility={setIsAddDocumentModalVisible}/>
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
  marginTop: 22,
  backgroundColor: 'white'
}

const $bodyContentContainer: ViewStyle = {
  flexGrow: 1,
  paddingVertical: 21,
  paddingHorizontal: width*0.04,
  gap: 12
}