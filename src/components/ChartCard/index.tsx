import { Chart, LineAdvance } from 'bizcharts';
import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchCacheChart } from '@/services/open-cache/monitor';
import { handlerChartData } from '@/utils/utils';

interface ChartCardProps {
  appId: number;
  cacheName?: string;
  instanceId?: string;
  count?: number;
}

export const ChartCard = ({ appId, cacheName, instanceId, count }: ChartCardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<API.CacheChart[]>([]);

  useEffect(() => {
    const getAnalysisChart = () => {
      setLoading(true);
      fetchCacheChart({ appId, cacheName, instanceId, count })
        .then((res: any) => {
          if (res) {
            setChartData(handlerChartData(res));
          }
        })
        .catch((reason) => message.error(reason))
        .finally(() => setLoading(false));
    };
    getAnalysisChart();
  }, []);

  return (
    <Card
      loading={loading}
      bordered={false}
      title="缓存请求次数"
      style={{
        height: '100%',
        marginTop: '20px',
      }}
    >
      <Chart padding={[10, 20, 50, 40]} autoFit height={400} data={chartData}>
        <LineAdvance shape="smooth" point area position="date*value" color="name" />
      </Chart>
    </Card>
  );
};
