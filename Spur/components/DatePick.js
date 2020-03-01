import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChange = (event, selectedDate) => {

    console.log(selectedDate);

    props.onChange(selectedDate);
    const currentDate = selectedDate || date;
    
    setDate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);

    
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title={props.text} />
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