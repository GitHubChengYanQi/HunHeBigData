import * as React from 'react';
import Table from "../table";
import {useEffect} from "react";
import {UseStockForewarn} from "MES-Apis/lib/StockForewarn";


const InventoryAlert = () => {

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

    return (
        <Table
            title="库存预警"
            loading={loading}
            dataSource={dataSource.map(item => {
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
                return {
                    createTime: item.createTime,
                    skuResult: {...item.skuResult, spuName: item.skuResult.spuResult?.name},
                    type,
                    number: item.number,
                    statusName: text
                }
            })}
        />
    );
};
export default InventoryAlert;
