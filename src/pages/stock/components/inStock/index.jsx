// @flow
import * as React from 'react';
import Table from "../table";
import Button from "../button";
import Text from "../text";
import First from "../first";
import {UseInStock, UseProcess} from "MES-Apis/lib";
import {useEffect} from "react";
import {ErpEnums} from "MES-Apis/lib/Erp";


const InStock = (props) => {

    const {loading, data = {}, run} = UseInStock.instockList({}, {
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
            title="入库物料"
            loading={loading}
            dataSource={dataSource.map(item => {
                let statusName = ''
                let type = ''
                if (item.instockNumber === item.number) {
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
                    number: item.number,
                    statusName
                }
            })}
        />
    );
};
export default InStock;
