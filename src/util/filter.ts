export const removeNaNKeys = (obj: {
  [key: string]: number;
}): {
  [key: string]: number;
} => {
  const result: { [key: string]: number } = {};

  for (const key in obj) {
    if (!isNaN(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
};
