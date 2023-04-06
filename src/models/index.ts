import {initDB} from './db';
import {TODO} from './Todo';

let todo: TODO | null = null;

export const initModels = async () => {
  const db = await initDB();

  todo = new TODO(db);
  await todo.initTable();
};

export {todo};
