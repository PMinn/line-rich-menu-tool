import { Button } from '@nextui-org/react';
import style from '../styles/dashboard.module.css';
import PageIndex from './page/index';
import { useState } from 'react';


export default function dashboard() {
    
    const [page, setPage] = useState("");


    return (
        <div className={style.panel}>
            <div className={style.menu}>
                <Button auto color="gradient" rounded bordered shadow onPress={() => setPage("GetRichMenuList")}>Get rich menu list</Button>
                <Button auto color="gradient" rounded bordered shadow>Create a rich menu</Button>
                <Button auto color="gradient" rounded bordered shadow>Upload image to the rich menu</Button>
                <Button auto color="gradient" rounded bordered shadow>Set the default rich menu</Button>
            </div>
            <div className={style.page}>
                <PageIndex page={page}></PageIndex>
            </div>
        </div>
    )
}
// https://developers.line.biz/en/docs/messaging-api/using-rich-menus/#other-rich-menu-features