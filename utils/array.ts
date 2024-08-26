type GroupedObject<T> = {
  key: string;
  data: T[];
};

function getNestedValue<T>(obj: any, keyPath: string): T {
  return keyPath.split(".").reduce((value, key) => value[key], obj);
}

export const groupBy = <T>(array: T[], keyPath: string): GroupedObject<T>[] => {
  return array.reduce((result, currentItem) => {
    const groupKey = getNestedValue(currentItem, keyPath) as string;
    if (!result.find((x) => x.key === groupKey)) {
      result.push({ key: groupKey, data: [] });
    }

    const group = result.find((x) => x.key === groupKey);
    group?.data.push(currentItem);

    return result;
  }, [] as GroupedObject<T>[]);
};
