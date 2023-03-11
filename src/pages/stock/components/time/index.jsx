import moment from 'moment';
import React,{useEffect, useState} from "react";
import style from './index.less';

const Time = (props) => {

    const weeks = ['一', '二', '三', '四', '五', '六', '日'];
    const [i, setI] = useState(null);
    const [nowTime, setNowTime] = useState(null);
    const [day, setDay] = useState(null);
    const [week, setWeek] = useState(null);

    useEffect(() => {
        if (!i) {
            setI(setInterval(() => {
                setNowTime(moment().format("HH:mm:ss"));
                setWeek(moment().format("d"));
                setDay(moment().format("YYYY-MM-DD"));
            }, 1000));
        }

        return () => {
            clearInterval(i);
        }
    }, []);

    return (<div className={style.time}>
        <div>{day}</div>
        <div>星期{weeks[week - 1]}</div>
        <div>{nowTime}</div>
    </div>);
}

export default Time;