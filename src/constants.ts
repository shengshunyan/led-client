/** 全局事件通知 */
export enum EventNameEnum {
  /** led配置详情保存 */
  DETAIL_SAVE = 'DETAIL_SAVE',
  /** 刷新列表 */
  REFRESH_LIST = 'REFRESH_LIST',
  /** 触发一次权限校验 */
  PERMISSION_CHECK = 'PERMISSION_CHECK',
  /** 权限验证不通过 */
  PERMISSION_CHECK_FAIL = 'PERMISSION_CHECK_FAIL',
}

/** 服务端IP */
export const IP = '4.3.2.1';

/** 服务端端口 */
export const PORT = 21324;

/** 一次更新最大灯珠数量 */
export const MAX_COLORS_LENGTH = 400;

/** 用户几次操作之后，校验权限 */
export const USER_OPERATION_TIMES_PER_CHECK = 10;

/** 权限校验，arch */
export const PERMISSION_ARCH = 'ESP32-C3';

/** 权限校验，core */
export const PERMISSION_CORE = 'v4.4.1';
