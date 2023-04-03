import * as React from 'react';
import {ListItem, Icon} from '@rneui/base';
import {Drawer} from 'react-native-drawer-layout';

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
  return (
    <Drawer
      open={visible}
      onOpen={() => setVisible(true)}
      onClose={() => setVisible(false)}
      renderDrawerContent={() => {
        return (
          <>
            <ListItem>
              <Icon name="inbox" type="material-community" color="grey" />
              <ListItem.Content>
                <ListItem.Title>Inbox</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
            <ListItem>
              <Icon
                name="trash-can-outline"
                type="material-community"
                color="grey"
              />
              <ListItem.Content>
                <ListItem.Title>Trash</ListItem.Title>
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
