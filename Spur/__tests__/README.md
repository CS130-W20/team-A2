The files in the /Spur/__tests__ folder (and their testing suites) are

BrowseScreen-test.js
|__ State Change Tester
|__ Refine Search Tester

Constants-test.js
|__ Constants Tester

CreateScreen-test.js
|__ State Change Tester
|__ Event Validation Tester

StyledText-test.js
|__ Renders Correctly Tester

UserLoginScreen-test.js
|__ State Change Tester


For the three "State Change Tester" suites, they test changes by following the same pattern.
First an instance of the component being unit tested is rendered (with default state as defined
by the constructor). Then, an event is created to represent user input. These events are passed into
event handler functions to simulate the interaction of user input with the interface. After these functions
are called, we use jest's matcher assertions to ensure that the state has been updated as expected.
An example of a test scenario is the test labelled "Successfully updates all state" in UserLoginScreen-test.
Here, the test oracle outcome is a resultant state

{
    name: "Mihir",
    username: "MihirMathur1",
    password: "ILoveUML<3"
}


For the Refine Search Tester used to test BrowseScreen's refineSearch function, we test by first updating
the state with search details. Once these search details are updated, we call the refineSearch() function to
check if the function updates eventList to only be populated with events relevant to the search query. An example
of a test scenario is the test labelled "Successfully filters" in BrowseScreen-test.js. Here, the test oracle outcome
should result in an eventList with only one event which has been filtered from the original 10. The list should be:

[{"attendees": "attendees5",
         "chat": "chat5",
         "checked_in": "checked_in5", 
         "details": {"categories": [], 
                    "cost": 5, 
                    "description": "description5", 
                    "endTime": "endTime5", 
                    "host": "host5", 
                    "location": 5000, 
                    "partySize": 5, 
                    "startTime": "startTime5", 
                    "title": "title5"}
 }]

 Additionally in Refine Search Tester, we checked the case where there were no events matching the criteria. This is important in
 covering all branch paths since it checks for the branches where no relevant events are found. Here, the test scenario "Return Empty
 List When No Events Match" has the oracle eventList [].


 For the Constants Tester in Constants-test, we simply check to see if the app is appropriately using the correct display settings
 and global values for color. For example, the test scenario "Layout Correct" has a test oracle which checks that Layout.window is {width, height} where width and height are values which have been dynamically calculated during this testing phase. This ensures that our application knows the correct screen size and will display appropriately.


 The Event Validation Tester in CreateScreen-test checks that after an event has been submitted by the user, the information given is
 appropriate and has semantic meaning. For instance, the test scenario "Rejects Invalid Time" creates an event and updates the state
 such that the starting time is "INVALID", which evidently does not match the regular expression for a valid time of day. We have used
 jest's mocking to create a mock function representing the Alert.alert function which displays a message on the user's screen when an error has occurred. The test oracle for this scenario is that the mock function should receive the alert "Invalid Start or End Time".
 We have created similar scenarios for each potential invalid input. This is important for coverage since there are many branches
 in this validation function which checks for various types of invalid input. 


The Renders Correctly Tester in StyledTest-text.js is included here to show an example of jest's snapshot feature. Here, we store a
snapshot (a JSON representation for the expected rendering of the StyledText component). This allows us to make sure that our components are rendering the way we expect them to. The test scenario "Renders Correctly" has the oracle which simply expects the
JSON rendering to match with the stored snapshot.
