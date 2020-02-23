# Spur
An easy way to find small events close to you.

## Directory Structure
Spur/navigation: contains react navigation components<br/>
Spur/screens: contains the screens shown to the users

## Installation/Run instructions
[https://facebook.github.io/react-native/docs/getting-started](https://facebook.github.io/react-native/docs/getting-started)<br/>
`npm install -g expo-cli`<br/>
then enter Spur root directory and run<br/>
`npm start`

## Database Setup
Spur runs on Firebase Real-time Database. 
To run a local copy of Spur, create a new real-time database, then rename `FirebaseConfig.js.example` to `FirebaseConfig.js` and fill in the values in the config to the values provided by Google. 

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


