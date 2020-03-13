import * as React from 'react';
import renderer from 'react-test-renderer';
import JoinButton from '../components/JoinButton';

describe(`Join Button Tester`, () => {
    test('Join Button test', () => {
    
        const event = {};

        const isAttendee = false;
        const isCheckedIn = false;
        const eventId = '12345';
        const uid = '12345';
        const userName = 'Greg';
        const upcoming = ['1234'];

        const button = renderer.create(<JoinButton 
            event={event} 
            isAttendee={isAttendee} 
            isCheckedIn={isCheckedIn} 
            eventId={eventId}
            uid={uid}
            userName={userName}
            upcoming={upcoming}
            
            />).toJSON();
        expect(button).toMatchSnapshot();

    });

    test('Checkin Button test', () => {
    
        const event = {};

        const isAttendee = true;
        const isCheckedIn = false;
        const eventId = '12345';
        const uid = '12345';
        const userName = 'Greg';
        const upcoming = ['1234'];

        const button = renderer.create(<JoinButton 
            event={event} 
            isAttendee={isAttendee} 
            isCheckedIn={isCheckedIn} 
            eventId={eventId}
            uid={uid}
            userName={userName}
            upcoming={upcoming}
            
            />).toJSON();
        expect(button).toMatchSnapshot();

    });

    test('Checkin Time Invalid test', () => {
    
        const event = {};

        const isAttendee = true;
        const isCheckedIn = false;
        const eventId = '12345';
        const uid = '12345';
        const userName = 'Greg';
        const upcoming = ['1234'];
        const startTime = {
            hours: 24,
            minutes: 60
        }

        const button = renderer.create(<JoinButton 
            event={event} 
            isAttendee={isAttendee} 
            isCheckedIn={isCheckedIn} 
            eventId={eventId}
            uid={uid}
            userName={userName}
            upcoming={upcoming}
            
            />).toJSON();
        expect(button).toMatchSnapshot();

    });

    test('Checked In Test', () => {
    
        const event = {};

        const isAttendee = true;
        const isCheckedIn = true;
        const eventId = '12345';
        const uid = '12345';
        const userName = 'Greg';
        const upcoming = ['1234'];

        const button = renderer.create(<JoinButton 
            event={event} 
            isAttendee={isAttendee} 
            isCheckedIn={isCheckedIn} 
            eventId={eventId}
            uid={uid}
            userName={userName}
            upcoming={upcoming}
            
            />).toJSON();
        expect(button).toMatchSnapshot();

    });

});