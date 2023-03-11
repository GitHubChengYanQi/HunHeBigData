// @flow
import * as React from 'react';

 const Text = (props) => {
    const {children,color}= props;
    const renderColor = color||"#fff";
    return (
        <div style={{color:renderColor}}>{
            children
        }
        </div>
    );
};
 export default Text;