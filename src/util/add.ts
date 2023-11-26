import { MyArr, MyObj } from "./util";
export const concatArraytoArrayInObject = (
  obj: MyObj,
  key: any,
  array: MyArr
) => {
  obj[key] = [...obj[key], ...array];
  return obj;
};

export const arrayToObject = (array: MyArr, value: any) => {
  return array.reduce((accumulator, x) => {
    return { ...accumulator, [x]: value };
  }, {});
};

export const concatObject = (obj1: MyObj, obj2: MyObj) => {
  return { ...obj1, ...obj2 };
};
