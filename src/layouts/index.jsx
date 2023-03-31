import React from "react";
import {Outlet} from 'umi';
import styles from './index.less';
import 'antd/dist/antd.css';
import 'moment/locale/zh-cn';

export default function Layout() {


    return (
        <div className={styles.navs}>
            <Outlet/>
        </div>
    );
}
