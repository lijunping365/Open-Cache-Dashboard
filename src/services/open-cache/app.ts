import { request } from 'umi';

export async function fetchOpenCacheAppPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  }
) {
  return request('/app/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateOpenCacheApp(params: Partial<API.OpenCacheApp>) {
  return request('/app/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addOpenCacheApp(params: Partial<API.OpenCacheApp>) {
  return request('/app/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeOpenCacheApp(params: {ids: number[]}) {
  return request('/app/delete', {
    method: 'DELETE',
    data: {...params}
  });
}

export async function fetchOpenCacheAppList(appName?: string) {
  return request('/app/list', {
    method: 'GET',
    params: { appName },
  });
}
