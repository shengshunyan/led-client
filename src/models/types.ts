/** 难度 */
export enum DifficultyEnum {
  /** 未设置 */
  Unset = 0,
  V0 = 1,
  V1 = 2,
  V2 = 3,
  V3 = 4,
  V4 = 5,
  V5 = 6,
  V6 = 7,
  V7 = 8,
  V8 = 9,
  V9 = 10,
}

/** 难度名称 */
export const DifficultyList = [
  {
    value: DifficultyEnum.Unset,
    name: '未设置',
  },
  {
    value: DifficultyEnum.V0,
    name: 'V0',
  },
  {
    value: DifficultyEnum.V1,
    name: 'V1',
  },
  {
    value: DifficultyEnum.V2,
    name: 'V2',
  },
  {
    value: DifficultyEnum.V3,
    name: 'V3',
  },
  {
    value: DifficultyEnum.V4,
    name: 'V4',
  },
  {
    value: DifficultyEnum.V5,
    name: 'V5',
  },
  {
    value: DifficultyEnum.V6,
    name: 'V6',
  },
  {
    value: DifficultyEnum.V7,
    name: 'V7',
  },
  {
    value: DifficultyEnum.V8,
    name: 'V8',
  },
  {
    value: DifficultyEnum.V9,
    name: 'V9',
  },
];

/** 全局配置 */
export type ISetting = {
  /** 行数 */
  rowCount: number;
  /** 列数 */
  colCount: number;
};

/** Led灯串设置 */
export type ILedItem = {
  /** 名称 */
  name: string;
  /** 难度 */
  difficulty: DifficultyEnum;
  /** 配置 */
  config: string;
};

export type TableRow<T> = T & {
  rowid: number;
};
