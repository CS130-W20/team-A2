# Spur
An easy way to find small events close to you.

## Directory Structure
Spur/navigation: contains react navigation components<br/>
Spur/screens: contains the screens shown to the users<br/>
Spur/components: contains the various components used by the screens.

## Installation/Run instructions
Follow the instructions here to install expo-cli<br/>
[https://facebook.github.io/react-native/docs/getting-started](https://facebook.github.io/react-native/docs/getting-started)<br/>

After expo-cli is installed, enter the Spur root directory and run<br/>
`npm install` to install dependencies<br/>
`npm start` to start the project<br/>

You will need an android emulator running to run the project, which the link above explains how to install, or install the Expo app on
your phone to run it on your physical device.<br/>

You will also need to setup the database and APIs, which is detailed in the next section.

## Database/API Setup
Spur runs on Firebase Real-time Database. 
To run a local copy of Spur, create a new real-time database, then rename `FirebaseConfigExample.js` to `FirebaseConfig.js` inside Spur/constants and fill in the values in the config to the values provided by Google.<br/>

Inside Spur/app.json, fill in your Google Maps API key requested from Google.

## Tests
Tests can be found in the tests branch, located within the branch at Spur/\_\_tests\_\_<br/>
The specific tests are:<br/>
BrowseScreen-test.js<br/>
|__ State Change Tester<br/>
|__ Refine Search Tester<br/>
<br/>
Constants-test.js<br/>
|__ Constants Tester<br/>
<br/>
CreateScreen-test.js<br/>
|__ State Change Tester<br/>
|__ Event Validation Tester<br/>
<br/>
StyledText-test.js<br/>
|__ Renders Correctly Tester<br/>
<br/>
UserLoginScreen-test.js<br/>
|__ State Change Tester<br/>
<br/>


## Relevant Links 
- Documentation link: https://cs130-w20.github.io/team-A2/


