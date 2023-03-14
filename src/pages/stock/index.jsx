import * as React from 'react';
import style from "./index.less";
import logo from '../../assets/logo.png'
import Time from "./components/time";
import OutStock from "./components/outStock";
import Check from "./components/check";
import InStock from "./components/inStock";
import InventoryAlert from "./components/inventoryAlert";
import TransferTask from "./components/transferTask";
import ShadowBox from "./components/shadowBox";
import {useEffect} from "react";
import Statistics from "./components/statistics";


const Stock = (props) => {

    useEffect(() => {
        const video = document.getElementById('video');
        video.src = "https://hunts-cnc.oss-cn-beijing.aliyuncs.com/upload/video/video.mp4"
        video.play();
    }, [])

    useEffect(()=>{
        // alert(JSON.stringify(window.plus.webview.getWebviewById("stock").token)) //data与uniapp里定义的键名保持一致，那里也是定义的data：this.userInfo
    },[])

    return (
        <div>
            <div id="header" className={style.header}>
                <div className={style.headerLeft}><img src={logo} height={30} /></div>
                <div className={style.title}>仓储管理系统</div>
                <div className={style.headerRight}>
                    <Time />
                </div>
            </div>
            <div id="content" className={style.content}>
                <div id="left" className={style.left}>
                    <div id="left-top" className={style.leftTop}><OutStock /></div>
                    <div id="left-bottom" className={style.leftBottom}><Check /></div>
                </div>
                <div id="center" className={style.center}>
                    <div id="center-top" className={style.centerTop}><Statistics /></div>
                    <div id="center-bottom" className={style.centerBottom}>
                        <video muted id="video" style={{margin: "auto"}} autoPlay loop height="100%" src=""></video>
                    </div>
                </div>
                <div id="right" className={style.right}>
                    <div id="right-top" className={style.rightHeight}><InStock /></div>
                    <div id="right-center" className={style.rightHeight}><InventoryAlert /></div>
                    <div id="right-bottom" className={style.rightHeight}><TransferTask /></div>
                </div>
            </div>
        </div>
    );
};
export default Stock;
