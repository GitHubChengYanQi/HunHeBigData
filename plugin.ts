import type {IApi} from 'umi';

export default (api: IApi) => {
    api.addHTMLMetas(()=>{
        return {
            content: 'width=1920,user-scalable=no',
            name: 'viewport',
        }
    })
};
