import * as React from 'react';
import renderer from 'react-test-renderer';
import ChatScreen from '../screens/ChatScreen';

describe(`Chat Screen Tester`, () => {
    test('Chat Screen Renders correctly', () => {
    
        const joinedEventsRef = {
            on: jest.fn()
        }

        const userRef = {
            once: jest.fn()
        }

        const eventsRef = {
            off: jest.fn()
        }

        const chatScreen = renderer.create(<ChatScreen eventsRef={eventsRef} userRef={userRef} joinedEventsRef={joinedEventsRef} />);
        const instance = chatScreen.getInstance();

        instance.componentDidMount();
        instance.componentWillUnmount();
        

    });
  });