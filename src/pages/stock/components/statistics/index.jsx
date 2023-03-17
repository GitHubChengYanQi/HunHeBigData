// @flow
import * as React from 'react';
import ShadowBox from "../shadowBox";
import style from "./index.less";
import circle from '../../../../assets/Vector.png'
import Count from "../count";
import {useEffect} from "react";
import {UseErp} from "MES-Apis/lib/Erp";
import {Spin} from "antd";
import {UseOrder} from "MES-Apis/lib/Order";

const Statistics = (props) => {

    const {loading, data = {}, run} = UseErp.stockDetailsView({}, {manual: true})

    const {
        loading: orderListViewLoading,
        data: orderListViewData = {},
        run: orderListViewRun
    } = UseOrder.orderListView({}, {manual: true})

    const {
        loading: orderListViewTotalLoading,
        data: orderListViewTotalData = {},
        run: orderListViewTotalRun
    } = UseOrder.orderListViewTotal({}, {manual: true})

    const views = data.data || {}

    useEffect(() => {
        run()
        orderListViewRun()
        orderListViewTotalRun()
    }, [])

    return (
        <Spin spinning={loading || orderListViewLoading || orderListViewTotalLoading}>
            <div style={{display: "flex"}}>
                <div id="left" className={style.left} style={{flex: 1}}>
                    <div className={style.long}><ShadowBox title='采购数量' number={orderListViewData.data?.purchaseNumber} /></div>
                    <div style={{display: "flex"}}>
                        <div className={style.short}><ShadowBox title='采购种类' number={orderListViewData.data?.skuCount} /></div>
                        <div className={style.short}><ShadowBox title='供应商总数' number={orderListViewData.data?.sellerCount} /></div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className={style.short}><ShadowBox title='入库总数' number={orderListViewData.data?.inStockCount} /></div>
                        <div className={style.short}><ShadowBox title='入库进度' number={orderListViewData.data?.inStockRate} suffix='%' /></div>
                    </div>
                </div>
                <div id="center" className={style.center} style={{flex: 1}}>
                    <div className={style.total}>
                        <div className={style.shu}>{views.stockNumber || 0}</div>
                        <div className={style.text}>库存总数</div>
                    </div>

                </div>
                <div id="right" className={style.right} style={{flex: 1}}>
                    <div className={style.long}><ShadowBox title='物料种类' number={orderListViewTotalData.data?.skuCount} /></div>
                    <div style={{display: "flex"}}>
                        <div className={style.short}><ShadowBox title='库位总数' number={orderListViewTotalData.data?.positionCount} /></div>
                        <div className={style.short}><ShadowBox title='仓库总数' number={orderListViewTotalData.data?.stockCount} /></div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className={style.short}><ShadowBox title='分类总数' number={orderListViewTotalData.data?.inStockCount} /></div>
                        <div className={style.short}><ShadowBox title='品牌总数' number={orderListViewTotalData.data?.brandCount} /></div>
                    </div>
                </div>
            </div>
            <div style={{display: "flex"}}>
                <div style={{flex: 1}}>
                    <Count number={views.inNumber} len={4} title='今日入库' />
                </div>
                <div style={{flex: 1}}>
                    <Count number={views.outNumber} len={4} title='今日出库' />
                </div>
            </div>

        </Spin>
    );
};
export default Statistics;
