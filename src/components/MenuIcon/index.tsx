import React from 'react';
import {Icon} from '@rneui/base';

interface IProps {
  openMenuDrawer: () => void;
}

const MenuIcon: React.FunctionComponent<IProps> = ({openMenuDrawer}) => {
  const onPress = () => {
    openMenuDrawer();
  };

  return <Icon name={'menu'} type="entypo" color="#fff" onPress={onPress} />;
};

export default MenuIcon;
