import { MyObj } from "./util";
import { deleteItemFromArrayInObject, deleteItemFromObject } from "./delete";

// 配列の特定の値を別の値に変更する。
//  例: [value1, value2, value3, ...]
//        `--> [value1_prime, value2, value3, ...]
export const renameItemInArray = (array: MyObj, x: any, x_prime: any) => {
  const x_idx_in_items = array.indexOf(x);
  return array.map((item: any, index: number) =>
    index === x_idx_in_items ? x_prime : item
  );
};

// オブジェクトの特定のキーを変更する。
// 例: { key1: value1, key2: value2, ...}
//    `--> { key1_prime: value1, key2: value2, ...}
export const renameKeyInObject = (obj: MyObj, x: any, x_prime: any) => {
  const value = obj[x];
  const obj_ = deleteItemFromObject(obj, x);
  obj_[x_prime] = value;
  return obj_;
};

// { key1: [array1], key2: [array2], ...} というオブジェクトの配列のある値を別の値に変更する。
export const renameItemInArrayInObject = (
  obj: MyObj,
  key: any,
  x: any,
  x_prime: any
) => {
  const obj_ = deleteItemFromArrayInObject(obj, key, x);
  obj_[key] = [...obj_[key], x_prime];
  return obj_;
};
