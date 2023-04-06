import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import router from './router';
import MenuIcon from './components/MenuIcon';
import MenuDrawer from './MenuDrawer';
import {initModels} from './models';
import {todo} from './models';

const Stack = createNativeStackNavigator();

function Main() {
  /** 菜单抽屉是否可见 */
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);

  const headerLeft = () => (
    <MenuIcon openMenuDrawer={() => setMenuDrawerVisible(true)} />
  );

  useEffect(() => {
    const init = async () => {
      await initModels();
      const list = await todo?.getList();
      console.log('list: ', list);
      // await todo.addItem({id: 1, value: 'hhh'});
      // await todo.editItem({id: 2, value: 'www'});
      // await todo.deleteItem(3);
      // const list1 = await todo.getList();
      // console.log('list1: ', list1);
      const item = await todo?.getItem(2);
      console.log('item: ', item);
    };
    init();
  }, []);

  return (
    <MenuDrawer visible={menuDrawerVisible} setVisible={setMenuDrawerVisible}>
      <NavigationContainer>
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
            getComponent={router.list.getComponent}
            options={{
              title: router.list.title,
              headerLeft,
            }}
          />
          <Stack.Screen
            name={router.detail.name}
            getComponent={router.detail.getComponent}
            options={{
              title: router.detail.title,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuDrawer>
  );
}

export default Main;
