import {Button, message, Divider, Modal} from 'antd';
import React, {useState, useRef} from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {fetchCacheKeysPage, updateCache, evictCache, getCacheValue} from '@/services/open-cache/cache';
import {confirmModal} from "@/components/ConfirmModel";
import type {RouteChildrenProps} from "react-router";
import ReactJson from 'react-json-view'
import {PlusOutlined} from "@ant-design/icons";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";

const TableList: React.FC<RouteChildrenProps> = ({ location }) => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleCreateModalVisible] = useState<boolean>(false);
  /** 更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.CacheKeyItem[]>([]);
  const { query }: any = location;
  const [appId] = useState<number>(query? query.appId : 0);
  const [cacheName] = useState<string>(query? query.cacheName : '');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [updateCacheValue, setUpdateCacheValue] = useState<any>();

  const doGetCacheValue = async (cacheKey: any) => {
    const hide = message.loading('正在查询');
    if (!cacheKey) return;
    try {
      const result = await getCacheValue({appId, cacheName, key: cacheKey});
      hide();
      setModalVisible(true);
      setData(result && result.value ? JSON.parse(result.value) : '');
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
    }
  };

  const doEvictCache = async (cacheKey: any[]) => {
    const hide = message.loading('正在删除');
    if (!cacheKey || cacheKey.length === 0) return true;
    try {
      await evictCache({appId, cacheName, keys: cacheKey});
      hide();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  const doUpdateCache = async (cacheKey: any, cacheValue: any) => {
    const hide = message.loading('正在删除');
    if (!cacheKey || !cacheValue) return true;
    try {
      await updateCache({appId, cacheName, key: cacheKey, value: cacheValue});
      hide();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  const handlerUpdate = async (record: any) => {
    const hide = message.loading('正在查询');
    if (!record.cacheKey){
      return
    }
    try {
      const result = await getCacheValue({appId, cacheName, key: record.cacheKey});
      hide();
      setUpdateCacheValue(result ? result.value : '');
      handleUpdateModalVisible(true);
      setUpdateFormValues(record);
    } catch (error) {
      hide();
      message.error('查值失败，请重试');
    }
  };

  const columns: ProColumns<API.CacheKeyItem>[] = [
    {
      title: '缓存Key',
      dataIndex: 'cacheKey',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              doGetCacheValue(record.cacheKey).then();
            }}
          >
            查询缓存
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handlerUpdate(record).then();
            }}
          >
            更新缓存
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              const confirm = await confirmModal();
              if (confirm){
                await doEvictCache([record.cacheKey]);
                actionRef.current?.reloadAndRest?.();
              }
            }}
          >
            删除缓存
          </a>
          <Divider type="vertical" />
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.CacheKeyItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建缓存
          </Button>,
        ]}
        request={async (params) => {
          const response = await fetchCacheKeysPage({ ...params, appId, cacheName });
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
              await doEvictCache(selectedRowsState ? selectedRowsState.map((e) => e.cacheKey):[]);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <Modal
        title="数据详情"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <ReactJson
          src={data}
          theme="google"
          iconStyle="square"
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={true}
        />
      </Modal>

      <CreateForm
        onSubmit={async (value) => {
          const success = await doUpdateCache(value.cacheKey, value.cacheValue);
          if (success) {
            handleCreateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleCreateModalVisible(false)}
        modalVisible={createModalVisible}
      />

      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await doUpdateCache(value.cacheKey, value.cacheValue);
            if (success) {
              handleUpdateModalVisible(false);
              setUpdateFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={updateFormValues}
          cacheValue={updateCacheValue}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
