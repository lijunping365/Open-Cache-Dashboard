import { request } from 'umi';

/** 获取当前的用户 GET /user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
