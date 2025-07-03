import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, checkMultiple, request } from 'react-native-permissions';

/**
 * Check if location permissions are granted
 * @returns Promise<boolean> - true if location permissions are granted
 */
export const checkLocationPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const perms = await checkMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ]);

    return (
      perms[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED ||
      perms[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED
    );
  } else {
    const perms = await checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ]);

    return (
      perms[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED ||
      perms[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === RESULTS.GRANTED
    );
  }
};

/**
 * Request location permissions
 * @returns Promise<boolean> - true if permissions were granted
 */
export const requestLocationPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return result === RESULTS.GRANTED;
  } else {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    return result === RESULTS.GRANTED;
  }
};

/**
 * Check and request location permissions if needed
 * @returns Promise<boolean> - true if permissions are available (either already granted or newly granted)
 */
export const ensureLocationPermissions = async (): Promise<boolean> => {
  const hasPermissions = await checkLocationPermissions();
  if (hasPermissions) {
    return true;
  }

  return await requestLocationPermissions();
};