import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Icon, ListItem} from '@rneui/base';
import React from 'react';
import {View} from 'react-native';

const LedList: React.FunctionComponent = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const rightContent = () => (
    <Button
      title="Delete"
      onPress={() => {}}
      icon={{name: 'delete', color: 'white'}}
      buttonStyle={styles.rightContent}
    />
  );

  return (
    <View>
      <ListItem.Swipeable
        onPress={() => navigation.navigate('Detail')}
        rightContent={rightContent}>
        <Icon name="label-important-outline" type="material" />
        <ListItem.Content>
          <ListItem.Title>Hello Swiper</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  rightContent: {
    minHeight: '100%',
    backgroundColor: 'red',
  },
});

export default LedList;
