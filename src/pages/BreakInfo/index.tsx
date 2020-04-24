import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import { TableListItem } from './data.d';
import {getBreakInfo, addBreakInfo,} from '../../services/user'

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addBreakInfo({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '路灯ID',
      dataIndex: 'light_id',
      width: '10%',
    },
    {
      title: '维修内容',
      dataIndex: 'content',
      valueType: 'textarea',
      width: '60%',
    },
    {
      title: '维修时间',
      dataIndex: 'publishTime',
      valueType: 'dateTime',
      hideInForm: true,
      width: '20%',
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="维修信息"
        search={false}
        actionRef={actionRef}
        rowKey="bulletin_id"
        request={()=>getBreakInfo()}
        columns={columns}
        toolBarRender={() =>  [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>
        ]}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          type="form"
          columns={columns}
        />
      </CreateForm>
    </PageHeaderWrapper>
  );
};

export default TableList;
