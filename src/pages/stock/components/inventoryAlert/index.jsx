// @flow
import * as React from 'react';
import Table from "../table";
import Button from "../button";
import Text from "../text";
import First from "../first";
import {useEffect} from "react";
import {UseStockForewarn} from "MES-Apis/lib/StockForewarn";
import {SkuResultSkuJsons} from "MES-Apis/lib/Sku";
import styles from './index.less'


const InventoryAlert = (props) => {

    const {loading, data = {}, run} = UseStockForewarn.warningSkus({}, {
        manual: true
    })

    useEffect(() => {
        run({
            params: {
                limit: 50,
                page: 1
            },
        });
    }, [])

    const dataSource = (data.data || [])
    const columns = [
        {
            title: '物料信息',
            dataIndex: 'taskName',
            key: 'taskName',
            align: 'left',
            render: (item) => {
                return (<First>
                    {SkuResultSkuJsons({skuResult: item.skuResult})}
                </First>);
            }
        },
        {
            title: '库存数量',
            dataIndex: 'number',
            key: 'name1',
            align: 'center',
            width: 120,
            render: (item, index) => {
                return (<Text color={"#FFE905"}>{item.number}</Text>);
            }
        },
        {
            title: '报警类型',
            dataIndex: 'age',
            key: 'age',
            width: 200,
            align: 'center',
            render: (item) => {
                let type = ''
                let text = ''
                if (item.number <= item.inventoryFloor) {
                    type = 'red'
                    text = '下限报警'
                } else if (item.number >= item.inventoryCeiling) {
                    type = 'orange'
                    text = '上限报警'
                } else {
                    type = 'blue'
                    text = '未报警'
                }
                return (<Button type={type}>{text}</Button>);
            }
        }
    ];

    return (
        <Table title="库存预警" loading={loading} columns={columns} dataSource={dataSource} />
    );
};
export default InventoryAlert;
