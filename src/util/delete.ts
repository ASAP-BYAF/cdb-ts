import { MyArr, MyObj } from "./util";

// [value1, value2, value3, ...] という配列からある値を削除する。
export const deleteItemFromArray = (array: MyArr, x: any) => {
  return array.filter((item) => {
    return item !== x;
  });
};

// Rf: https://chaika.hatenablog.com/entry/2020/05/13/083000
// { key1: value1, key2: value2, ...} というオブジェクトからキーを指定してある値を削除する。
export const deleteItemFromObjectbyKey = (
  prev: MyObj,
  key: string | number
) => {
  const { [key]: _, ...newObj } = prev;
  return newObj;
};

// Rf: https://chaika.hatenablog.com/entry/2020/05/13/083000
// { key1: value1, key2: value2, ...} というオブジェクトから値を指定して削除する。
export const deleteItemFromObjectbyValue = (
  prev: MyObj,
  value: string | number
) => {
  const key = Object.keys(prev).find((key) => prev[key] === value) as string;
  const { [key]: _, ...newObj } = prev;
  return newObj;
};

// { key1: [array1], key2: [array2], ...} というオブジェクトのあるキーの配列からある値を削除する。
export const deleteItemFromArrayInObject = (
  obj: MyObj,
  key: string | number,
  x: any
) => {
  obj[key] = deleteItemFromArray(obj[key], x);
  return obj;
};
