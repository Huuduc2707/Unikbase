const en = {
  common: {
    button: {
    createAccount: "CREATE ACCOUNT",
    continue: "CONTINUE",
    emailSignIn: "Sign in with Email",
    phoneNumberSignIn: "Sign in with Phone Number",
    googleSignIn: "Continue with Google",
    facebookSignIn: "Continue with Facebook",
    verify: "VERIFY",
    done: "DONE",
    submit: "SUBMIT",
    removeWalletAndProceed: "REMOVE WALLET AND PROCEED",
    cancel: "CANCEL"
   },
   error: {
      invalidUsername: "Your username is invalid.",
      duplicatedUsername: "Username is already taken. Please try again.",
      invalidEmail: "Your email address is invalid.",
      duplicatedEmail: "This email already in use. Please enter another email.",
      invalidPhoneNumber: "Your phone number is invalid.",
      duplicatedPhoneNumber: "This phone number is already in use. Please enter another phone number.",
      invalidPassword: "Kindly ensure that your password consists of at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.",
      mismatchConfirmPassword: "Password fields must match.",
      uncheckedCheckbox: "Please read and accept our policies to continue.",
      incorrectEmailOrPassword: "Incorrect email or password.",
      incorrectPhoneNumberOrPassword: "Incorrect phone number or password.",
      verifyEmailFailed: "Verify email failed!",
      verifyPhoneNumberFailed: "Verify phone number failed!",
      noResultFound: "No result matches the given keyword."
    },
    success: {
      verifyEmailSuccess: "Verify email success!",
      verifyPhoneNumberSuccess: "Verify phone number success!"
    },
    inputPlaceholder: {
      username: "Username",
      email: "Email",
      phoneNumber: "Phone number",
      password: "Password",
      confirmPassword: "Confirm Password",
      countryName: "Country name"
    },
    textAndLink: {
      privacyPolicies: "Privacy Policies",
      termAndCondition: "Terms and Conditions",
      hasAccountQuestion: "Already using Unikbase?",
      signIn: "Sign in",
      forgotPassword: "Forgot your password?",
      createAccountQuestion: "New to Unikbase?",
      createAccount: "Create an account",
      welcomeText: "Welcome to Unikbase!",
      informEmailCodeText: "We have sent a 6-character code to {{email}}. The code expires shortly, so please enter it soon.",
      informPhoneNumberCodeText: "We have sent a 6-character code to {{phoneNumber}}. The code expires shortly, so please enter it soon.",
      checkSpamFolder: "Can't find your code? Check your spam folder!",
      warning: "Hey there, just a heads up!"
    },
    formName: {
      createAccount: "Create Account",
      signIn: "Sign in",
      emailVerification: "Check your email for a code",
      phoneNumberVerification: "Check your mobile for a code",
      congratulations: "Congratulations!"
    },
    formLabel: {
      email: "Email",
      phoneNumber: "Phone number",
      password: "Password"
    }
  },
  // welcomeScreen: {
  //   postscript:
  //     "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
  //   readyForLaunch: "Your app, almost ready for launch!",
  //   exciting: "(ohh, this is exciting!)",
  // },
  // errorScreen: {
  //   title: "Something went wrong!",
  //   friendlySubtitle:
  //     "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
  //   reset: "RESET APP",
  // },
  // emptyStateComponent: {
  //   generic: {
  //     heading: "So empty... so sad",
  //     content: "No data found yet. Try clicking the button to refresh or reload the app.",
  //     button: "Let's try this again",
  //   },
  // },
  loginScreen: {
   informText: "Create your account or sign into an existing account to build and manage your digital twins."
  },
  registerScreen: {
    accept: "Accept",
    and: "and",
  },
  completeVerificationScreen: {
    completionInformText: "You've successfully verified your Unikbase account. Process now to fully enjoy our awesome features!",
    instructionText: "For lost email or forgotten email address. You can change and verify your details under Setting > Security & Privacy."
  },
  forgotPasswordModal: {
    instruction: "Enter your email address to reset your password. You may need to check your spam folder or unblock no-reply@unikbase.com",
    warning: "If you proceed, your current wallet and account will be permanently removed. To recover them, you will need your username and password - Unikbase won't be able to assist you with this."
  }
}

export default en
export type Translations = typeof en
