import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import type { FunctionComponent } from 'react';
import type { ImageSourcePropType } from 'react-native';

interface TagProps {
  imageSource: ImageSourcePropType;
}

const Tag: FunctionComponent<TagProps> = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={props.imageSource} />
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    paddingVertical: 10,
    padding: 15,
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 12,
    flexDirection: 'row',
  },
  text: {
    color: 'black',
  },
  image: {
    marginRight: 10,
  },
});

export default Tag;
