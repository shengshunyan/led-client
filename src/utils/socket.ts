import {useEffect, useRef} from 'react';
import dgram from 'react-native-udp';
import UdpSocket from 'react-native-udp/lib/types/UdpSocket';
import {Buffer} from 'buffer';
import {ISetting} from '../models/types';
import {cutArray, getSerial} from './index';
import {IP, PORT, MAX_COLORS_LENGTH} from '../constants';

export const useSocket = (bindPort: number) => {
  const socket = useRef<UdpSocket | undefined>();

  useEffect(() => {
    // UDP
    socket.current = dgram.createSocket({type: 'udp4'});
    socket.current.bind(bindPort);

    return () => {
      // 关闭套接字
      socket.current?.close();
    };
  }, [bindPort]);

  /**
   * 发送灯串配置
   * @param position 起始灯珠位置
   * @param colors 灯珠颜色列表 例: ['#ffffff', '#000000']
   * @returns Promise<unknown>
   */
  const send = async (
    position: {
      row: number;
      col: number;
    },
    colors: string[],
    layout: Pick<ISetting, 'colCount' | 'rowCount'>,
  ) => {
    const promises = cutArray(colors, MAX_COLORS_LENGTH).map(
      (subColors, index) => {
        return new Promise((resolve, reject) => {
          const positionNumber = (
            getSerial(position, layout) -
            1 +
            index * MAX_COLORS_LENGTH
          )
            .toString(16)
            .padStart(4, '0');
          const colorString = subColors.map(item => item.slice(1)).join('');
          const bufferData = Buffer.from(
            `04ff${positionNumber}${colorString}`,
            'hex',
          );

          socket.current?.send(
            bufferData,
            0,
            bufferData.length,
            PORT,
            IP,
            (err: unknown) => {
              if (err) {
                console.log('Error sending UDP packet:', err);
                reject(err);
              } else {
                console.log('UDP packet sent successfully');
                resolve('');
              }
            },
          );
        });
      },
    );

    await Promise.all(promises);
  };

  return {send};
};
