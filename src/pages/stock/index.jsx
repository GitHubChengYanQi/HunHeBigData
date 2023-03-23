import * as React from 'react';
import style from "./index.less";
import logo from '../../assets/logo.png'
import title from '../../assets/title.png'
import Time from "./components/time";
import OutStock from "./components/outStock";
import InStock from "./components/inStock";
import InventoryAlert from "./components/inventoryAlert";
import {useEffect} from "react";
import Statistics from "./components/statistics";
import Order from "./components/order";


const Stock = (props) => {

    useEffect(() => {
        const video = document.getElementById('video');
        video.src = "https://hunts-cnc.oss-cn-beijing.aliyuncs.com/upload/video/video.mp4"
        video.play();
    }, [])

    return (
        <div>
            <div id="header" className={style.header}>
                <div className={style.headerLeft}><img src={logo} height={30} /></div>
                <div className={style.title}>
                    <img src={title} height={75} />
                </div>
                <div className={style.headerRight}>
                    <Time />
                </div>
            </div>
            <div id="content" className={style.content}>
                <div id="left" className={style.left}>
                    <div id="left-top" className={style.leftTop}><OutStock /></div>
                    <div id="left-bottom" className={style.leftBottom}><Order /></div>
                </div>
                <div id="center" className={style.center}>
                    <div id="center-top" className={style.centerTop}><Statistics /></div>
                    <div id="center-bottom" className={style.centerBottom}>
                        <video muted id="video" style={{margin: "auto"}} autoPlay loop height="100%" src="" />
                    </div>
                </div>
                <div id="right" className={style.right}>
                    <div id="right-top" className={style.rightTop}><InStock /></div>
                    <div id="right-bottom" className={style.rightBottom}><InventoryAlert /></div>
                </div>
            </div>
        </div>
    );
};
export default Stock;
