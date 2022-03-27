import { Dimensions } from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('screen').height;

const heightThreshold = 780;
const widthThreshold = 380;

export const isBelowHeightThreshold = HEIGHT < heightThreshold;
export const isBelowWidthThreshold = WIDTH < widthThreshold;
