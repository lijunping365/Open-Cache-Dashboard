export default [
  {
    path: '/login',
    layout: false,
    name: 'login',
    component: './login',
    hideInMenu: true,
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'app',
    icon: 'table',
    path: '/app',
    component: './app',
  },
  {
    name: 'cache',
    icon: 'smile',
    path: 'cache',
    component: './cache',
    hideInMenu: true,
  },
  {
    name: 'logger',
    icon: 'smile',
    path: 'logger',
    component: './logger',
  },
  {
    name: 'user',
    icon: 'table',
    path: '/user',
    component: './user',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
