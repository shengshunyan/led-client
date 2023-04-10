import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ILedItem, TableRow} from './types';

export class Led {
  private tableName = 'led';

  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  initTable = async () => {
    const {db} = this;
    const query = `CREATE TABLE IF NOT EXISTS ${this.tableName}(
          name TEXT NOT NULL,
          difficulty INTEGER NOT NULL,
          config TEXT NOT NULL
      );`;
    await db.executeSql(query);
  };

  /** 查询列表 */
  getList = async () => {
    const {db, tableName} = this;
    const results = await db.executeSql(
      `SELECT rowid,name,difficulty,config FROM ${tableName}`,
    );
    const list: TableRow<ILedItem>[] = [];
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        list.push(result.rows.item(index));
      }
    });
    return list;
  };

  /** 查询详情 */
  getItem = async (rowid: number): Promise<ILedItem> => {
    const {db, tableName} = this;
    const query = `SELECT rowid,name,difficulty,config FROM ${tableName} WHERE rowid=${rowid}`;
    const result = await db.executeSql(query);
    const item = result[0].rows.item(0);

    return item;
  };

  /** 新增一条记录 */
  addItem = (item: ILedItem) => {
    const {db, tableName} = this;
    const query = `INSERT INTO ${tableName}(name,difficulty,config) 
      values('${item.name}','${item.difficulty}','${item.config}')`;

    return db.executeSql(query);
  };

  /** 修改一条记录 */
  editItem = (item: TableRow<ILedItem>) => {
    const {db, tableName} = this;
    const query = `UPDATE ${tableName}
      SET name='${item.name}', difficulty='${item.difficulty}', config='${item.config}'
      WHERE rowid=${item.rowid}`;

    return db.executeSql(query);
  };

  /** 删除一条记录 */
  deleteItem = (rowid: number) => {
    const {db, tableName} = this;
    const query = `DELETE FROM ${tableName} WHERE rowid=${rowid}`;

    return db.executeSql(query);
  };
}
