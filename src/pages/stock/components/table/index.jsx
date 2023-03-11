// @flow
import * as React from 'react';
import arrow from '../../../../assets/arrowhead.png';
import style from './index.less'
import {useEffect, useRef, useState} from "react";

const Table = (props) => {
    const {dataSource = [], columns = [], key,title} = props;
    // const [width,setWidth] = useState(0);
    const [renderColumns, setRenderColums] = useState([]);


    const refTable = useRef();
    /** 是否滚动 */
    const [isScrolle, setIsScrolle] = useState(0);
    const [random] = useState(Math.floor(Math.random()*(999999-111111+1))+111111);

    /** 滚动速度，值越小，滚动越快 */
    const speed = 30;
    const warper = useRef(null);
    /** 原数据 */
    const dom1 = useRef(null);
    /** 拷贝数据 */
    const dom2 = useRef(null);

    useEffect(() => {
        let width = 0;
        if (refTable.current) {
            width = refTable.current.clientWidth;
        }
        const tmpArray = columns.filter(item => !item.width);
        console.log(tmpArray);
        const len = tmpArray.length;

        const tmpList = [...columns];
        if (len) {
            tmpList.forEach(item => {
                if (!item.width) {
                    //TODO 宽度需要减去已经设定宽度的总和
                    item.width = width / len;
                }
            });
        }
        setRenderColums(tmpList);
    }, [columns]);

    const resizeWidth  = ()=>{
        setIsScrolle(document.body.clientHeight);
    }
    // 开始滚动
    useEffect(() => {
        // 多拷贝一层，让它无缝滚动
        window.addEventListener("resize", resizeWidth)
        let timer;
        const dom1 = document.getElementById(`dom1-${random}`);
        const dom2 = document.getElementById(`dom2-${random}`);
        const warper = document.getElementById(`warper-${random}`);
        if (dom1.clientHeight>warper.clientHeight) {
            dom2.innerHTML = dom1.innerHTML;
            timer = setInterval(() => {
                warper.scrollTop >= dom1.scrollHeight
                    ? (warper.scrollTop = 0)
                    : warper.scrollTop++;
            }, speed);
        }else{
            dom2.innerHTML = "";
        }
        return () => {
            window.removeEventListener("resize", resizeWidth)
            clearTimeout(timer);
        };
    }, [isScrolle]);

    return (
        <div ref={refTable} className={style.table}>
            <div className={style.header}>
                <img src={arrow} alt=""/>
                <div>{title}</div>
            </div>
            <div className={style.thead}>
                <table className={style.theadText}>
                    <colgroup>
                        {renderColumns.map(item => <col key={item.key} style={{width: item.width ? item.width : 'auto'}}/>)}
                    </colgroup>
                    <thead>
                    <tr>
                        {renderColumns.map(item => <th key={item.key} style={{textAlign: item.align || 'center'}}>{item.title}</th>)}
                    </tr>
                    </thead>

                </table>
            </div>
            <div className={style.tbody}>
                <div ref={warper} id={`warper-${random}`} style={{height:"100%",overflow:"hidden"}}>
                    <div ref={dom1} id={`dom1-${random}`}>
                        <table>
                            <colgroup>
                                {renderColumns.map(item => <col key={item.key} style={{width: item.width ? item.width : 'auto'}}/>)}
                            </colgroup>
                            <tbody>

                            {dataSource.map((item, index) => {
                                return <tr key={key ? key : index} style={{height: 40}}>{columns.map(it => <td
                                    key={it.key}
                                    style={{textAlign: it.align || 'center'}}>{typeof it.render == "function" ? it.render(item, index) : item[it.dataIndex]}</td>)}</tr>
                            })}

                            </tbody>
                        </table>
                    </div>
                    <div ref={dom2} id={`dom2-${random}`}>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Table;