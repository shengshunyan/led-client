import {DeviceEventEmitter, StyleSheet, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Icon, ListItem, Tab, TabView} from '@rneui/base';
import React from 'react';
import {ScrollView} from 'react-native';
import {DifficultyEnum, ILedItem, TableRow} from '../../models/types';
import router from '../../router';
import {ledModal} from '../../models';
import {EventNameEnum} from '../../constants';

interface IProps {
  data: TableRow<ILedItem>[];
}

const LedList: React.FunctionComponent<IProps> = ({data}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [index, setIndex] = React.useState(0);

  const rightContent = (rowid: number) => (
    <Button
      title="Delete"
      onPress={async () => {
        await ledModal?.deleteItem(rowid);
        // 刷新列表
        DeviceEventEmitter.emit(EventNameEnum.REFRESH_LIST);
      }}
      icon={{name: 'delete', color: 'white'}}
      buttonStyle={styles.rightContent}
    />
  );

  const renderList = (list: TableRow<ILedItem>[]) => {
    return (
      <>
        <ScrollView>
          {list.map(item => (
            <ListItem.Swipeable
              key={item.rowid}
              onPress={() =>
                navigation.navigate(router.detail.name, {rowid: item.rowid})
              }
              rightContent={() => rightContent(item.rowid)}>
              <Icon name="label-important-outline" type="material" />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem.Swipeable>
          ))}
        </ScrollView>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        containerStyle={styles.tabContainer}
        indicatorStyle={styles.indicator}
        variant="primary">
        <Tab.Item title="全部" titleStyle={styles.tabTitle} />
        <Tab.Item title="简单" titleStyle={styles.tabTitle} />
        <Tab.Item title="普通" titleStyle={styles.tabTitle} />
        <Tab.Item title="困难" titleStyle={styles.tabTitle} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabViewItem}>
          {renderList(data)}
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          {renderList(
            data.filter(item => item.difficulty === DifficultyEnum.Simple),
          )}
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          {renderList(
            data.filter(item => item.difficulty === DifficultyEnum.Normal),
          )}
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          {renderList(
            data.filter(item => item.difficulty === DifficultyEnum.Difficult),
          )}
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightContent: {
    minHeight: '100%',
    backgroundColor: 'red',
  },
  tabContainer: {
    backgroundColor: '#2196F3',
  },
  indicator: {
    backgroundColor: 'white',
    height: 3,
  },
  tabTitle: {
    fontSize: 12,
  },
  tabViewItem: {
    width: '100%',
    backgroundColor: 'white',
  },
});

export default LedList;
