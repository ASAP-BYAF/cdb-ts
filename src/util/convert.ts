type Item = {
  title: string;
  id: number;
};

export const convertArrayToObj = (items: Item[]): { [key: number]: string } => {
  const result: { [key: number]: string } = {};

  items.forEach((item) => {
    result[item.id] = item.title;
  });

  return result;
};
