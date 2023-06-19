import { Input, Button, useInput } from '@nextui-org/react';
import style from '../styles/index.module.css';
import { useRouter } from 'next/router';

export default function index() {
    const tokenControl = useInput("");

    const router = useRouter();

    function start() {
        router.push(`/dashboard?token=${tokenControl.value.replace(/\+/gi, '^add^').replace(/\//gi, '^slash^')}`);
    }

    return (
        <div className={style.panel}>
            <Input clearable size="xl" width="480px" labelPlaceholder="Channel access token" {...tokenControl.bindings} />
            <Button size="lg" className={style.btn} onClick={start}>Get Started</Button>
        </div>
    )
}