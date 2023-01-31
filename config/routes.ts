﻿export default [
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
    name: 'dashboard',
    icon: 'table',
    path: '/dashboard',
    component: './dashboard',
  },
  {
    name: 'app',
    icon: 'table',
    path: '/app',
    component: './app',
  },
  {
    name: 'logger',
    icon: 'smile',
    path: 'logger',
    component: './logger',
    hideInMenu: true,
  },
  {
    name: 'executor',
    icon: 'table',
    path: '/executor',
    component: './executor',
    hideInMenu: true,
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
