import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
import MyColorPicker from '../ColorPicker';
import {settingModal} from '../../models';
import {ISetting} from '../../models/types';

const getList = (value: number) => {
  const result = [];
  for (let i = 1; i <= value; i++) {
    result.push(i);
  }

  return result;
};

interface IProps {
  config: Record<string, Record<string, string>>;
  setConfig: React.Dispatch<
    React.SetStateAction<Record<string, Record<string, string>>>
  >;
}

const LedList: React.FunctionComponent<IProps> = function ({
  config,
  setConfig,
}) {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [setting, setSetting] = useState<ISetting | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const onItemPress = (data: {row: number; col: number}) => {
    setCurrentPosition(data);
    setColorPickerVisible(true);
  };

  const onSelectColor = (color: string) => {
    const newConfig = {...config};

    if (!currentPosition) {
      console.error('未选中位置，不能更新灯串配置');
      return;
    }

    if (!newConfig[`row_${currentPosition.row}`]) {
      newConfig[`row_${currentPosition.row}`] = {};
    }
    newConfig[`row_${currentPosition.row}`][`col_${currentPosition.col}`] =
      color;
    setConfig(newConfig);
  };

  useEffect(() => {
    const init = async () => {
      await settingModal?.set({colCount: 10, rowCount: 10});
      const data = (await settingModal?.get()) || null;
      setSetting(data);
    };
    init();
  }, []);

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
