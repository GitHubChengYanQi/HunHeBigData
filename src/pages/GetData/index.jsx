import React from "react";
import {Button, Result} from "antd";

const GetData = () => {


    return <>
        <Result
            title="请点击获取数据"
            extra={
                <Button type="primary" key="console" onClick={()=>{
                    // window.open('https://baidu.com')
                    window.electronAPI.getData({aaa:111})
                }}>
                    获取数据
                </Button>
            }
        />
    </>
};

export default GetData
