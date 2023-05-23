import React, { useCallback, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, message, Row, Statistic } from 'antd';
import {
  fetchInstanceTok,
  fetchCacheNameTok,
  fetchAppAnalysisStatistic, fetchAnalysisChart
} from '@/services/open-cache/monitor';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { ChartCard } from '@/components/ChartCard';
import { TopCard } from '@/components/TopCard';
import {getTopCount, handlerChartData, handlerTokData} from '@/utils/utils';

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.id : 1);
  const [chartLoading, setChartLoading] = useState<boolean>(true);
  const [tokLoading1, setTokLoading1] = useState<boolean>(true);
  const [tokLoading2, setTokLoading2] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.CacheStatistic>();
  const [cacheNameTok, setCacheNameTok] = useState<API.TokChart[]>([]);
  const [instanceTok, setInstanceTok] = useState<API.TokChart[]>([]);
  const [selectDate1, setSelectDate1] = useState<API.TimeType>('today');
  const [selectDate2, setSelectDate2] = useState<API.TimeType>('today');
  const [chartData, setChartData] = useState<API.CacheChart[]>([]);

  const onFetchCacheNameTokData = useCallback(async () => {
    setTokLoading1(true);
    fetchCacheNameTok({ appId, count: getTopCount(selectDate1)})
      .then((res) => {
        if (res) setCacheNameTok(handlerTokData(res));
      })
      .catch((reason) => message.error(reason))
      .finally(() => setTokLoading1(false));
  }, [appId, selectDate1]);

  useEffect(() => {
    onFetchCacheNameTokData().then();
  }, [appId, selectDate1]);

  const onFetchInstanceTokData = useCallback(async () => {
    setTokLoading2(true);
    fetchInstanceTok({ appId, count: getTopCount(selectDate2) })
      .then((res) => {
        if (res) setInstanceTok(handlerTokData(res));
      })
      .catch()
      .finally(() => setTokLoading2(false));
  }, [appId, selectDate2]);

  useEffect(() => {
    onFetchInstanceTokData().then();
  }, [appId, selectDate2]);

  useEffect(() => {
    const getAnalysisNumber = () => {
      fetchAppAnalysisStatistic(appId)
        .then((res) => {
          if (res) setStatisticNumber(res);
        })
        .catch();
    };
    getAnalysisNumber();
  }, [appId]);

  useEffect(() => {
    const getAnalysisChart = () => {
      setChartLoading(true);
      fetchAnalysisChart({ appId})
        .then((res: any) => {
          if (res) {
            setChartData(handlerChartData(res));
          }
        })
        .catch((reason) => message.error(reason))
        .finally(() => setChartLoading(false));
    };
    getAnalysisChart();
  }, [appId]);

  return (
    <PageContainer>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="CacheName 数量"
              value={statisticNumber?.cacheNameCount}
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="集群节点数量"
              value={statisticNumber?.nodeCount}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <ChartCard loading={chartLoading} chartData={chartData} />

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <TopCard
            loading={tokLoading1}
            title={'CacheName请求次数排行榜TOP10'}
            data={cacheNameTok}
            selectDate={selectDate1}
            onChange={(value) => setSelectDate1(value)}
          />
        </Col>
        <Col span={12}>
          <TopCard
            loading={tokLoading2}
            title={'节点请求次数排行榜TOP10'}
            data={instanceTok}
            selectDate={selectDate2}
            onChange={(value) => setSelectDate2(value)}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default TableList;
