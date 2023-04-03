import List from './List';
import Detail from './Detail';

const router = {
  list: {
    title: '列表',
    name: 'List',
    getComponent: () => List,
  },
  detail: {
    title: '详情',
    name: 'Detail',
    getComponent: () => Detail,
  },
};

export default router;
