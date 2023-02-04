import { request } from 'umi';

export async function fetchCacheOperationLogPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 应用id */
    appId?: number;
    /** 任务状态 */
    status?: number;
    /** 任务执行时间 */
    createTime?: Date;
  }
) {
  return request('/logger/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function removeCacheOperationLog(params: {ids: number[]}) {
  return request('/logger/delete', {
    method: 'DELETE',
    data: {...params}
  });
}
