export * from './component';

export function capitalize(str: string) {
  if (!str) {
    return;
  }
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
