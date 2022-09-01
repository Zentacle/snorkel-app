import AsyncStorage from '@react-native-community/async-storage';

interface UploadedBoolean {
  isUploaded: boolean;
}

async function saveItem<ObjType>(key: string, item: ObjType): Promise<void> {
  const items = await fetchItems<ObjType>(key);
  items.push(item);
  await AsyncStorage.setItem(key, JSON.stringify(items));
}

async function syncItems<ObjType>(
  key: string,
  fn: (item: ObjType) => Promise<any> | any,
): Promise<any> {
  type CombinedTypes = ObjType & UploadedBoolean;

  let items = await fetchItems<CombinedTypes>(key);
  if (!items.length) {
    return;
  }
  items = await Promise.all(
    items.map(async item => {
      return fn(item)
        .then(() => ({ ...item, isUploaded: true }))
        .catch(() => ({ ...item, isUploaded: false }));
    }),
  );

  await AsyncStorage.removeItem(key);

  const itemsNotUploaded = items.filter(item => {
    return !item.isUploaded;
  });

  await AsyncStorage.setItem(key, JSON.stringify(itemsNotUploaded));
}

async function fetchItems<ObjType>(key: string): Promise<ObjType[]> {
  const itemStr = await AsyncStorage.getItem(key); // assume itemStr is a stringified array of objs
  const items: ObjType[] = itemStr ? JSON.parse(itemStr) : [];
  return items;
}

export default { saveItem, syncItems, fetchItems };
