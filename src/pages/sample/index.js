import React from 'react';

export const samplePagesConfigs = [
  {
    path: '/sample/page-1',
    component: React.lazy(() => import('./Page1')),
  },
  {
    path: '/sample/page-2',
    component: React.lazy(() => import('./Page2')),
  },
  {
    path: '/sample/page-3',
    component: React.lazy(() => import('./Page3')),
  },
  {
    path: '/sample/page-4',
    component: React.lazy(() => import('./Page4')),
  },
  {
    path: '/sample/page-5',
    component: React.lazy(() => import('./Page5')),
  },
];
