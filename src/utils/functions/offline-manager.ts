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
  fn: (item: ObjType) => Promise<any>,
): Promise<void> {
  type CombinedTypes = ObjType & UploadedBoolean;

  const items = await fetchItems<CombinedTypes>(key);
  if (!items.length) {
    return;
  }
  await Promise.all(
    items.map(item => {
      fn(item).then(() => (item.isUploaded = true));
    }),
  );

  await AsyncStorage.setItem(
    key,
    JSON.stringify(items.filter(item => !item.isUploaded)),
  );
}

async function fetchItems<ObjType>(key: string): Promise<ObjType[]> {
  const itemStr = await AsyncStorage.getItem(key); // assume itemStr is a stringified array of objs
  const items: ObjType[] = itemStr ? JSON.parse(itemStr) : [];
  return items;
}

export default { saveItem, syncItems, fetchItems };
