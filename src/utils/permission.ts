/**
 * 权限校验
 */

import {compareVersions} from './index';
import {
  EventNameEnum,
  IP,
  PERMISSION_ARCH_LIST,
  PERMISSION_CORE,
  USER_OPERATION_TIMES_PER_CHECK,
} from '../constants';
import {DeviceEventEmitter} from 'react-native';

class Permission {
  private times = 0;

  constructor() {
    DeviceEventEmitter.addListener(EventNameEnum.PERMISSION_CHECK, this.check);
  }

  private getResult = () => {
    return new Promise(resolve => {
      fetch(`http://${IP}/json/si`)
        .then(response => response.json())
        .then(data => {
          if (
            PERMISSION_ARCH_LIST.includes(data?.info?.arch) &&
            compareVersions(data?.info?.core, PERMISSION_CORE) >= 0
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(error => {
          console.error(`fetch http://${IP}/json/si error`, error);
          resolve(false);
        });
    });
  };

  public check = async (immediately?: boolean) => {
    this.times++;

    if (immediately || this.times >= USER_OPERATION_TIMES_PER_CHECK) {
      const bool = await this.getResult();

      if (!bool) {
        DeviceEventEmitter.emit(EventNameEnum.PERMISSION_CHECK_FAIL);
      }
    }
  };
}

export const permission = new Permission();
