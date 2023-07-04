/**
 * 权限校验
 */

import {compareVersions} from './index';
import {
  EventNameEnum,
  IP,
  PERMISSION_ARCH_LIST,
  PERMISSION_CHECK_REQUEST_RETRY_TIME,
  PERMISSION_CORE,
  USER_OPERATION_TIMES_PER_CHECK,
} from '../constants';
import {DeviceEventEmitter} from 'react-native';

class Permission {
  /** 用户操作触发权限校验次数 */
  private times = 0;
  /** 权限校验请求重试次数 */
  private retryTimes = 0;

  constructor() {
    DeviceEventEmitter.addListener(EventNameEnum.PERMISSION_CHECK, this.check);
  }

  private getResult = () => {
    console.log('fetch http://${IP}/json/si');
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
      this.times = 0;
      let bool = await this.getResult();

      while (!bool && this.retryTimes < PERMISSION_CHECK_REQUEST_RETRY_TIME) {
        this.retryTimes++;
        bool = await this.getResult();
      }
      this.retryTimes = 0;

      DeviceEventEmitter.emit(EventNameEnum.PERMISSION_CHECK_RESULT, bool);
    }
  };
}

export const permission = new Permission();
