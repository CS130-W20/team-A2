// Tests for the Constants
import * as React from 'react';
import renderer from 'react-test-renderer';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Dimensions } from 'react-native';


describe('Constants Test', () => {
    test('Layout correct', () => {
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;

        expect(Layout.window).toStrictEqual({width, height});

    });


    test('Colors correct', () => {

        const tintColor = '#2f95dc';
        
        expect(Colors).toStrictEqual({tintColor: '#2f95dc',
            tabIconDefault: '#ccc',
            tabIconSelected: tintColor,
            tabBar: '#fefefe',
            errorBackground: 'red',
            errorText: '#fff',
            warningBackground: '#EAEB5E',
            warningText: '#666804',
            noticeBackground: tintColor,
            noticeText: '#fff',});

    });

});