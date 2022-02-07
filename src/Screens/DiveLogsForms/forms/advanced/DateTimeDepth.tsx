import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Field } from 'react-final-form';

import DateTime from '_components/ui/DateTime';
import SliderComp from '_components/ui/Slider';
import { DateTimeMode } from '_screens/DiveLogsForms/utils/interfaces';

const DateTimeDepth = () => {
  return (
    <View style={styles.container}>
      <Field
        name="startDate"
        component={DateTime}
        label="Date"
        mode={DateTimeMode.date}
      />
      <Field
        name="startTime"
        component={DateTime}
        label="Time"
        mode={DateTimeMode.time}
      />

      <View style={{ marginTop: 30 }}>
        <Field
          name="timeInWater"
          label="Time in Water . Min"
          component={SliderComp}
          trackMarks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]}
          benchMarks={[0, 60, 120]}
          minimumValue={0}
          maximumValue={120}
        />
      </View>

      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Field
          name="maxDepth"
          label="Max Depth. Ft"
          component={SliderComp}
          trackMarks={[0, 20, 40, 60, 80, 100, 120, 140, 160]}
          benchMarks={[0, 80, 160]}
          minimumValue={0}
          maximumValue={160}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6F9',
    paddingHorizontal: 25,
  },
});

export default DateTimeDepth;
