import {
  AlertOutlined,
  ApiOutlined,
  ArrowUpOutlined,
  BarChartOutlined,
  BugOutlined,
  CoffeeOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card, Col, Row, Statistic, Tag, Typography } from 'antd';
import React from 'react';
import styles from './Welcome.less';

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message="欢迎使用 Open-Cache，一款简单易用且轻量级易拓展的分布式缓存系统。"
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <Tag icon={<BarChartOutlined />} color="#55acee">
            轻量级
          </Tag>
          <Tag icon={<DeploymentUnitOutlined />} color="#55acee">
            简单易用
          </Tag>
          <Tag icon={<BugOutlined />} color="#55acee">
            分布式
          </Tag>
          <Tag icon={<CoffeeOutlined />} color="#55acee">
            缓存框架
          </Tag>
          <Tag icon={<DashboardOutlined />} color="#55acee">
            监控
          </Tag>
          <Tag icon={<AlertOutlined />} color="#55acee">
            报警
          </Tag>
          <Tag icon={<ApiOutlined />} color="#55acee">
            可拓展性高
          </Tag>

          <a
            href="https://github.com/lijunping365/Open-Cache"
            rel="noopener noreferrer"
            target="__blank"
          >
            欢迎使用
          </a>
        </Typography.Text>

        <Row gutter={16} className={styles.statisticBlock}>
          <Col span={12}>
            <Card>
              <Statistic title="累计使用人数" value={112893} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="今日新增人数"
                value={20}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};
