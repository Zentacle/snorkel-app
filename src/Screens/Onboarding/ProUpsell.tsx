import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProUpsellDisplay from '_components/reusables/pro-upsell/ProUpsellDisplay';

import type { FunctionComponent } from 'react';

interface ProUpsellProps {}

const ProUpsell: FunctionComponent<ProUpsellProps> = () => {
  return (
    <View style={styles.container}>
      <ProUpsellDisplay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
});

export default ProUpsell;
