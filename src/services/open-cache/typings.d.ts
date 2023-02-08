// @ts-ignore
/* eslint-disable */

declare namespace API {
  type User = {
    id: number;
    username: string;
    status: number;
    phone: string;
    createTime: Date
  };

  type Instance = {
    clientId: string;
    onlineTime: Date;
    status: string;
    weight: number;
  };

  type OpenCacheOperationLog = {
    id: number;
    appId: number;
    status: number;
    createTime: Date;
  };

  type OpenCacheApp = {
    id: number;
    appName: string;
    appDesc: string;
    createTime: Date;
    createUser: number;
  };

  type OpenJob = {
    id: number;
    appId: number;
    jobName: string;
    handlerName: string;
    cronExpression: string;
    params: string;
    status: number;
    createTime: Date;
    createUser: number;
  };

  type CurrentUser = {
    username?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type CaptchaParams = {
    deviceId?: string;
    mobile?: string;
  };

  type CacheNameItem = {
    cacheName?: string;
    cacheKeySize?: string;
  };

  type CacheKeyItem = {
    cacheKey?: string;
  };

  type PreloadCacheParams = {
    appId?: number;
    cacheNames?: any[];
  };

  type ClearCacheParams = {
    appId?: number;
    cacheNames?: any[];
  };

  type CacheParams = {
    appId?: number;
    cacheName?: string;
    key?: string;
    value?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    deviceId?: string;
    mobile?: string;
    captcha?: string;
    type?: string;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
