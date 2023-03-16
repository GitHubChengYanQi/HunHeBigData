import {Outlet} from 'umi';
import styles from './index.less';
import {useEffect, useState} from "react";
import {Init} from "MES-Apis/src/Init";
import {Alert, Button, Result, Spin} from "antd";

export default function Layout() {

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        const globalData = window.globalData || {}
        Init.setToken(globalData.token);
        Init.initBaseURL(globalData.baseUrl);
        setAuth(globalData.token && globalData.baseUrl);
        Init.responseConfig({
            loginTimeOut: () => {

            },
            errorMessage: (res) => {

            },
        });
        setLoading(false)
    }, [])

    if (loading) {
        return <div className={styles.loading}>
            <Spin tip="Loading..."/>
        </div>
    }


    if (!auth) {
        return <div className={styles.error}>
            <Result
                status="500"
                title="系统初始化失败！"
                subTitle="请刷新页面重试 或 联系管理员。"
            />
        </div>
    }

    return (
        <div className={styles.navs}>
            <Outlet/>
        </div>
    );
}
