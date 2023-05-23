import React, { useCallback, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Col, message, Row, Statistic} from 'antd';
import {fetchAnalysisChart, fetchCacheNameAnalysisNumber, fetchInstanceTok} from '@/services/open-cache/monitor';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { ChartCard } from '@/components/ChartCard';
import { TopCard } from '@/components/TopCard';
import {handlerChartData, handlerTokData} from '@/utils/utils';

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.appId : 1);
  const [cacheName] = useState<string>(query ? query.cacheName : '');
  const [loading, setLoading] = useState<boolean>(true);
  const [tokLoading, setTokLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.CacheStatistic>();
  const [instanceTok, setInstanceTok] = useState<API.TokChart[]>([]);
  const [selectDate, setSelectDate] = useState<API.TimeType>('today');
  const [chartData, setChartData] = useState<API.CacheChart[]>([]);

  const onFetchInstanceTokData = useCallback(async () => {
    setTokLoading(true);
    fetchInstanceTok({ appId, cacheName })
      .then((res) => {
        if (res) setInstanceTok(handlerTokData(res));
      })
      .catch()
      .finally(() => setTokLoading(false));
  }, []);

  useEffect(() => {
    onFetchInstanceTokData().then();
  }, []);

  useEffect(() => {
    const getAnalysisNumber = () => {
      fetchCacheNameAnalysisNumber(appId, cacheName)
        .then((res) => {
          if (res) setStatisticNumber(res);
        })
        .catch()
        .finally(() => setLoading(false));
    };
    getAnalysisNumber();
  }, [appId, cacheName]);

  useEffect(() => {
    const getAnalysisChart = () => {
      setLoading(true);
      fetchAnalysisChart({ appId, cacheName})
        .then((res: any) => {
          if (res) {
            setChartData(handlerChartData(res));
          }
        })
        .catch((reason) => message.error(reason))
        .finally(() => setLoading(false));
    };
    getAnalysisChart();
  }, [appId, cacheName]);

  return (
    <PageContainer>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="CacheName 名称"
              value={statisticNumber?.cacheName}
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日总命中数及总请求数"
              value={statisticNumber?.hitCount || 0}
              prefix={<BarChartOutlined />}
              suffix={`/ ${statisticNumber?.requestCount || 0}`}
            />
          </Card>
        </Col>
      </Row>

      <ChartCard loading={loading} chartData={chartData} />

      <TopCard
        title={'节点请求次数排行榜TOP10'}
        data={instanceTok}
        loading={tokLoading}
        selectDate={selectDate}
        onChange={(value) => setSelectDate(value)}
      />
    </PageContainer>
  );
};

export default TableList;
