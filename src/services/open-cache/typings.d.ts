// @ts-ignore
/* eslint-disable */

declare namespace API {
  type User = {
    id: number;
    username: string;
    status: number;
    phone: string;
    createTime: Date;
  };

  type Instance = {
    serverId: string;
    onlineTime: Date;
    liveTime: string;
    cpuInfo: string;
    memoryInfo: string;
    diskInfo: string;
    status: string;
    weight: number;
  };

  type OpenCacheOperationLog = {
    id: number;
    appId: number;
    instanceId: string;
    cacheName: string;
    cacheKey: string;
    cacheValue: string;
    command: string;
    status: number;
    cause: string;
    createTime: Date;
  };

  type OpenCacheApp = {
    id: number;
    appName: string;
    appDesc: string;
    createTime: Date;
    createUser: number;
  };

  type OpenCacheValue = {
    cacheKey: string;
    cacheValue: string;
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

  type CacheStatistic = {
    taskTotalNum: number;
    taskRunningNum: number;
    executorTotalNum: number;
    executorOnlineNum: number;
  };

  type CacheChart = {
    date: Date;
    name: string;
    value: number;
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
    ttl?: number;
    maxSize?: number;
    cacheName?: string;
    cacheKeySize?: string;
  };

  type CacheKeyItem = {
    cacheKey?: string;
  };

  type CacheMetricsItem = {
    id?: number;
    appId?: number;
    instanceId?: string;
    cacheName?: string;
    requestCount?: number;
    hitCount?: number;
    missCount?: number;
    hitRate?: number;
    missRate?: number;
    createTime?: Date;
  };

  type PreloadCacheParams = {
    appId?: number;
    cacheNames?: any[];
  };

  type ClearCacheParams = {
    appId?: number;
    cacheNames?: any[];
  };

  type CacheEvictParams = {
    appId?: number;
    cacheName?: string;
    keys?: any[];
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
