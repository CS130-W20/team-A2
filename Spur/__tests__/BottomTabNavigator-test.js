import * as React from 'react';
import renderer from 'react-test-renderer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import LinksScreen from '../screens/LinksScreen';
import useLinking from '../navigation/useLinking';
import { NavigationContainer } from '@react-navigation/native';

describe("State Change Tester", () =>  {
    test("Successfully updates name", () => {

        /*const navigator = renderer.create(<NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>);*/

        const containerRef = React.useRef();
        const [initialNavigationState, setInitialNavigationState] = React.useState();
        //const initialNavigationState = {b: 'hello'};
        const nav = renderer.create<NavigationContainer ref={containerRef} initialState={initialNavigationState}>
        <Stack.Navigator>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>);

        

        //console.log(navigator.toJSON());
        //console.log(navigator.INITIAL_ROUTE_NAME);
        // Check that the name is updated
        //expect(navigator.INITIAL_ROUTE_NAME).toBe('Create');


    });
});