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
        Init.setToken(globalData.token || 'eyJhbGciOiJIUzUxMiJ9.eyJleHBpcmVzSW4iOjg2NDAwLCJzdWIiOiIxNDI1MjkyNjU4MTI5MDMxMTcwIiwiZXhwIjoxNjc5MTIxMjM2LCJ1c2VySWQiOjE0MjUyOTI2NTgxMjkwMzExNzAsImlhdCI6MTY3OTAzNDgzNiwiYWNjb3VudCI6ImNoZW5nIiwidXNlcktleSI6Inh4eHgifQ.rbfPxTcb-A0gVXhQ4vX3eNdoaPoWUrSELj676xwoqJzpamRwlIoqz4wHVOy6JKeYnKj9VhAlj0BvDGa5I5k9eg');
        Init.initBaseURL(globalData.baseUrl || 'http://192.168.2.220:8885');
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


    if (auth) {
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
