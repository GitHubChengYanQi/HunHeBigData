// @flow
import * as React from 'react';
import style from './index.less'
import number0 from '../../../../assets/0.png'
import number1 from '../../../../assets/1.png'
import number2 from '../../../../assets/2.png'
import number3 from '../../../../assets/3.png'
import number4 from '../../../../assets/4.png'
import number5 from '../../../../assets/5.png'
import number6 from '../../../../assets/6.png'
import number7 from '../../../../assets/7.png'
import number8 from '../../../../assets/8.png'
import number9 from '../../../../assets/9.png'

const numbers = [
    number0,
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
    number7,
    number8,
    number9,
];

const Count = (props) => {

    const {title,number,len=4}= props;


    const renderNumber = ()=>{
        let tmpNumber = ('0000000000'+number)
        tmpNumber = tmpNumber.substring(tmpNumber.length-len);
        const tmp = [];
        for(let i=0; i < tmpNumber.length;i++){
            console.log(tmpNumber[i]);
            tmp.push(<div className={style.number} key={i}><img src={numbers[tmpNumber[i]]} alt=""/></div>)
        }
        console.log(tmp);
        return tmp;
    }


    return (
        <div className={style.box}>
           <div className={style.text}>{title||"标题"}</div>
            {renderNumber()}
        </div>
    );
};
export default Count;