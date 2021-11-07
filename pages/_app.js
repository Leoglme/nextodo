import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "../components/Common/Loading";
import store from "../store";
import {Provider} from "react-redux";
import Wait from "../Wait";
import Head from "next/head";
import Layout from "../layout/Layout";


function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        await Wait(800)
        setLoading(false);

        const handleStart = async (url) => {
            if (url !== router.pathname)
                setLoading(true)
            await Wait(500)
            setLoading(false);
        };
        const handleComplete = async (url) => {
            await Wait(500)
            setLoading(false)
        };
        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);


    }, [router]);

    return (
        <>
            <Head>
                <title>Nextodo | Ma TodoList</title>
                <meta charSet="UTF-8"/>
                <link rel="shortcut icon" href="/images/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon.ico"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.ico"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.ico"/>
                <link rel="stylesheet" href="/styles/style.css"/>
            </Head>

            <LoadingScreen loading={loading} />
            {!loading && <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>}

        </>
    );
}

export default MyApp;
