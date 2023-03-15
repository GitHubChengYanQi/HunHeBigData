// @flow
import * as React from 'react';
import style from "./index.less";


const Button = (props) => {
    const {children, type} = props;
    let renderType;
    switch (type) {
        case "blue":
            renderType = style.blue
            break;
        case "red":
            renderType = style.red
            break;
        case "orange":
            renderType = style.orange
            break;
        case "green":
            renderType = style.green
            break;
        default:
            renderType = style.blue;
    }
    return (
        <div className={style.button + " " + renderType}>
            {children}
        </div>
    );
};
export default Button;
