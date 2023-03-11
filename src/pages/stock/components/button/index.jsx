// @flow
import * as React from 'react';
import style from "./index.less";


const Button = (props) => {
    const {children,type} = props;
    let renderType;
    switch (type){
        case "ching":
            renderType=style.ching
            break;
        case "deongaree":
            renderType=style.deongaree
            break;
        case "orange":
            renderType=style.orange
            break;
        default:
            renderType = style.deongaree;
    }
    return (
        <div className={style.button +" "+ renderType}>
            {children}
        </div>
    );
};
export default Button;