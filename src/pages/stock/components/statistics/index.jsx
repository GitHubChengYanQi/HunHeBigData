// @flow
import * as React from 'react';
import ShadowBox from "../shadowBox";
import style from "./index.less";
import circle from '../../../../assets/Vector.png'
import Count from "../count";

 const Statistics = (props) => {
    return (
        <div>
            <div style={{display:"flex"}}>
                <div id="left" className={style.left} style={{flex:1}}>
                    <div className={style.long}><ShadowBox></ShadowBox></div>
                    <div style={{display:"flex"}}>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                    </div>
                </div>
                <div id="center" className={style.center} style={{flex:1}}>
                    <div className={style.total}>
                        <div className={style.shu}>159485</div>
                        <div className={style.text}>库存总数</div>
                    </div>

                </div>
                <div id="right" className={style.right} style={{flex:1}}>
                    <div className={style.long}><ShadowBox></ShadowBox></div>
                    <div style={{display:"flex"}}>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                        <div className={style.short}><ShadowBox></ShadowBox></div>
                    </div>
                </div>
            </div>
            <div　style={{display:"flex"}}>
                <div style={{flex:1}}>
                    <Count number={14987} len={6}></Count>
                </div>
                <div style={{flex:1}}>
                    <Count number={14987} len={6}></Count>
                </div>
            </div>

        </div>
    );
};
 export default Statistics;