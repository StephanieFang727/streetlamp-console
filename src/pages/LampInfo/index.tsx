import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Switch } from "antd";

import { TableListItem } from './data.d';
import { getLampInfo } from '../../services/user'
import {connect} from "umi";

const TableList = ({dispatch}) => {
  const actionRef = useRef<ActionType>();
  const onChange = (id,e) => {
    if (dispatch) {
      dispatch({
        type: 'user/updateLightStatus',
        id,
        state: e ? 1 : 0,
      });
    }
    actionRef.current.reload();
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '路灯ID',
      dataIndex: 'light_id',
      width: '10%',
    },
    {
      title: '光照数据',
      dataIndex: 'lightData',
      width: '10%',
    },
    {
      title: '红外数据',
      dataIndex: 'hongwaiData',
      width: '10%',
    },
    {
      title: '声控数据',
      dataIndex: 'voiceData',
      width: '10%',
    },
    {
      title: '路灯状态',
      dataIndex: 'isOn',
      width: '10%',
      render: (item,record)=>
        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={!!item} onChange={(e)=>onChange(record.light_id,e)}/>
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="路灯数据"
        search={false}
        actionRef={actionRef}
        request={()=>getLampInfo()}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default connect()(TableList);
