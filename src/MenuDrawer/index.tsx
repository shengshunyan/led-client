import * as React from 'react';
import {ListItem, Icon} from '@rneui/base';
import {Drawer} from 'react-native-drawer-layout';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import router from '../router';

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
}

const MenuDrawer: React.FunctionComponent<IProps> = ({
  visible,
  setVisible,
  children,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Drawer
      open={visible}
      onOpen={() => setVisible(true)}
      onClose={() => setVisible(false)}
      renderDrawerContent={() => {
        return (
          <>
            <ListItem
              onPress={() => {
                navigation.navigate(router.quantity.name);
                setVisible(false);
              }}>
              <Icon name="appstore-o" type="antdesign" color="grey" />
              <ListItem.Content>
                <ListItem.Title>数量配置</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            <ListItem
              onPress={() => {
                navigation.navigate(router.debug.name);
                setVisible(false);
              }}>
              <Icon name="computer" type="material" color="grey" />
              <ListItem.Content>
                <ListItem.Title>调试</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </>
        );
      }}
      children={children}
    />
  );
};

export default MenuDrawer;
