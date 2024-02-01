import { Input, Button } from '@nextui-org/react'
import { useSystem } from '@/contexts/System.js';
import { useRouter } from 'next/router';

export default function () {
  const router = useRouter();
  const { theme, setTheme, token, setToken } = useSystem();

  async function start() {
    localStorage.setItem('token', document.getElementById('token').value);
    await setToken(document.getElementById('token').value);
    router.push('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className='w-[500px]'>
          <Input type="text" variant="underline" label="token" id="token" defaultValue={token} />
          <Button color="primary" className="w-full mt-5" onClick={start}>開始</Button>
        </div>
      </div>
    </main>
  )
}
