import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { fetchInstancePage } from '@/services/open-cache/node';
import type { RouteChildrenProps } from 'react-router';
import {Link} from "@umijs/preset-dumi/lib/theme";


const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.appId : 1);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.Instance>[] = [
    {
      title: '实例地址',
      dataIndex: 'serverId',
      tooltip: '唯一标识',
    },
    {
      title: '上线时间',
      dataIndex: 'onlineTime',
      valueType: 'dateTime',
    },
    {
      title: '运行时长',
      dataIndex: 'liveTime',
      valueType: 'text',
    },
    {
      title: 'CPU 占用',
      dataIndex: 'cpuInfo',
      valueType: 'text',
    },
    {
      title: '内存占用',
      dataIndex: 'memoryInfo',
      valueType: 'text',
    },
    {
      title: '磁盘占用',
      dataIndex: 'diskInfo',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        OFF_LINE: { text: '已下线', status: 'Error' },
        ON_LINE: { text: '已上线', status: 'Success' },
      },
    },
    {
      title: '权重',
      dataIndex: 'weight',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: '/cacheMonitor',
              search: `?appId=${appId}&serverId=${record.serverId}`,
              hash: '#the-hash',
              state: { fromDashboard: true },
            }}
          >
            查看详情
          </Link>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Instance, API.PageParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={async (params) => {
          const response = await fetchInstancePage({ ...params, appId });
          return {
            data: response.records,
            total: response.total,
            success: true,
            pageSize: response.pages,
            current: response.current,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
