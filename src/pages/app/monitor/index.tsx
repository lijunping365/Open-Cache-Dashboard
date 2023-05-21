import React, { useCallback, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, message, Row, Statistic } from 'antd';
import {
  fetchInstanceTok,
  fetchCacheNameTok,
  fetchAppAnalysisStatistic
} from '@/services/open-cache/monitor';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { ChartCard } from '@/components/ChartCard';
import { TopCard } from '@/components/TopCard';
import { handlerTokData } from '@/utils/utils';

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.id : 1);
  const [loading, setLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.CacheStatistic>();
  const [cacheNameTok, setCacheNameTok] = useState<API.TokChart[]>([]);
  const [instanceTok, setInstanceTok] = useState<API.TokChart[]>([]);

  const onFetchCacheNameTokData = useCallback(async () => {
    setLoading(true);
    fetchCacheNameTok({ appId })
      .then((res) => {
        if (res) setCacheNameTok(handlerTokData(res));
      })
      .catch((reason) => message.error(reason))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onFetchCacheNameTokData().then();
  }, []);

  const onFetchInstanceTokData = useCallback(async () => {
    fetchInstanceTok({ appId })
      .then((res) => {
        if (res) setInstanceTok(handlerTokData(res));
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onFetchInstanceTokData().then();
  }, []);

  useEffect(() => {
    const getAnalysisNumber = () => {
      fetchAppAnalysisStatistic(appId)
        .then((res) => {
          if (res) setStatisticNumber(res);
        })
        .catch()
        .finally(() => setLoading(false));
    };
    getAnalysisNumber();
  }, [appId]);

  return (
    <PageContainer loading={loading}>
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

      <ChartCard appId={appId} />
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <TopCard loading={loading} title={'CacheName请求次数排行榜TOP10'} data={cacheNameTok} />
        </Col>
        <Col span={12}>
          <TopCard loading={loading} title={'节点请求次数排行榜TOP10'} data={instanceTok} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default TableList;
