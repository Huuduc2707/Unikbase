/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { MainPageNavigator, MainPageNavigatorParamList } from "./MainPageNavigator"
import { colors } from "app/theme"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  Login: undefined
	Register: undefined
	EmailSignIn: undefined
	PhoneSignIn: undefined
	EmailVerifyAccount: undefined
	PhoneVerifyAccount: undefined
	CompleteVerifyAccount: undefined
  MainPage: NavigatorScreenParams<MainPageNavigatorParamList>
	Details: undefined
	ChangePassword: undefined
	Language: undefined
	Account: undefined
	ScanNfcTag: undefined
	Faq: undefined
	PrivacyPolicy: undefined
	TermsAndConditions: undefined
	DigitalTwin: undefined
	Document: undefined
	ImageDetail: undefined
	SelectCoverImage: undefined
	Gallery: undefined
	Specification: undefined
	Object: undefined
	Scan3D: undefined
	TransferDigitalTwin: undefined
	ShareTwinInfo: undefined
	LinkNfcTag: undefined
	VerifyNfcTag: undefined
	NfcLink: undefined
	Scanning: undefined
	// IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName="Login"
    >
      	{/** 🔥 Your screens go here */}
    	<Stack.Screen name="Login" component={Screens.LoginScreen} />
		<Stack.Screen name="Register" component={Screens.RegisterScreen} />
		<Stack.Screen name="EmailSignIn" component={Screens.EmailSignInScreen} />
		<Stack.Screen name="PhoneSignIn" component={Screens.PhoneSignInScreen} />
		<Stack.Screen name="EmailVerifyAccount" component={Screens.EmailVerifyAccountScreen} />
		<Stack.Screen name="PhoneVerifyAccount" component={Screens.PhoneVerifyAccountScreen} />
		<Stack.Screen name="CompleteVerifyAccount" component={Screens.CompleteVerifyAccountScreen} />
      	<Stack.Screen name="MainPage" component={MainPageNavigator} />
		<Stack.Screen name="Details" component={Screens.DetailsScreen} />
		<Stack.Screen name="ChangePassword" component={Screens.ChangePasswordScreen} />
		<Stack.Screen name="Language" component={Screens.LanguageScreen} />
		<Stack.Screen name="Account" component={Screens.AccountScreen} />
		<Stack.Screen name="ScanNfcTag" component={Screens.ScanNfcTagScreen} />
		<Stack.Screen name="Faq" component={Screens.FaqScreen} />
		<Stack.Screen name="PrivacyPolicy" component={Screens.PrivacyPolicyScreen} />
		<Stack.Screen name="TermsAndConditions" component={Screens.TermsAndConditionsScreen} />
		<Stack.Screen name="DigitalTwin" component={Screens.DigitalTwinScreen} />
		<Stack.Screen name="Document" component={Screens.DocumentScreen} />
		<Stack.Screen name="ImageDetail" component={Screens.ImageDetailScreen} />
		<Stack.Screen name="SelectCoverImage" component={Screens.SelectCoverImageScreen} />
		<Stack.Screen name="Gallery" component={Screens.GalleryScreen} />
		<Stack.Screen name="Specification" component={Screens.SpecificationScreen} />
		<Stack.Screen name="Object" component={Screens.ObjectScreen} />
		<Stack.Screen name="Scan3D" component={Screens.Scan3DScreen} />
		<Stack.Screen name="TransferDigitalTwin" component={Screens.TransferDigitalTwinScreen} />
		<Stack.Screen name="ShareTwinInfo" component={Screens.ShareTwinInfoScreen} />
		<Stack.Screen name="LinkNfcTag" component={Screens.LinkNfcTagScreen} />
		<Stack.Screen name="VerifyNfcTag" component={Screens.VerifyNfcTagScreen} />
		<Stack.Screen name="NfcLink" component={Screens.NfcLinkScreen} />
			<Stack.Screen name="Scanning" component={Screens.ScanningScreen} />
			{/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
