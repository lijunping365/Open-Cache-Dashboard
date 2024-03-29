import { history } from '@@/core/history';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isMobile = (mobile: string): boolean => phoneReg.test(mobile);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const generateUUID = () => {
  const s: any[] = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
};

export const ignorePath = () => {
  return history.location.pathname !== '/login';
};

export const handlerTokData = (res: any) => {
  const d1 = res.map((item: any) => {
    return { key: item.key, value: Number(item.requestCount), name: '总请求总数' };
  });
  const d2 = res.map((item: any) => {
    return { key: item.key, value: Number(item.hitCount), name: '总命中总数' };
  });

  return d1.concat(d2);
};

export const handlerChartData = (res: any) => {
  const d1 = res.map((item: any) => {
    return { date: item.date, value: Number(item.requestCount), name: '总请求总数' };
  });
  const d2 = res.map((item: any) => {
    return { date: item.date, value: Number(item.hitCount), name: '总命中总数' };
  });

  return d1.concat(d2);
};

export const getTopCount = (timeType: API.TimeType) => {
  switch (timeType){
    case "today":
      return 1;
    case "week":
      return 7;
    case "month":
      return 30
    default:
      return 30;
  }
};
