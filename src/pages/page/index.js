import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';
import GetRichMenuList from './GetRichMenuList';


export default function PageIndex({ page, token }) {
    if (page == "GetRichMenuList") {
        return <GetRichMenuList token={token}></GetRichMenuList>
    }

}