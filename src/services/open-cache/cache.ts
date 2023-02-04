import { request } from 'umi';

export async function fetchCacheNamesPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 应用id */
    appId?: number;
  }
) {
  return request('/cache/cacheNames', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 二级缓存数据加载到一级缓存 */
export async function preloadCache(params: Partial<API.PreloadCacheParams>) {
  return request('/cache/preload', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 清空该 cacheName 下的缓存 */
export async function clearCache(params: Partial<API.ClearCacheParams>) {
  return request('/cache/clear', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 根据 key 清除 */
export async function evictCache(params: Partial<API.CacheParams>) {
  return request('/cache/evict', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}

/** 根据 key 清除 */
export async function updateCache(params: Partial<API.CacheParams>) {
  return request('/cache/update', {
    method: 'POST',
    data: {
      ...params,
    }
  });
}
