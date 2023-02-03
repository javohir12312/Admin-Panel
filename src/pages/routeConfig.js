import { DiffFilled, FolderFilled, SlidersFilled } from '@ant-design/icons';
import React from 'react';
import { MdOutlineManageAccounts } from 'react-icons/md';



const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'sidebar.sample',
    type: 'group',
    children: [
      {
        id: 'page-1',
        title: 'Main',
        messageId: 'sidebar.sample.page1',
        type: 'item',
        icon: <SlidersFilled/>,
        path: '/sample/page-1',
      },
      {
        id: 'page-2',
        title: 'All files andcomponents',
        messageId: 'sidebar.sample.page2',
        type: 'item',
        icon: <FolderFilled />,
        path: '/sample/page-2',
      },
      {
        id: 'page-3',
        title: 'Edits',
        messageId: 'sidebar.sample.page3',
        type: 'item',
        icon: <DiffFilled/>,
        path: '/sample/page-3',
      },
    ],
  },
  {
    id: 'extra-pages',
    title: 'Extra Pages',
    messageId: 'sidebar.pages.extraPages',
    path: 'extra-pages',
    type: 'group',
    children: [
      {
        id: 'account',
        title: 'Account',
        messageId: 'sidebar.pages.extraPages.account',
        icon: <MdOutlineManageAccounts />,
        path: '/extra-pages/user-profile',
      },
    ],
  },
];
export default routesConfig;
