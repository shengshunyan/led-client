import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import router from './router';
import MenuIcon from './components/MenuIcon';
import MenuDrawer from './MenuDrawer';

const Stack = createNativeStackNavigator();

function Main() {
  /** 菜单抽屉是否可见 */
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);

  const headerLeft = () => (
    <MenuIcon openMenuDrawer={() => setMenuDrawerVisible(true)} />
  );

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
