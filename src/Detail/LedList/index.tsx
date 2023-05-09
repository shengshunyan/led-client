import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import MyColorPicker from '../ColorPicker';
import {ISetting} from '../../models/types';
import {useSocket} from '../../utils';

const getList = (value: number) => {
  const result = [];
  for (let i = 1; i <= value; i++) {
    result.push(i);
  }

  return result;
};

interface IProps {
  setting: ISetting;
  config: Record<string, Record<string, string>>;
  setConfig: React.Dispatch<
    React.SetStateAction<Record<string, Record<string, string>>>
  >;
}

const LedList: React.FunctionComponent<IProps> = function ({
  setting,
  config,
  setConfig,
}) {
  const socket = useSocket(21325);

  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentLed, setCurrentLed] = useState<{
    row: number;
    col: number;
    color: string;
  } | null>(null);

  // 点击一个灯珠
  const onItemPress = ({row, col}: {row: number; col: number}) => {
    setCurrentLed({
      row,
      col,
      color: config?.[`row_${row}`]?.[`col_${col}`] || '#fff',
    });
    setColorPickerVisible(true);
  };

  // 选择一个灯珠的颜色
  const onSelectColor = (color: string) => {
    const newConfig = {...config};

    if (!currentLed) {
      console.error('未选中位置，不能更新灯串配置');
      return;
    }

    if (!newConfig[`row_${currentLed.row}`]) {
      newConfig[`row_${currentLed.row}`] = {};
    }
    newConfig[`row_${currentLed.row}`][`col_${currentLed.col}`] = color;
    setConfig(newConfig);

    socket.send({row: currentLed.row, col: currentLed.col}, [color], setting);
  };

  if (!setting) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.layoutContainer}>
          {getList(setting.rowCount).map(row => (
            <View key={row} style={styles.rowContainer}>
              {getList(setting.colCount).map(col => (
                <TouchableHighlight
                  key={`${row}_${col}`}
                  style={{
                    ...styles.ledItem,
                    backgroundColor:
                      config?.[`row_${row}`]?.[`col_${col}`] || '#fff',
                    borderColor:
                      config?.[`row_${row}`]?.[`col_${col}`] || '#2089dc',
                  }}
                  onPress={() => onItemPress({row, col})}>
                  <>{/* <Text>{`${row}_${col}`}</Text> */}</>
                </TouchableHighlight>
              ))}
            </View>
          ))}
          <MyColorPicker
            visible={colorPickerVisible}
            setVisible={setColorPickerVisible}
            color={currentLed?.color || '#ffffff'}
            onSelectColor={onSelectColor}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  layoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  ledItem: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 15,
  },
});

export default LedList;
