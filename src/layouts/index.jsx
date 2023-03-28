import {Outlet} from 'umi';
import styles from './index.less';
import {useEffect, useState} from "react";
import {Init} from "MES-Apis/src/Init";
import {Result, Spin} from "antd";

export default function Layout() {

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        const globalData = window.globalData || {}
        Init.setToken(globalData.token || 'eyJhbGciOiJIUzUxMiJ9.eyJleHBpcmVzSW4iOjg2NDAwLCJzdWIiOiIxNDI1MjkyNjU4MTI5MDMxMTcwIiwiZXhwIjoxNjc5NzMzMjQ5LCJ1c2VySWQiOjE0MjUyOTI2NTgxMjkwMzExNzAsImlhdCI6MTY3OTY0Njg0OSwiYWNjb3VudCI6ImNoZW5nIiwidXNlcktleSI6Inh4eHgifQ.Rd6vy1SaulRduP7ZJYzQdzLauegn04WN25sHtYctf2SAc7sKBjj8llEs500oQ8YP1n5NNZWnBcRMUAH50DqxNQ');
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
