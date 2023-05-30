import {ISetting} from '../models/types';

export {useSocket} from './socket';
export {permission} from './permission';

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

/** 比较两个版本号, 例：v4.4.1， v4.4.2 */
export const compareVersions = (version1: string, version2: string) => {
  const v1 = version1.slice(1).split('.').map(Number);
  const v2 = version2.slice(1).split('.').map(Number);

  for (let i = 0; i < v1.length; i++) {
    if (v1[i] > v2[i]) {
      return 1; // 版本1大于版本2
    } else if (v1[i] < v2[i]) {
      return -1; // 版本1小于版本2
    }
  }

  return 0; // 版本1等于版本2
};
