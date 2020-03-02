import React, {Component} from 'react';
import { Image,
         Platform,
         StyleSheet,
         Text,
         TextInput,
         TouchableOpacity,
         Modal,
         View } from 'react-native';
import SpurTextInput from '../components/SpurTextInput'
import SpurText from '../components/SpurText'
import SpurButton from '../components/SpurButton'
import DatabaseManager from '../classes/DatabaseManager'

/** 
*   Creates a View with a text label and a text entry field
*   @param {Object} props - React props for internal Components
*   @param {string} props.text - Text for label
*   @param {function} props.onChangeText - callback to handle text input change
*   @param {Boolean} props.security - flag for a password field
**/
function inputField(props) {
    // for name, username, password fields
    return(
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 10}}>    
        <SpurText>{props.text}: </SpurText>
        <SpurTextInput secureTextEntry={props.security} onChangeText={props.onChangeText} />
        </View>
    );
}

/** Class for the User Login Screen **/
export default class UserLoginScreen extends Component<Props>
{
    /** 
     *  Displays a User SignUp / Log-In page for the app
     *  @constructor
     *  @param {Object} React props, only used by super class
    **/
    constructor(props) {
        super(props);

        this.databaseManager = new DatabaseManager();

        //remove default header bar for login
        this.props.navigation.setOptions({ headerTitle: 'SPUR', 
                                           headerStyle: {
                                            backgroundColor: '#96ca92',
                                           },
                                           headerTintColor: '#fff',
                                           headerTitleStyle: {
                                            fontWeight: 'bold',
                                            fontSize: 40,
                                           },
                                           headerTitleAlign: 'center',
                                         });
        // mock user database 
        const makeUser = function(n, u, p){return {name: n, username:u, password:p}};
        this.users = [makeUser("Pravin Visakan", "pvisakan", "hola_spur"), makeUser("Greg Lee", "glee", "gregiscool")];

        this.state = {
            name: "",
            email: "",
            password1: "",
            password2: "",
            login: false,
            success: false,
            failure: false,
            loading: false
        };
    }

    /** 
     *  Handler for changing the name input field
     *  @param {string} text - new text input
    **/
    handleName(text) {
        this.setState({name: text});
    };

    /** 
     *  Handler for changing the email input field
     *  @param {string} text - new text input
    **/
    handleEmail(text) {
        this.setState({email: text});
    };

    /** 
     *  Handler for changing the password1 input field
     *  @param {string} text - new text input
    **/
    handlePassword1(text) {
        this.setState({password1: text});
    };

    /** 
     *  Handler for changing the password2 input field
     *  @param {string} text - new text input
    **/
    handlePassword2(text) {
        this.setState({password2: text});
    }

    /** 
     *  Handler for the submit button
     *  Attempts to register the user or log the user in
    **/
    handleSubmit() {
        // Display a loading icon while processing the register/login request
        this.setState({loading: true});
        if (this.state.login) {
            this.databaseManager.registerUser()
            console.log("logging in");
        } else {
            console.log("signing up");
        }
    }

    /**
      * Sign-up / Login toggle function
    **/


    /** 
     *  React render function
    **/
    render() {
        return (
            <View style={styles.container}>

            {/* Success/Failure Modals */}
            <Modal
                visible={this.state.success}
            >
                <SpurText>Success!</SpurText>
                <SpurButton onPress={()=>{this.setState({success:false});
                              this.props.navigation.replace("Root");}} title="Close"/>
            </Modal>
            <Modal
                visible={this.state.failure}
                color="#DC6C7B"
            >
                <SpurText>Failure!</SpurText>
                <SpurButton onPress={()=>{this.setState({failure:false});}} title="Close"/>
            </Modal>
            
            {/* Title */}
            {this.state.login?<SpurText styles = {{textAlign: 'center',}}>Log In to SPUR!</SpurText>:<SpurText styles = {{textAlign: 'center',}}>Sign Up for SPUR!</SpurText>}
        
            {/* Text Fields */} 
            <View style={{}}>
            {!this.state.login && inputField({text:"Name", onChangeText: this.handleName.bind(this)})}
            {inputField({text:"Email", onChangeText: this.handleEmail.bind(this)})}
            {inputField({text:"Password", onChangeText: this.handlePassword1.bind(this), security:true})}
            {!this.state.login && inputField({text:"Confirm Password", onChangeText: this.handlePassword2.bind(this), security: true})}
            </View>

            {/*Submit Button*/}
            <SpurButton onPress={this.handleSubmit.bind(this)} title="Submit"/>

            {/*Switch Between Sign Up and Log In*/}
            { this.state.login?(<SpurText styles = {{textAlign: 'center',}}>No account yet?</SpurText>):(<SpurText styles = {{textAlign: 'center',}}>Have an account?</SpurText>)}
            
            { this.state.login?(<SpurButton onPress={()=>this.setState({login:false})} title="Sign Up"/>):(<SpurButton onPress={()=>this.setState({login:true})} title="Log In"/>)}

            </View>
        );
    }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
};
