import React, { useCallback, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Statistic } from 'antd';
import { fetchInstanceAnalysisNumber, fetchCacheNameTok } from '@/services/open-cache/monitor';
import type { RouteChildrenProps } from 'react-router';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import { ChartCard } from '@/components/ChartCard';
import { TopCard } from '@/components/TopCard';
import { handlerTokData } from '@/utils/utils';

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.appId : 1);
  const [instanceId] = useState<string>(query ? query.serverId : '');
  const [loading, setLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<API.CacheStatistic>();
  const [cacheNameTok, setCacheNameTok] = useState<API.TokChart[]>([]);

  const onFetchCacheNameTokData = useCallback(async () => {
    fetchCacheNameTok({ appId, instanceId })
      .then((res) => {
        if (res) setCacheNameTok(handlerTokData(res));
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onFetchCacheNameTokData().then();
  }, []);

  useEffect(() => {
    const getAnalysisNumber = () => {
      fetchInstanceAnalysisNumber(appId, instanceId)
        .then((res) => {
          if (res) setStatisticNumber(res);
        })
        .catch()
        .finally(() => setLoading(false));
    };
    getAnalysisNumber();
  }, [appId, instanceId]);

  return (
    <PageContainer loading={loading}>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="CPU信息"
              value={statisticNumber?.cpuInfo  || '-'}
              prefix={<DashboardOutlined />}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="内存信息"
              value={statisticNumber?.memoryInfo || '-'}
              prefix={<BarChartOutlined />}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="磁盘信息"
              value={statisticNumber?.diskInfo || '-'}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="运行时长"
              value={statisticNumber?.liveTime || '-'}
              valueStyle={{fontSize: '20px'}}
            />
          </Card>
        </Col>
      </Row>

      <ChartCard appId={appId} instanceId={instanceId} />

      <TopCard title='CacheName请求次数排行榜TOP10' data={cacheNameTok} loading={loading} />
    </PageContainer>
  );
};

export default TableList;
