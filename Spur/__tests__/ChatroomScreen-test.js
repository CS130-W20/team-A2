import * as React from 'react';
import renderer from 'react-test-renderer';
import ChatroomScreen from '../screens/ChatroomScreen';

describe(`Chatroom Tester`, () => {
    test('Navigation works correctly', () => {

        const params = {
            id: '12345',
            title: 'Banana Contest',
            userID: '12345',
            userName: 'Greg',
        }

        const route = {
            params: params
        }

        const chatRef = {
            off: jest.fn(),
            on: jest.fn(),
            push: jest.fn()
        }

        const profileScreen = renderer.create(<ChatroomScreen route={route} chatRef={chatRef} />);
        const instance = profileScreen.getInstance();

        instance.onSend(['Hello world']);
        instance.componentDidMount();
        instance.renderBubble();
        instance.componentWillUnmount();
        



    });
  });