import type {IApi} from 'umi';

export default (api: IApi) => {
    api.addHTMLMetas(()=>{
        return {
            content: 'user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
            name: 'viewport',
        }
    })
};
