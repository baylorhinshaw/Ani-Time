import { Pagination } from 'antd';
import axios from 'axios';

function PageChange() {

    function onChange(page, pageSize) {
    
        let res = axios.get(`https://api.jikan.moe/v4/seasons/2021/winter?page=${page}`)
    }

    return (
    <Pagination onChange={onChange} defaultCurrent={1} total={25} />
    )
};

export default PageChange;