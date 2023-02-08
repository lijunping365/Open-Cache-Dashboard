import {request} from "@@/plugin-request/request";

export async function fetchCacheMetricsPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 应用id */
    appId?: number;
    /** 应用id */
    cacheName?: string;
  }
) {
  return request('/metrics/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeOpenCacheMetrics(params: {ids: number[]}) {
  return request('/app/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
