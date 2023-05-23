import { request } from 'umi';

export async function fetchInstancePage(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  /** 实例id */
  clientId?: any;
  /** 应用id */
  appId?: any;
  /** 实例状态 */
  status?: number;
}) {
  return request('/instance/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}
