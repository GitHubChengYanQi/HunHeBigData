// @flow
import * as React from 'react';
import style from './index.less'

const ShadowBox = (props) => {
    const {number,title} = props;
    return (
        <div className={style.shadow}>
            <div className={style.number}>{number||0}</div>
            <div className={style.text}>{title||'标题'}</div>
        </div>
    );
};
 export default ShadowBox;