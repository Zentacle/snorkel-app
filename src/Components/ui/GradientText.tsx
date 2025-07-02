import * as React from 'react';
import { Text } from 'react-native';

import type { FunctionComponent } from 'react';
import type { TextStyle } from 'react-native';

interface GradientTextProps {
  style?: TextStyle;
  children?: React.ReactNode;
  gradientColors?: string[]; // Keep for backward compatibility but ignore
  gradientLocations?: number[]; // Keep for backward compatibility but ignore
  start?: { x: number; y: number; }; // Keep for backward compatibility but ignore
  end?: { x: number; y: number; }; // Keep for backward compatibility but ignore
}

const GradientText: FunctionComponent<GradientTextProps> = props => {
  return (
    <Text style={[props.style, { color: '#AA00FF' }]}>
      {props.children}
    </Text>
  );
};

export default GradientText;
