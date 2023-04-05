import {BottomSheet, Button} from '@rneui/base';
import React from 'react';
import ColorPicker from 'react-native-wheel-color-picker';
import {StyleSheet, View} from 'react-native';

interface IProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const MyColorPicker: React.FunctionComponent<IProps> = function ({
  visible,
  setVisible,
}) {
  const onColorChange = (color: string) => {
    console.log('color: ', color);
  };

  return (
    <BottomSheet
      containerStyle={styles.container}
      modalProps={{}}
      isVisible={visible}>
      <ColorPicker
        // color={this.state.currentColor}
        onColorChangeComplete={onColorChange}
        palette={[
          '#000000',
          '#888888',
          '#ed1c24',
          '#d11cd5',
          '#1633e6',
          '#00aeef',
          '#00c85d',
          '#57ff0a',
          '#ffde17',
          '#f26522',
        ]}
        thumbSize={20}
        sliderSize={20}
        autoResetSlider
      />
      <View style={styles.buttons}>
        <Button title="确认" onPress={() => setVisible(false)} />
        <Button title="取消" type="outline" onPress={() => setVisible(false)} />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 48,
    gap: 12,
  },
});

export default MyColorPicker;
