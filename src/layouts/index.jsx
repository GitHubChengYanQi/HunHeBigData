import {Outlet} from 'umi';
import styles from './index.less';
import {useEffect, useState} from "react";
import {Init} from "MES-Apis/src/Init";
import {Alert, Button, Result, Spin} from "antd";

export default function Layout() {

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false)

    const token = JSON.stringify(window.plus?.webview.getWebviewById("stock").token) || 'eyJhbGciOiJIUzUxMiJ9.eyJleHBpcmVzSW4iOjg2NDAwLCJzdWIiOiIxNDI1MjkyNjU4MTI5MDMxMTcwIiwiZXhwIjoxNjc4OTI0ODA0LCJ1c2VySWQiOjE0MjUyOTI2NTgxMjkwMzExNzAsImlhdCI6MTY3ODgzODQwNCwiYWNjb3VudCI6ImNoZW5nIiwidXNlcktleSI6Inh4eHgifQ.dcbN0CmramNnaLexKuGEAyfuJvLbbxydpAG62-nHXtJvubqUXC6ecvYqsTYDM5u1nb6T4EUgSCJHL9jJDHbvKg'
    const baseURI = JSON.stringify(window.plus?.webview.getWebviewById("stock").baseURI) || 'http://192.168.2.100'


    useEffect(() => {
        Init.setToken(token);
        Init.initBaseURL(baseURI);

        Init.responseConfig({
            loginTimeOut: () => {

            },
            errorMessage: (res) => {

            },
        });
        setAuth(token && baseURI);
        setLoading(false)
    }, [])

    if (loading) {
        return <div className={styles.loading}>
            <Spin tip="Loading..." />
        </div>
    }


    if (!auth) {
        return  <div className={styles.error}>
            <Result
                status="500"
                title="系统初始化失败！"
                subTitle="请刷新页面重试 或 联系管理员。"
            />
        </div>
    }

    return (
        <div className={styles.navs}>
            <Outlet />
        </div>
    );
}
