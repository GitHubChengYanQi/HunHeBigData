// @flow
import * as React from 'react';
import arrow from '../../../../assets/双箭头.png'
import style from './index.less'

 const First = (props) => {
     const {children}= props;
     return (
        <div className={style.title}>
            <img src={arrow} alt=""/>
            <div className={style.text}>{children}</div>
        </div>
    );
};
 export default First;