export const normalize = <T extends object>(arr: T[], uniqueField: keyof T) =>
  arr.reduce<Record<string, T>>((acc, item) => {
    const key = String(item[uniqueField]);
    acc[key] = item;
    return acc;
  }, {});
