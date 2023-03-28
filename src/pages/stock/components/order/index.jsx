// @flow
import * as React from 'react';
import Table from "../table";
import Button from "../button";
import Text from "../text";
import First from "../first";
import {UseOrder, UseProcess} from "MES-Apis/lib";
import {useEffect} from "react";
import {ErpEnums} from "MES-Apis/lib/Erp";


const Order = (props) => {

    const {loading, data = {}, run} = UseOrder.orderDetailList({}, {
        manual: true,
        onSuccess: () => {
            setTimeout(() => {
                select()
            }, 18000000)
        }
    })

    const select = () => {
        run({
            params: {
                limit: 50,
                page: 1
            },
        });
    }

    useEffect(() => {
        select()
    }, [])

    const dataSource = (data.data || [])

    return (
        <Table
            title="在途物料"
            loading={loading}
            dataSource={dataSource.map(item => {
                let statusName = ''
                let type = ''
                if (item.inStockNumber === item.purchaseNumber) {
                    statusName = '完成'
                    type = 'green'
                } else {
                    statusName = '进行中'
                    type = 'blue'
                }
                return {
                    createTime: item.createTime,
                    skuResult: {...item.skuResult, spuName: item.skuResult.spuResult.name},
                    type,
                    number: item.purchaseNumber,
                    statusName
                }
            })}
        />
    );
};
export default Order;
