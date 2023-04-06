import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

export const initDB = async () => {
  const DB_NAME = 'todo-data.db';
  const db = await openDatabase({name: DB_NAME, location: 'default'});
  return db;
};
