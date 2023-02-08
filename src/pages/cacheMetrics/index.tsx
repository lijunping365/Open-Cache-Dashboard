import {Button, message} from 'antd';
import React, {useState, useRef} from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {confirmModal} from "@/components/ConfirmModel";
import type {RouteChildrenProps} from "react-router";
import {fetchCacheMetricsPage, removeOpenCacheMetrics} from "@/services/open-cache/metrics";

const removeCacheMetrics = async (selectedRows: any[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeOpenCacheMetrics({ ids: selectedRows });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.CacheMetricsItem[]>([]);
  const { query }: any = location;
  const [appId] = useState<number>(query? query.appId : 0);
  const [cacheName] = useState<string>(query? query.cacheName : '');

  const columns: ProColumns<API.CacheMetricsItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      valueType: 'text',
      hideInTable: true,
      search: false
    },
    {
      title: '实例id',
      dataIndex: 'instanceId',
      valueType: 'text',
    },
    {
      title: '请求总数',
      dataIndex: 'requestCount',
      valueType: 'text',
      search: false
    },
    {
      title: '命中总数',
      dataIndex: 'hitCount',
      valueType: 'text',
      search: false
    },
    {
      title: '未命中总数',
      dataIndex: 'missCount',
      valueType: 'text',
      search: false
    },
    {
      title: '命中率',
      dataIndex: 'hitRate',
      valueType: 'text',
      search: false
    },
    {
      title: '未命中率',
      dataIndex: 'missRate',
      valueType: 'text',
      search: false
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              const confirm = await confirmModal();
              if (confirm){
                await removeCacheMetrics([record.id]);
                actionRef.current?.reloadAndRest?.();
              }
            }}
          >
            查询缓存
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.CacheMetricsItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={async (params) => {
          const response = await fetchCacheMetricsPage({ ...params, appId, cacheName });
          return {
            data: response.records,
            total: response.total,
            success: true,
            pageSize: response.pages,
            current: response.current,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await removeCacheMetrics(selectedRowsState ? selectedRowsState.map((e) => e.id):[]);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default TableList;
