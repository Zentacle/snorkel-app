import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

import SliderComp from '_components/ui/Slider';

const DateTimeDepth = () => {
  const [date, setDate] = React.useState(new Date());

  const onChange = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.labelText}>Date</Text>
        <DatePicker date={date} mode="date" onDateChange={onChange} />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.labelText}>Start Time</Text>
        <DatePicker date={date} mode="time" onDateChange={onChange} />
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>Time in Water. Min</Text>
          <Text style={styles.labelText}>45 min</Text>
        </View>
        <SliderComp />
      </View>

      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>Max Depth. ft</Text>
          <Text style={styles.labelText}>40</Text>
        </View>
        <SliderComp />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6F9',
    paddingHorizontal: 25,
  },
  dateContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  timeContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  labelText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  labelTextContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DateTimeDepth;
