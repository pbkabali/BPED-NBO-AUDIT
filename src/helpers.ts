export const filterArrayUniqueByTwoKeys = (arr: any, key1: string, key2: string) => {
  return arr.reduce(
    (acc: any, curr: any) => (acc.find((x: any) => x[key1] === curr[key1] && x[key2] === curr[key2]) ? acc : [...acc, curr]),
    []
  );
};
