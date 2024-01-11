import '@/styles/globals.css';
import Head from 'next/head';
import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import System from '@/contexts/System.js';

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(' dark text-foreground bg-background ');
  const [token, setToken] = useState(null);
  return (
    <>
      <Head>
      </Head>
      <NextUIProvider>
        <System value={{ theme, setTheme, token, setToken }}>
          <Component {...pageProps} />
        </System>
      </NextUIProvider>
    </>
  )
}