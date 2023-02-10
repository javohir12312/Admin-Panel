import React from 'react';
import { BiCodeAlt } from 'react-icons/bi';
import { GoGlobe, GoMortarBoard } from "react-icons/go";
import { ImNewspaper } from "react-icons/im";
import { Si1001Tracklists } from "react-icons/si";


const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'sidebar.sample',
    type: 'group',
    children: [
      {
        id: 'page-1',
        title: 'Education',
        messageId: 'sidebar.sample.page1',
        type: 'item',
        icon: <GoMortarBoard />,
        path: '/sample/page-1',
      },
      {
        id: 'page-2',
        title: 'Information technology (IT)',
        messageId: 'sidebar.sample.page2',
        type: 'item',
        icon: <BiCodeAlt />,
        path: '/sample/page-2',
      },
      {
        id: 'page-3',
        title: 'Languages',
        messageId: 'sidebar.sample.page3',
        type: 'item',
        icon: <GoGlobe />,
        path: '/sample/page-3',
      },
      {
        id: 'page-4',
        title: 'Subjects',
        messageId: 'sidebar.sample.page4',
        type: 'item',
        icon: <ImNewspaper />,
        path: '/sample/page-4',
      },
      {
        id: 'page-5',
        title: 'Others',
        messageId: 'sidebar.sample.page5',
        type: 'item',
        icon: <Si1001Tracklists />,
        path: '/sample/page-5',
      },
    ],
  }
];
export default routesConfig;
