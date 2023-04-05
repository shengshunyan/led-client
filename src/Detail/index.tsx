import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {ButtonGroup, Input} from '@rneui/themed';
import MyColorPicker from './ColorPicker';

const Detail: React.FunctionComponent<{navigation: any}> = function () {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(0);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const onNameChange = (value: string) => {
    setName(value);
  };

  return (
    <View style={styles.container}>
      <Input placeholder="名称" value={name} onChangeText={onNameChange} />

      <Text style={styles.label}>难度：</Text>
      <ButtonGroup
        buttons={['简单', '普通', '困难']}
        selectedIndex={difficulty}
        onPress={value => {
          setDifficulty(value);
        }}
        containerStyle={styles.buttonGroup}
      />

      <Text style={styles.label}>灯串：</Text>
      <View style={styles.ledList}>
        <TouchableHighlight
          // eslint-disable-next-line react-native/no-inline-styles
          style={{...styles.ledItem, backgroundColor: 'green'}}
          onPress={() => setColorPickerVisible(true)}>
          <></>
        </TouchableHighlight>
        <TouchableHighlight style={styles.ledItem}>
          <></>
        </TouchableHighlight>
      </View>

      <MyColorPicker
        visible={colorPickerVisible}
        setVisible={setColorPickerVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  label: {
    marginLeft: 12,
    fontSize: 18,
  },
  buttonGroup: {
    marginBottom: 24,
  },
  ledList: {
    marginLeft: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  ledItem: {
    width: 20,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
});

export default Detail;
