import {StyleSheet} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Icon, ListItem} from '@rneui/base';
import React from 'react';
import {View} from 'react-native';
import {ILedItem, TableRow} from '../../models/types';

interface IProps {
  data: TableRow<ILedItem>[];
}

const LedList: React.FunctionComponent<IProps> = ({data}) => {
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
      {data.map(item => (
        <ListItem.Swipeable
          key={item.rowid}
          onPress={() => navigation.navigate('Detail')}
          rightContent={rightContent}>
          <Icon name="label-important-outline" type="material" />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      ))}
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
