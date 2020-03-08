import React, {Component} from 'react';
import { 
         ActivityIndicator,
         Image,
         Platform,
         StyleSheet,
         TouchableOpacity,
         Modal,
         View ,
         YellowBox } from 'react-native';

import {Text, Input, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpurTextInput from '../components/SpurTextInput'
import SpurText from '../components/SpurText'
import SpurButton from '../components/SpurButton'
import DatabaseManager from '../classes/DatabaseManager'
import User from '../classes/User'

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
        <Input 
            secureTextEntry={props.security}
            onChangeText={props.onChangeText}
            placeholder={props.text}
            onBlur={props.onBlur}
            errorMessage={props.errorMessage}
            label={props.label}
            rightIcon={{ type: 'font-awesome', name: props.icon }}
        />
        </View>
    ); 
    

}

/** Class for the User Login Screen **/
export default class UserLoginScreen extends Component<Props> {
    /** 
     *  Displays a User SignUp / Log-In page for the app
     *  @constructor
     *  @param {Object} React props, only used by super class
    **/
    constructor(props) {
        super(props);

        this.databaseManager = new DatabaseManager();

        YellowBox.ignoreWarnings(['Setting a timer']);

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

        this.state = {
            name: "",
            email: "",
            password1: "",
            password2: "",
            login: true,
            success: false,
            failure: false,
            errorMsg: "",
            loading: false,

            nameInvalid: false,
            emailInvalid: false,
            passwordMismatch: false,
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

    /*
    * Checks that the user's name is nonempty
    */
    validateName = () => {
        if (this.state.name == '') {
            this.setState({nameInvalid: true});
        } else {
            this.setState({nameInvalid: false});
        }
    }

    /*
    * Checks that the user's email is nonempty
    */
    validateEmail = () => {
        if (this.state.email == '') {
            this.setState({emailInvalid: true});
        } else {
            this.setState({emailInvalid: false});
        }
    }

    /*
    * Checks that the user's two passwords match
    */
    validatePasswords = () => {
        if (this.state.password1 != this.state.password2) {
            this.setState({passwordMismatch: true});
        } else {
            this.setState({passwordMismatch: false});
        }
    }

    /**
     * Attempts to register a new user using the values of the input fields
     */
    handleRegister() {
        // Verify that all fields exist
        if (this.state.nameInvalid || this.state.emailInvalid || this.state.password1 === "" || this.state.password2 === "") {
            this.setState({failure: true, 
                           errorMsg: "Please make sure that you have filled out every field.",
                           loading: false});
            return;
        }

        // Verify that the two passwords match
        if (this.state.password1 !== this.state.password2) {
            this.setState({failure: true, 
                           errorMsg: "Please make sure that the passwords match.",
                           loading: false})
            return;
        }

        // Pass user registration onto Firebase
        this.databaseManager.registerUser(this.state.email, this.state.password1)
                            .then(authUser => {
                                var user = new User(this.state.name);
                                return this.databaseManager.updateUser(authUser.user.uid, user);
                            })
                            .then(() => {
                                this.setState({success: true, 
                                               loading: false});
                                this.props.navigation.replace("Root");
				//this.props.navigation.replace("Root")
                            })
                            .catch(error => {
                                // Error, show the user the error message
                                this.setState({failure: true, 
                                               loading: false, 
                                               errorMsg: error.message})
                            });
    }

    /**
     * Attempts to log the user in using the provided credentials
     */
    handleLogin() {
        // Verify that fields are filled out
        if (this.state.email === "" || this.state.password1 === "") {
            this.setState({failure: true,
                           loading: false,
                           errorMsg: "Please fill out all fields."})
            return;
        }

        return this.databaseManager.login(this.state.email, this.state.password1)
                                   .then(authUser => {
                                        this.setState({success: true,
                                                       loading: false});
                                        this.props.navigation.replace("Root");
                                   })
                                   .catch(error => {
                                        this.setState({failure: true, 
                                                       loading: false,
                                                       errorMsg: error.message});
                                   })
    }

    /** 
     *  Handler for the submit button
     *  Attempts to register the user or log the user in
    **/
    handleSubmit() {
        this.setState({
            loading: true
        });
        if (this.state.login) {
            this.handleLogin();
        } else {
            this.handleRegister();
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
                <Overlay isVisible={this.state.failure} height="15%" onBackdropPress={() => this.setState({failure: false})}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color:"#ff0000"}}>{this.state.errorMsg}</Text>
                    </View>
                </Overlay>

                <Overlay isVisible={this.state.loading} height="25%" >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                </Overlay>

                {/* Title */}
                {this.state.login?<SpurText styles = {{textAlign: 'center',}}>Log In to SPUR!</SpurText>:<SpurText styles = {{textAlign: 'center',}}>Sign Up for SPUR!</SpurText>}
            
                {/* Text Fields */} 
                <View style={{}}>
                {!this.state.login && 
                    inputField({
                        text:"Name",
                        icon:"user",
                        onBlur: this.validateName, 
                        onChangeText: this.handleName.bind(this),
                        errorMessage: this.state.nameInvalid ? 'Please enter a valid name' : '',
                    })
                }
                {inputField({
                    text:"Email", 
                    icon:"envelope", 
                    onBlur: this.validateEmail, 
                    onChangeText: this.handleEmail.bind(this),
                    errorMessage: this.state.emailInvalid ? 'Please enter a valid email' : '',
                    })
                }
                {!this.state.login && 
                    inputField({
                        text:"Password", 
                        onChangeText: this.handlePassword1.bind(this), security:true
                    })
                }
                {this.state.login && 
                    inputField({
                        text:"Password", 
                        icon:"unlock", 
                        onChangeText: this.handlePassword1.bind(this), security:true
                    })
                }
                {!this.state.login && 
                    inputField({
                        text:"Confirm Password", 
                        onBlur: this.validatePasswords, 
                        onChangeText: this.handlePassword2.bind(this), 
                        errorMessage: this.state.passwordMismatch ? "Passwords don't match" : "",
                        security: true
                    })
                }
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
