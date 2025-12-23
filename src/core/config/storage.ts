export const fromStoredData = (storageData: string | null): unknown => {
  if (!storageData) return null;
  try {
    return JSON.parse(storageData);
  } catch {
    return storageData;
  }
};

export const toStoredData = (data: unknown): string => {
  if (typeof data === "string") {
    return data;
  }
  return JSON.stringify(data);
};

export const getStorageData = (key: string): unknown => {
  const storedData = localStorage.getItem(key);
  return storedData ? fromStoredData(storedData) : null;
};

export const setStorageData = (key: string, data: unknown): void =>
  localStorage.setItem(key, toStoredData(data));

export const removeStorageData = (key: string): void =>
  localStorage.removeItem(key);
