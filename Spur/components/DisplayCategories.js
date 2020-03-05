import {
    ButtonGroup} from 'react-native-elements'; 
import {
    Text} from 'react-native'; 
import React, { Component } from 'react';
import { CATEGORIES } from '../constants/categories'; 

export default class DisplayCategories extends Component<Props>
{
    constructor(props) {
        super(props); 
        this.state = {
            selectedIndex : 0,
            interests: this.props.interests
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    /**
     * Function that handles button presses for tags, which is nothing
     * @param {Int} - Index of the button pressed 
     */
    updateIndex (selectedIndex) {
        this.setState({selectedIndex: selectedIndex})
    }

    /**
     * Render DisplayCategories which displays the list of categories
     */
    render() {
        console.log("Print categories")
        var categories = CATEGORIES 
        var catMap = new Map() 
        categories.forEach(function(category) {
            catMap.set(category.id, category.name)
            category.children.forEach(function(child) {
                catMap.set(child.id, child.name)
            })
        })
        console.log(catMap.get(0))
        const buttons = this.state.interests.map(id => (
            <Text>{catMap.get(id)}</Text>
        ))
        const {selectedIndex} = this.state.selectedIndex
        return ( 
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
            />
        )
        /*
        return ( 
            <Text> Testing </Text>
        )
        */
        /*
        const comps = this.props.categories.map(category => (
            <Text> {category.name} </Text>
        ))
        const buttons = comps.map(comp => (
            {element: comp}
        ))
        const {selectedIndex} = this.state

        return ( 
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 100}}
            />
        )
        */
    }
}