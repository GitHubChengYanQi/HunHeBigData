// @flow
import * as React from 'react';
import arrow from '../../../../assets/arrowhead.png';
import style from './index.less'
import {useEffect, useState} from "react";
import {Spin} from "antd";
import First from "../first";
import Text from "../text";
import Button from "../button";
import {SkuFormat} from "MES-Apis/lib/Sku";
import moment from "moment";

const Table = (props) => {
    const {dataSource = [], key, title, loading = false} = props;

    /** 是否滚动 */
    const [isScrolle, setIsScrolle] = useState(0);
    const [random] = useState(Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111);

    /** 滚动速度，值越小，滚动越快 */
    const speed = 30;

    const resizeWidth = () => {
        setIsScrolle(document.body.clientHeight);
    }
    // 开始滚动
    useEffect(() => {
        if (dataSource.length === 0) {
            return
        }
        // 多拷贝一层，让它无缝滚动
        window.addEventListener("resize", resizeWidth)
        let timer;
        const dom1 = document.getElementById(`dom1-${random}`) || {};
        const dom2 = document.getElementById(`dom2-${random}`) || {};
        const warper = document.getElementById(`warper-${random}`) || {};
        if (dom1.clientHeight > warper.clientHeight) {
            dom2.innerHTML = dom1.innerHTML;
            timer = setInterval(() => {
                warper.scrollTop >= dom1.scrollHeight
                    ? (warper.scrollTop = 0)
                    : warper.scrollTop++;
            }, speed);
        } else {
            dom2.innerHTML = "";
        }
        return () => {
            window.removeEventListener("resize", resizeWidth)
            clearTimeout(timer);
        };
    }, [isScrolle, loading]);

    return (
        <div className={style.table}>
            <div className={style.header}>
                <img src={arrow} alt="" />
                <div>{title}</div>
            </div>
            {loading ? <div className={style.loading}><Spin /></div> : <div className={style.tbody}>
                <div id={`warper-${random}`} style={{height: "100%", overflow: "hidden"}}>
                    <div id={`dom1-${random}`}>
                        {
                            dataSource.map((item, index) => {
                                return <div
                                    key={index}
                                    className={style.item}
                                    style={{backgroundColor: index % 2 === 0 ? '#07173D' : '#083373'}}
                                >
                                    <div className={style.skuInfo}>
                                        <div className={style.sku}>
                                            <First>{SkuFormat(item.skuResult || {
                                                spuName: 'spu',
                                                skuName: 'skuName',
                                                specifications: 'specifications'
                                            })}</First>
                                        </div>
                                        <div className={style.info}>
                                            <Text color={"#FFE905"}>数量：{item.number || 0}</Text>
                                            <div className={style.coding}>{item.skuResult?.standard}</div>
                                        </div>
                                    </div>
                                    <div className={style.other}>
                                        <div className={style.coding}>
                                            {moment(item.createTime).format(moment(item.createTime).year() !== moment().year() ? 'YY / MM / DD' : 'MM / DD')}
                                        </div>
                                        <Button type={item.type}>{item.statusName || '进行中'}</Button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div id={`dom2-${random}`}>

                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Table;
