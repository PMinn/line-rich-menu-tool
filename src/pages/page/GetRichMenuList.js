import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function GetRichMenuList() {
    const router = useRouter();
    const token = router.query.token?.replace(/\^add\^/gi, '+').replace(/\^slash\^/gi, '/');
    return (
        <div >
            list:
            {token}
        </div>
    )
}