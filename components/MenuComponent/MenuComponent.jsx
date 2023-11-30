import React from 'react'
import styles from "./index.module.css";
import Link from 'next/link';
import { useRouter } from "next/router";

export const MenuComponent = () => {
    const router = useRouter();
    let isHomepage = false;
    let isAddArticle = false;

    if (router.asPath === '/') {
        isHomepage = true;
    } else {
        isHomepage = false;
    }

    if (router.asPath === '/new-article') {
        isAddArticle = true;
    } else {
        isAddArticle = false;
    }

    return (
        !isAddArticle && (
            <div className={styles.header}>
                <div className={styles.items}>
                    {
                        isHomepage ?
                            (<>
                                <Link href="/articles">Articles</Link>
                                <Link href="/new-article">New article</Link></>
                            ) :
                            <Link href="/">Back to homepage</Link>
                    }

                </div>
            </div>
        )
    )
}
