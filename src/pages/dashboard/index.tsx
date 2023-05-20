import React, { useCallback, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Statistic } from 'antd';
import { Chart, LineAdvance } from 'bizcharts';
import { fetchCacheChart, fetchCacheStatistic } from '@/services/open-cache/monitor';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.appId : 1);
  const [loading, setLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.CacheStatistic>();
  const [chartData, setChartData] = useState<API.CacheChart[]>([]);

  const onFetchStatisticData = useCallback(async () => {
    fetchCacheStatistic(appId)
      .then((res) => {
        if (res) setStatisticNumber(res);
      })
      .catch()
      .finally(() => setLoading(false));

    fetchCacheChart(appId)
      .then((res) => {
        if (res) {
          const data1 = res.map((item: any) => {
            return { date: item.date, value: item.totalCount, name: '执行总次数' };
          });
          const data2 = res.map((item: any) => {
            return { date: item.date, value: item.successCount, name: '执行成功次数' };
          });
          setChartData(data1.concat(data2));
        }
      })
      .catch();
  }, []);

  useEffect(() => {
    onFetchStatisticData().then();
  }, []);

  return (
    <PageContainer loading={loading}>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="应用数量"
              value={statisticNumber?.cacheNameCount}
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="CacheName 总数"
              value={statisticNumber?.nodeCount}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '20px' }}>
        <Card>
          <Chart padding={[10, 20, 50, 40]} autoFit height={400} data={chartData}>
            <LineAdvance shape="smooth" point area position="date*value" color="name" />
          </Chart>
        </Card>
      </Card>
    </PageContainer>
  );
};

export default TableList;
