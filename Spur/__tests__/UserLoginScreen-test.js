// Tests for the User Login Page
import * as React from 'react';
import renderer from 'react-test-renderer';
import UserLoginScreen from '../screens/UserLoginScreen';


describe("State Change Tester", () =>  {
    test("Successfully updates name", () => {

        const userLogin = renderer.create(<UserLoginScreen />);
        const instance = userLogin.getInstance();

        // Create an event that represents user inputting a name
        const name = 'Mihir'

        

        // Mock the event handler
        instance.handleName(name);

        console.log(instance.state);

        // Check that the name is updated
        expect(instance.state.name).toBe('Mihir');

        // Check that no other state is changed
        expect(instance.state.username).toBe('');
        expect(instance.state.password).toBe('');

    });

    test("Successfully updates all state", () => {

        const userLogin = renderer.create(<UserLoginScreen />);
        const instance = userLogin.getInstance();

        // Create an event that represents user inputting a name
        const name = 'Mihir'
        const username = 'MihirMathur1'
        const password = 'ILoveUML<3'

        // Mock all event handler
        instance.handleName(name);
        instance.handleUsername(username);
        instance.handlePassword(password);


        // Check that all state has been updated
        expect(instance.state.name).toBe('Mihir');
        expect(instance.state.username).toBe('MihirMathur1');
        expect(instance.state.password).toBe('ILoveUML<3');

    });


});