// @flow
import * as React from 'react';
import Table from "../table";
import Button from "../button";
import Text from "../text";
import First from "../first";


const InventoryAlert = (props) => {

    const  dataSource = [
        {
            name:"张三",
            age:"18",
            address:"佟二堡",
        }
    ];
    const  columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width:80,
            align:'center',
            render:(item,index)=>{
                return (<First>22</First>);
            }
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name1',
            align:'center',
            render:(item,index)=>{
                return (<Text color={"#f00"}>22</Text>);
            }
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            align:'center',
            render:(item,index)=>{
                return (<Button type='orange'>11</Button>);
            }
        }
    ];
    return (
            <Table title="库存预警" columns={columns} dataSource = {dataSource}/>
    );
};
export default InventoryAlert;