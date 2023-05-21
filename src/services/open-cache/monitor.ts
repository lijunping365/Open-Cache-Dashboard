import { request } from 'umi';

export async function fetchAnalysisStatistic() {
  return request('/analysis/statistic', {
    method: 'GET',
  });
}

export async function fetchAppAnalysisStatistic(appId: number) {
  return request('/analysis/appStatistic', {
    method: 'GET',
    params: {
      appId,
    },
  });
}

export async function fetchCacheNameAnalysisNumber(appId: number, cacheName: string) {
  return request('/analysis/cacheNameStatistic', {
    method: 'GET',
    params: {
      appId,
      cacheName
    },
  });
}

export async function fetchInstanceAnalysisNumber(appId: number, serverId: string) {
  return request('/analysis/instanceStatistic', {
    method: 'GET',
    params: {
      appId,
      serverId
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
