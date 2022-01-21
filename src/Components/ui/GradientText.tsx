import * as React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import type { FunctionComponent } from 'react';
import type { TextStyle } from 'react-native';

interface GradientTextProps {
  style?: TextStyle;
  gradientColors: string[];
  gradientLocations: number[];
  start?: {
    x: number;
    y: number;
  };
  end?: {
    x: number;
    y: number;
  };
}

const GradientText: FunctionComponent<GradientTextProps> = props => {
  return (
    <MaskedView maskElement={<Text style={props.style}>{props.children}</Text>}>
      <LinearGradient
        start={props.start}
        end={props.end}
        locations={props.gradientLocations}
        colors={props.gradientColors}>
        <Text style={[props.style, { opacity: 0 }]}>{props.children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
