import * as React from 'react';
import Table from "../table";
import {UseOutStock} from "MES-Apis/lib";
import {useEffect} from "react";
import {ErpEnums} from "MES-Apis/lib/Erp";


const OutStock = (props) => {

    const {loading, data = {}, run} = UseOutStock.productionPickListsDetailList({}, {
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
            loading={loading}
            title='出库物料'
            dataSource={dataSource.map(item => {
                let statusName = ''
                let type = ''
                if (Number(item.receivedNumber) === item.number) {
                    statusName = '完成'
                    type = 'green'
                } else {
                    statusName = '进行中'
                    type = 'blue'
                }
                return {
                    createTime: item.createTime,
                    skuResult: item.skuResult,
                    type,
                    number: item.number,
                    statusName
                }
            })}
        />
    );
};
export default OutStock;
