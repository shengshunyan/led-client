import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import router from './router';
import MenuIcon from './components/MenuIcon';
import MenuDrawer from './MenuDrawer';
import {initModels} from './models';
import {Button} from '@rneui/base';
import {EventNameEnum} from './constants';
import List from './List';
import Detail from './Detail';
import Quantity from './Quantity';
import Debug from './Debug';

const Stack = createNativeStackNavigator();

function Main() {
  const [isReady, setIsReady] = useState(false);
  /** 菜单抽屉是否可见 */
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);

  const listHeaderLeft = () => (
    <MenuIcon openMenuDrawer={() => setMenuDrawerVisible(true)} />
  );

  const detailHeaderRight = () => (
    <Button
      title="保存"
      onPress={() => {
        DeviceEventEmitter.emit(EventNameEnum.DETAIL_SAVE);
      }}
    />
  );

  useEffect(() => {
    const init = async () => {
      /** 初始化数据库 */
      await initModels().finally(() => {
        setIsReady(true);
      });
    };
    init();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <MenuDrawer visible={menuDrawerVisible} setVisible={setMenuDrawerVisible}>
        <FlashMessage position="center" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2089dc',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name={router.list.name}
            component={List}
            options={{
              title: router.list.title,
              headerLeft: listHeaderLeft,
            }}
          />
          <Stack.Screen
            name={router.detail.name}
            component={Detail}
            options={{
              title: router.detail.title,
              headerRight: detailHeaderRight,
            }}
          />
          <Stack.Screen
            name={router.quantity.name}
            component={Quantity}
            options={{
              title: router.quantity.title,
            }}
          />
          <Stack.Screen
            name={router.debug.name}
            component={Debug}
            options={{
              title: router.debug.title,
            }}
          />
        </Stack.Navigator>
      </MenuDrawer>
    </NavigationContainer>
  );
}

export default Main;
