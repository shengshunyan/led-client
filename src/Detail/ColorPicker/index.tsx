import {BottomSheet, Button} from '@rneui/base';
import React, {useState} from 'react';
import ColorPicker from 'react-native-wheel-color-picker';
import {StyleSheet, View} from 'react-native';

interface IProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  color: string;
  onSelectColor: (color: string) => void;
}

const MyColorPicker: React.FunctionComponent<IProps> = function ({
  visible,
  setVisible,
  color: oldColor,
  onSelectColor,
}) {
  const [color, setColor] = useState(oldColor);

  const onColorChange = (value: string) => {
    setColor(value);
  };

  const onSubmit = () => {
    onSelectColor(color);
    setVisible(false);
  };

  return (
    <BottomSheet
      containerStyle={styles.container}
      backdropStyle={styles.backdrop}
      modalProps={{}}
      isVisible={visible}>
      <ColorPicker
        color={color}
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
        <Button title="确认" onPress={onSubmit} />
        <Button title="取消" type="outline" onPress={() => setVisible(false)} />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
