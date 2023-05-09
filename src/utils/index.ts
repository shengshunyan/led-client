import {ISetting} from '../models/types';

/** 获取灯珠颜色列表 */
export const getColors = (
  config: Record<string, Record<string, string>>,
  layout: Pick<ISetting, 'colCount' | 'rowCount'>,
): string[] => {
  const colors: string[] = [];
  for (let row = layout.rowCount; row >= 1; row--) {
    // 从左往右
    if ((layout.rowCount - row) % 2 === 0) {
      for (let col = 1; col <= layout.colCount; col++) {
        const color = config[`row_${row}`]?.[`col_${col}`] || '#000000';
        colors.push(color);
      }
    } else {
      // 从右往左
      for (let col = layout.colCount; col >= 1; col--) {
        const color = config[`row_${row}`]?.[`col_${col}`] || '#000000';
        colors.push(color);
      }
    }
  }
  return colors;
};

/** 根据灯珠行列位置，计算序号 */
export const getSerial = (
  position: {
    row: number;
    col: number;
  },
  layout: Pick<ISetting, 'colCount' | 'rowCount'>,
) => {
  if ((layout.rowCount - position.row) % 2 === 0) {
    return (layout.rowCount - position.row) * layout.colCount + position.col;
  }

  return (
    (layout.rowCount - position.row) * layout.colCount +
    layout.colCount -
    position.col +
    1
  );
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
