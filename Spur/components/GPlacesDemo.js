import React, { Component } from 'react';
import RNGooglePlaces from 'react-native-google-places';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Alert,
    TouchableOpacity } from 'react-native';

export default class GPlacesDemo extends Component {
    openSearchModal() {
      RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
          console.log(place);
          // place represents user's selection from the
          // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
    }
   
    render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.openSearchModal()}
          >
            <Text>Pick a Place</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    map: {
      height: 400,
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'flex-end',
      alignItems: 'center',	
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: 'lightgrey',
      height: 50,
    },
    input: {
      height: 30,
      backgroundColor: 'lightgrey',
      paddingLeft: 15,
      paddingRight: 15,	
    },
    nameText: {
      height: 30,
      width: 100,
      backgroundColor: 'lightgrey',
      paddingLeft: 15,
      paddingRight: 15,	
    },
    formText: {
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
      margin: 5,
    },
    contentContainer: {
      paddingTop: 30,
    },
    descriptionText: {
      height: 100,
      width: 300,
      backgroundColor: 'lightgrey',
      paddingLeft: 15,
      paddingRight: 15  
    },
    textContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 5,
    },
  });
  