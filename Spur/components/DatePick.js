import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet, Keyboard} from 'react-native';
import {Input} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';


/**
 * Date Pick - Displays a modal to let users input a date or time
 */
const DatePick = (props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState(props.type);
  const [show, setShow] = useState(false);

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode(props.type);
    setShow(!show);
    props.onChange(date);
    Keyboard.dismiss();
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChange = (event, selectedDate) => {

    props.onChange(selectedDate);
    const currentDate = selectedDate || date;
    
    setDate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);

    
  };


  var placeholder = (props.type == 'date') ? 'Date' : 'Time';
  if (props.type == 'date') {
      placeholder = (props.time == '') ? placeholder : props.time.month + "/" + props.time.day;
  } else {
      placeholder = (props.time == '') ? placeholder : (props.time.hours % 12) + ":" + props.time.minutes + (props.time.hours < 12 ? ' am' : ' pm');
  }

  return (


    <View>
      <View>
        <Input
          placeholder={placeholder}
          onFocus={showDatepicker}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={-7 * 60}
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePick;