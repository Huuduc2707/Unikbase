/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, TouchableOpacity } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { ThreeDScan } from "3dscan-react"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ScanningScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Scanning">> {}

export const ScanningScreen: FC<ScanningScreenProps> = observer(function ScanningScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [visible, setVisible] = useState(false)

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="fixed">
      <TouchableOpacity style={styles.buttonContainer} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>SCAN</Text>
      </TouchableOpacity>
      {/* <ThreeDScan
        visible={visible}
        onScanDone={(photos) => {
          console.log(JSON.stringify(photos, null, 2))
          setVisible(false)
        }}
      /> */}
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
  },
})
