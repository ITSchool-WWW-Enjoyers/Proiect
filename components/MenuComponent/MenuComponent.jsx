import React from 'react'
import styles from "./index.module.css";
import Link from 'next/link';
import { useRouter } from "next/router";

export const MenuComponent = () => {
    const router = useRouter(); // https://nextjs.org/docs/pages/api-reference/functions/use-router

    return (
        <div className={styles.header}>
            <div className={styles.items}>
                {
                    router.asPath === '/' ?
                        (<>
                            <Link href="/articles">Articole</Link>
                            <Link href="/new-article">Articol nou</Link></>
                        ) :
                        <Link href="/">Inapoi la pagina de start</Link>
                }
            </div>
        </div>
    )
}
