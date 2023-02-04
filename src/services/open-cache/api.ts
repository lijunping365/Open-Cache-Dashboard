import { request } from 'umi';

/** 获取当前的用户 GET /user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}






export async function fetchScheduleTaskPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 爬虫id */
    spiderId?: any
    /** 任务状态 */
    status?: number
  }
) {
  return request('/task/page', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function updateScheduleTask(params: Partial<API.OpenJob>) {
  return request('/task/update', {
    method: 'PUT',
    data: {...params}
  });
}

export async function addScheduleTask(params: Partial<API.OpenJob>) {
  return request('/task/save', {
    method: 'POST',
    data: {...params}
  });
}

export async function removeScheduleTask(params: {ids: number[]}) {
  return request('/task/delete', {
    method: 'DELETE',
    data: {...params}
  });
}

export async function startScheduleTask(id: number) {
  return request(`/task/start/${id}`, {
    method: 'PUT',
  });
}

export async function stopScheduleTask(id: number) {
  return request(`/task/stop/${id}`, {
    method: 'PUT',
  });
}

export async function nextTriggerTime(cronExpress: string) {
  return request(`/task/nextTriggerTime`, {
    method: 'GET',
    params: {
      cronExpress,
    },
  });
}

export async function fetchSpiderNumber() {
  return request('/statistic/number', {
    method: 'GET',
  });
}

export async function fetchSpiderReport() {
  return request('/statistic/report', {
    method: 'GET',
  });
}

export async function validateCronExpress(cronExpress: string) {
  return request(`/task/validateCron`, {
    method: 'GET',
    params: {
      cronExpress,
    },
  });
}

