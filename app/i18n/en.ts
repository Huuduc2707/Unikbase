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
    cancel: "CANCEL",
    createDigitalTwin: "CREATE DIGITAL TWIN",
    clearAll: "ClearAll",
    apply: "APPLY",
    confirm: "CONFIRM"
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
      countryName: "Country name",
      search: "Search",
      createAt: "Created At",
      operator: "Operator"
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
      congratulations: "Congratulations!",
      search: "Search"
    },
    formLabel: {
      email: "Email",
      phoneNumber: "Phone number",
      password: "Password",
      username: "Username",
      mobilePhone: "Mobile Phone",
      language: "Language",
      unit: "Unit",
      account: "Account",
      firstName: "First Name",
      lastName: "Last Name",
      profileImage: "Profile Image",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password"
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
  },
  mainpageNavigator: {
    tabLabel: {
      wallet: "Wallet",
      history: "History",
      profile: "Profile",
      more: "More"
    },
    tabName: {
      tokenHistory: "Token History",
      profile: "Profile",
      more: "More",
      scanNFCTag: "Scan NFC Tag",
      FAQ: "FAQ",
      privacyPolicy: "Privacy Policy",
      termAndCondition: "Terms & Conditions",
      logout: "Logout"
    },
    wallet: {
      copied: "Copied to clipboard !",
      titleBar: "My Digital Twins",
      emptyWallet: "Here is where you can access and manage the Digital Twins you've created.",
      checkboxFieldTitle: {
        digitalTwinStatus: "DigitalTwin Status",
        tokenStatus: "Token Status",
        tokenOperatorStatus: "Token Operator Status"
      },
      checkBoxValue: {
        active: "Active",
        transferring: "Transferring",
        refused: "Refused",
        private: "Private",
        shared: "Shared",
        public: "Public",
        owned: "Owned",
        managed: "Managed"
      }
    },
    history: {
      emptyHistory: "Here is where you will find your transaction history, you haven't made any transactions yet."
    },
    profile: {
      headerBarLabel: {
        details: "Details",
        password: "Password",
        language: "Language",
        account: "Account"
      },
      edit: "edit"
    },
    more: {
      logout: "Are you sure you want to logout?",
      scanNFCTag: {
        readyToScan: "Ready to Scan",
        scanInform: "Hold your device near the NFC tag on the object to scan."
      },
      FAQ: {
        frequentlyAskedQuestion: "Frequently Asked Questions",
        introText: "A short introdction to digital twins: everything you need to know when signing up for Unikbase solution. If you cannot find the answer you are looking for, please contact our support.",
        question: {
          question1: "What is a DigitalTwin?",
          question2: "What are some important things to know about digital twins?",
          question3: "What make my digital twin behave like a passport, and why?",
          question4: "I own avaluable: Why own a digital twin of it?",
          question5: "I'm a merchant: why propose digital twins to my customers?",
          question6: "How are my digital twin and my real-life collectible connected?",
          question7: "Can I use my digital twin to insure my valuable, or to report it stolen?",
          question8: "What are the environmental costs of creating a digital twin?",
          question9: "What is a Blockchain?"
        },
        answer: {
          shortAnswer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu sem convallis, aliquet nisi quis, semper risus. Morbi sed magna augue.",
          mediumAnswer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu sem convallis, aliquet nisi quis, semper risus. Morbi sed magna augue. In finibus tortor nec consequat ultrices. Mauris dapibus condimentum est et sagittis. Morbi erat augue, fringilla vitae interdum ut, congue eu augue. Phasellus lacinia mollis dui, id porta nulla. Maecenas vitae molestie nibh. Morbi id finibus massa. Nullam non turpis venenatis, placerat lorem at, tristique erat. Aliquam eu magna vel orci varius mattis. Donec varius nulla eget turpis maximus pretium. Curabitur a malesuada turpis, ac posuere nibh. Pellentesque porta justo vitae turpis laoreet ullamcorper. In hac habitasse platea dictumst. Fusce sit amet erat consectetur, aliquet ipsum vel, aliquam neque. Ut ut augue justo. Suspendisse potenti. Vestibulum blandit, mauris non auctor mattis, felis mi tempor massa, suscipit scelerisque elit diam a neque.",
          longAnswer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu sem convallis, aliquet nisi quis, semper risus. Morbi sed magna augue. In finibus tortor nec consequat ultrices. Mauris dapibus condimentum est et sagittis. Morbi erat augue, fringilla vitae interdum ut, congue eu augue. Phasellus lacinia mollis dui, id porta nulla. Maecenas vitae molestie nibh. Morbi id finibus massa. Nullam non turpis venenatis, placerat lorem at, tristique erat. Aliquam eu magna vel orci varius mattis. Donec varius nulla eget turpis maximus pretium. Curabitur a malesuada turpis, ac posuere nibh. Pellentesque porta justo vitae turpis laoreet ullamcorper. In hac habitasse platea dictumst. Fusce sit amet erat consectetur, aliquet ipsum vel, aliquam neque. Ut ut augue justo. Suspendisse potenti. Vestibulum blandit, mauris non auctor mattis, felis mi tempor massa, suscipit scelerisque elit diam a neque. Sed tempus nulla ac lectus gravida, sit amet consectetur sem cursus. Nullam dolor lorem, ultricies vitae urna vitae, vehicula aliquam sapien. Cras semper enim in lectus dignissim varius. Cras rutrum arcu ac libero vehicula accumsan. Aenean feugiat nisl nec aliquam dictum. Vivamus dignissim, mi quis ultricies gravida, enim ante pretium nunc, vitae maximus eros nisi sodales purus."
        }, 
      },
      privacyAndPolicy: {
        intro: "We at UNIKBASE are committed to protecting your privacy. This Privacy Policy applies to both our Website and our Subscription Service (the Subscription Service). This Privacy Policy governs our data collection, processing and usage practices. It also describes your choices regarding use, access and correction of your personal information. If you do not agree with the data practices described in this Privacy Policy, you should not use the Website or the Subscription Service. We encourage you to review this Privacy Policy periodically. If you have any question about this Privacy Policy or our treatment of the information you provide us, please write to us by email at hello@unikbase.com or by mail to UNIKBASE, 320 RUE SAINT HONORE 75001 PARIS 1, RCS Paris 922 272 794, Attn: Privacy.",
        policyHeader: {
          header1: "USE OF THE SUBSCRIPTION SERVICE",
          header2: "INFORMATION WE COLLECT"
        },
        policySubHeader: {
          subHeader1: "When you visit our website"
        },
        policyContent: {
          content1: "The UNIKBASE Subscription Service allows us to create and share marketing, sales and customer service content. The Subscription Service can also be used to help organize sales data about a company's sales pipeline (e.g., leads, customers, token deals, etc.). The information added to the Subscription Service, either by site visitors providing their contact information or when a Subscription Service user adds the information, is stored and managed on our service providers' servers. The information is then used to contact visitors about their in the company's goods and interact with the company. Information that we collect and manage using the Subscription Service for our own marketing belongs to us and is used, disclosed and protected according to this Privacy Policy.",
          content2: "You are free to explore the Website without providing any Personal Information about yourself. When you visit the Website or register for the Subscription Service, we request that you provide Personal Information about yourself, and we collect Navigational information."
        }
      },
      termAndCondition: {
        termOfUse: "Terms of use",
        header: {
          header1: "TERMS OF USE",
          header2: "LEGAL NOTICE",
          header3: "COPYRIGHT, TRADEMARKS AND OTHER INTELLECTUAL PROPERTY RIGHTS",
          header4: "WARRANTY AND LIABILITY EXCLUSIONS"
        },
        content: {
          content1: "The purpose of these Terms of Use is to define the terms and conditions of access and use ofthe site https://www.unikbase.com (hereinafter the \"Site\").The use of the Site is subject to compliance with these Terms of Use, which all users acknowledge that they accept unreservedly by the mere fact of accessing the said Site. Any user who does not wish to be bound by these Terms of Use must immediately renounce remaining on the Site and immediately cease using it.",
          content2: "The Site is published by Unikbase, a company with a capital of 350,000 euros and whose registered office is located at 320 RUE SAINT HONORE 75001 PARIS 1, RCS 922 272 794, which can be reached at hello@unikbase.com (hereinafter \"UNIKBASE\"). The Site is hosted by MANATY whose registered office is located at xxx and can be reached at cotact@manaty.com",
          content3: "This Site and its contents are protected by copyright and/or other intellectual property rights which are the property of UNIKBASE or third parties.The reproduction and use of the elements of this Site (and any information incorporated therein such as, without limitation, articles, graphic images, photographs, diagrams, video recordings...) are authorised provided that :-this reproduction and use are strictly for information, non-commercial purposes within your organisation to enable you to get to know UNIKBASE better; and,- all mentions of UNIKBASE and in particular copyright notices appear on any reproduction; and,-the elements and information are not modified in whole or in part and in any way what soeeer; and- any other right of reproduction and/or use is expressly prohibited. In addition, some of the names mentioned may be protected by trademarks that are the property of UNIKBASE or third parties without necessarily mentioning this protection.",
          content4: "The elements of this Site are provided for general information purposes only and cannot be used as a basis for any transaction. All or any of the information published on this Site is provided \"as is\"without warranty of."
        }
      }
    }
  }
}

export default en
export type Translations = typeof en
