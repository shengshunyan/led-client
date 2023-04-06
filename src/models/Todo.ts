import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ToDoItem} from './types';

export class TODO {
  private tableName = 'todoTable';

  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  initTable = async () => {
    const {db} = this;
    const query = `CREATE TABLE IF NOT EXISTS ${this.tableName}(
          value TEXT NOT NULL
      );`;
    await db.executeSql(query);
  };

  /** 查询列表 */
  getList = async () => {
    const {db, tableName} = this;
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    );
    const todoItems: ToDoItem[] = [];
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index));
      }
    });
    return todoItems;
  };

  /** 查询详情 */
  getItem = async (id: number) => {
    const {db, tableName} = this;
    const query = `SELECT rowid as id,value FROM ${tableName} WHERE rowid=${id}`;
    const result = await db.executeSql(query);
    const item = result[0].rows.item(0);

    return item;
  };

  /** 新增一条记录 */
  addItem = (item: Omit<ToDoItem, 'id'>) => {
    const {db, tableName} = this;
    const query = `INSERT INTO ${tableName}(value) values('${item.value}')`;

    return db.executeSql(query);
  };

  /** 修改一条记录 */
  editItem = (item: ToDoItem) => {
    const {db, tableName} = this;
    const query = `UPDATE ${tableName}
      SET value='${item.value}'
      WHERE rowid=${item.id}`;

    return db.executeSql(query);
  };

  /** 删除一条记录 */
  deleteItem = (id: number) => {
    const {db, tableName} = this;
    const query = `DELETE FROM ${tableName} WHERE rowid=${id}`;

    return db.executeSql(query);
  };
}
