export function loadState<T>(key: string): T | undefined {
  try {
    const jsonState = localStorage.getItem(key);
    if (!jsonState) {
      return undefined;
    }
    const asd = JSON.parse(jsonState);
    console.log("asd :>> ", asd);
    return JSON.parse(jsonState);
  } catch (e) {
    console.log("e :>> ", e);
    return undefined;
  }
}

export function saveState<T>(state: T, key: string) {
  const stringState = JSON.stringify(state);
  console.log("stringState " + stringState);
  localStorage.setItem(key, stringState);
}
