import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const attachIcons = (count: number, iconSize = 15) => {
  const iconList: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    if (count > i && count >= i + 1) {
      iconList.push(
        <Icon key={i} name="star" size={iconSize} color="#aa00ff" />,
      );
    } else if (count > i && count < i + 1) {
      iconList.push(
        <Icon key={i} name="star-half-full" size={iconSize} color="#aa00ff" />,
      );
    } else {
      iconList.push(
        <Icon key={i} name="star-outline" size={iconSize} color="#aa00ff" />,
      );
    }
  }

  return iconList;
};

export function capitalize(str: string) {
  if (!str) {
    return;
  }
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
