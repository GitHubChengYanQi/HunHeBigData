// @flow
import * as React from 'react';

const Text = (props) => {
    const {children, color, width} = props;
    const renderColor = color || "#fff";
    return (
        <div style={{color: renderColor, fontSize: 24, width}}>{
            children
        }
        </div>
    );
};
export default Text;
