/**
 * @desc 全局设置
 */

import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ISetting, TableRow} from './types';

export class Setting {
  private tableName = 'setting';

  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  initTable = async () => {
    const {db} = this;
    const query = `CREATE TABLE IF NOT EXISTS ${this.tableName}(
          rowCount INTEGER DEFAULT 12 CHECK (rowCount >= 0 AND rowCount <= 255),
          colCount INTEGER DEFAULT 12 CHECK (rowCount >= 0 AND rowCount <= 255)
      );`;
    await db.executeSql(query);

    const setting = await this.get();
    if (!setting) {
      // 初始化插入默认设置
      await this.set();
    }
  };

  /** 查询配置 */
  get = async () => {
    const {db, tableName} = this;
    const results = await db.executeSql(
      `SELECT rowid,rowCount,colCount FROM ${tableName}`,
    );
    const settings: TableRow<ISetting>[] = [];
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        settings.push(result.rows.item(index));
      }
    });

    if (!settings[0]) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {rowid, ...setting} = settings[0];
    return setting;
  };

  /** 修改配置 */
  set = async (setting: ISetting = {rowCount: 12, colCount: 12}) => {
    const {db, tableName} = this;
    // 默认用rowid=1的一行作为配置存储
    const query = `INSERT OR REPLACE INTO ${tableName}(rowid, rowCount, colCount) 
      values(1, ${setting.rowCount}, ${setting.colCount})`;

    return db.executeSql(query);
  };
}
