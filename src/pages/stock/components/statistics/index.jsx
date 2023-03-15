// @flow
import * as React from 'react';
import ShadowBox from "../shadowBox";
import style from "./index.less";
import circle from '../../../../assets/Vector.png'
import Count from "../count";
import {useEffect} from "react";
import {UseErp} from "MES-Apis/lib/Erp";
import {Spin} from "antd";

const Statistics = (props) => {

    const {loading, data = {}, run} = UseErp.stockDetailsView({}, {manual: true})

    const views = data.data || {}

    useEffect(() => {
        run()
    }, [])

    return (
        <Spin spinning={loading}>
            <div style={{display: "flex"}}>
                <div id="left" className={style.left} style={{flex: 1}}>
                    <div className={style.long}><ShadowBox></ShadowBox></div>
                    <div style={{display: "flex"}}>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                    </div>
                </div>
                <div id="center" className={style.center} style={{flex: 1}}>
                    <div className={style.total}>
                        <div className={style.shu}>{views.stockNumber || 0}</div>
                        <div className={style.text}>库存总数</div>
                    </div>

                </div>
                <div id="right" className={style.right} style={{flex: 1}}>
                    <div className={style.long}><ShadowBox></ShadowBox></div>
                    <div style={{display: "flex"}}>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
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
