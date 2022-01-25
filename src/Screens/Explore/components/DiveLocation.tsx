import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

import Button from '_components/ui/Buttons/Button';

interface Activity {
  label: string;
  values: string[];
}

const activities: Activity[] = [
  {
    label: 'Activity',
    values: ['Scuba', 'Snorkel', 'Free'],
  },
  {
    label: 'Entry',
    values: ['Shore', 'Water'],
  },
  {
    label: 'Tags',
    values: ['Beach', 'Coral', 'Dive Party'],
  },
];

const DiveLocation = () => {
  return (
    <View style={styles.diveLocationContainer}>
      <Text style={styles.diveSiteLocationHeader}>Dive Site Location</Text>
      <View style={styles.mapContainer}>
        <MapView
          provider="google"
          style={styles.map}
          scrollEnabled={false}
          liteMode={true}
          initialRegion={{
            latitude: -8.409518,
            longitude: 115.188919,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.6922,
          }}
        />
      </View>
      <Button
        textGradient
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 0.65,
          y: 0.4,
        }}
        gradientColors={['#AA00FF', '#AA00FF', '#00E0FF']}
        style={{
          container: styles.viewMapButtonContainer,
          text: styles.viewMapButtonText,
        }}>
        View Map
      </Button>
      {activities.map((activity, index) => (
        <View key={index} style={styles.activityContainer}>
          <View style={styles.activity}>
            <Text style={styles.activityLabel}>{activity.label}</Text>
            <View style={styles.activityValueContainer}>
              {activity.values.map((value, idx) => (
                <Text key={idx} style={styles.activityValue}>
                  {value}
                </Text>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  diveSiteLocationHeader: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  diveLocationContainer: {
    marginTop: 20,
  },
  mapContainer: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  viewMapButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
    padding: 16,
    marginHorizontal: 0,
    elevation: 0.5,
  },
  viewMapButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  activityContainer: {
    marginVertical: 5,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
  activity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityLabel: {
    color: 'grey',
    fontSize: 15,
    width: '25%',
  },
  activityValueContainer: {
    flexDirection: 'row',
    width: '75%',
  },
  activityValue: {
    fontWeight: '500',
    color: 'black',
    marginHorizontal: 5,
  },
});

export default DiveLocation;
