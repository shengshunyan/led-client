import {initDB} from './db';
import {Setting} from './Setting';
import {Led} from './Led';

let setting: Setting | null = null;
let led: Led | null = null;

export const initModels = async () => {
  const db = await initDB();

  setting = new Setting(db);
  await setting.initTable();

  led = new Led(db);
  await led.initTable();
};

export {setting as settingModal, led as ledModal};
