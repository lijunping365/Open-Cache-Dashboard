import { request } from 'umi';

export async function fetchCacheStatistic(appId: number) {
  return request('/analysis/statistic', {
    method: 'GET',
    params: {
      appId,
    },
  });
}

export async function fetchCacheChart(params: API.ChartParam) {
  return request('/analysis/chart', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function fetchCacheNameTok(params: API.CacheNameTokParam) {
  return request('/analysis/cacheNameTok', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function fetchInstanceTok(params: API.InstanceTokParam) {
  return request('/analysis/instanceTok', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
