import {ISetting} from '../models/types';

/** 获取灯珠颜色列表 */
export const getColors = (
  config: Record<string, Record<string, string>>,
  layout: Pick<ISetting, 'colCount' | 'rowCount'>,
): string[] => {
  const colors: string[] = [];
  for (let row = 1; row <= layout.rowCount; row++) {
    for (let col = 1; col <= layout.colCount; col++) {
      const color = config[`row_${row}`]?.[`col_${col}`] || '#000000';
      colors.push(color);
    }
  }
  return colors;
};

export function cutArray<T>(array: T[], cutLength: number) {
  let index = 0;
  let newArr = [];
  while (index < array.length) {
    newArr.push(array.slice(index, (index += cutLength)));
  }
  return newArr;
}

export {useSocket} from './socket';
