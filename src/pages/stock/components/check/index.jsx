// @flow
import * as React from 'react';
import Table from "../table";
import Button from "../button";
import Text from "../text";
import First from "../first";
import {UseProcess} from "MES-Apis/lib";
import {useEffect} from "react";
import {ErpEnums} from "MES-Apis/lib/Erp";


 const Check = (props) => {

     const {loading, data = {}, run} = UseProcess.auditList({}, {
         manual: true
     })
     useEffect(() => {
         run({
             params: {
                 limit: 50,
                 page: 1
             },
             data: {type: ErpEnums.stocktaking}
         });
     }, [])

     const dataSource = (data.data || [])
     const columns = [
         {
             title: '单据信息',
             dataIndex: 'taskName',
             key: 'taskName',
             align: 'left',
             render: (item) => {
                 return (<First>{item.taskName}</First>);
             }
         },
         {
             title: '盘点数量',
             dataIndex: 'name',
             key: 'name1',
             align: 'center',
             width: 130,
             render: (item, index) => {
                 const receivedCount = item.receipts?.handle
                 return (<Text color={"#FFE905"}>{receivedCount}</Text>);
             }
         },
         {
             title: '状态',
             dataIndex: 'age',
             key: 'age',
             width: 200,
             align: 'center',
             render: (item) => {
                 const statusName = item.receipts?.statusName
                 let type = ''
                 switch (item.status) {
                     case 0:
                         type = 'blue'
                         break;
                     case 49:
                         type = 'orange'
                         break;
                     case 50:
                         type = 'red'
                         break;
                     case 99:
                         type = 'green'
                         break;
                 }
                 return (<Button type={type}>{statusName}</Button>);
             }
         }
     ];


    return (
            <Table title='盘点任务' loading={loading} columns={columns} dataSource = {dataSource}/>
    );
};
 export default Check;
