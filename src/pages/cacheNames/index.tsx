import { Button, message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { fetchCacheNamesPage, preloadCache, clearCache } from '@/services/open-cache/cache';
import { confirmModal } from '@/components/ConfirmModel';
import type { RouteChildrenProps } from 'react-router';
import { Link } from 'umi';

const doPreloadCache = async (appId: number, cacheNames: any[]) => {
  const hide = message.loading('正在预热缓存');
  if (!cacheNames) return true;
  try {
    await preloadCache({ appId, cacheNames });
    hide();
    message.success('缓存预热成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('缓存预热失败，请重试');
    return false;
  }
};

const doClearCache = async (appId: number, cacheNames: any[]) => {
  const hide = message.loading('正在清除缓存');
  if (!cacheNames) return true;
  try {
    await clearCache({ appId, cacheNames });
    hide();
    message.success('缓存清除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('缓存清除失败，请重试');
    return false;
  }
};

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.CacheNameItem[]>([]);
  const { query }: any = location;
  const [appId] = useState<number>(query ? query.id : 0);

  const columns: ProColumns<API.CacheNameItem>[] = [
    {
      title: '缓存名称',
      dataIndex: 'cacheName',
      valueType: 'text',
      tip: '缓存名称在应用内唯一',
    },
    {
      title: '本地缓存TTL',
      dataIndex: 'ttl',
      valueType: 'text',
      search: false,
      tip: '本地缓存失效时间，单位秒',
    },
    {
      title: '本地缓存容量',
      dataIndex: 'maxSize',
      valueType: 'text',
      search: false,
      tip: '本地缓存最大数量',
    },
    {
      title: '缓存Key数量',
      dataIndex: 'cacheKeySize',
      valueType: 'text',
      search: false,
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
              if (confirm) {
                await doPreloadCache(appId, [record.cacheName]);
                actionRef.current?.reloadAndRest?.();
              }
            }}
          >
            缓存预热
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              const confirm = await confirmModal();
              if (confirm) {
                await doClearCache(appId, [record.cacheName]);
                actionRef.current?.reloadAndRest?.();
              }
            }}
          >
            清除缓存
          </a>
          <Divider type="vertical" />
          <Link
            to={{
              pathname: '/cacheKeys',
              search: `?appId=${appId}&cacheName=${record.cacheName}`,
              hash: '#the-hash',
              state: { fromDashboard: true },
            }}
          >
            缓存管理
          </Link>
          <Divider type="vertical" />
          <Link
            to={{
              pathname: '/cacheMetrics',
              search: `?appId=${appId}&cacheName=${record.cacheName}`,
              hash: '#the-hash',
              state: { fromDashboard: true },
            }}
          >
            查看指标
          </Link>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.CacheNameItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={async (params) => {
          const response = await fetchCacheNamesPage({ ...params, appId });
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
              await doPreloadCache(
                appId,
                selectedRowsState ? selectedRowsState.map((e) => e.cacheName) : [],
              );
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量预热
          </Button>
          <Button
            onClick={async () => {
              await doClearCache(
                appId,
                selectedRowsState ? selectedRowsState.map((e) => e.cacheName) : [],
              );
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量清除
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default TableList;
