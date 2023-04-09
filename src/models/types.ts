/** 难度 */
export enum DifficultyEnum {
  /** 简单 */
  Simple = 0,
  /** 普通 */
  Normal = 1,
  /** 困难 */
  Difficult = 2,
}

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
