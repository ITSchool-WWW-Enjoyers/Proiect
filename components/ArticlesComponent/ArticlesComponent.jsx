import React, { useEffect, useState } from 'react'
import styles from "./index.module.css";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs' // https://supabase.com/docs/reference/javascript/select
//api docs https://supabase.com/dashboard/project/tyqomfobwuaqgatuaigz/editor/28560

export const ArticlesComponent = () => {
    const [posts, setPosts] = useState([]);
    const supabaseClient = createClientComponentClient(); // https://supabase.com/docs/reference/javascript/select

    useEffect(() => {
        getArticles();
    }, [])
    // https://supabase.com/docs/guides/api/creating-routes
    const getArticles = async () => {
        let articles = await supabaseClient.from('Posts').select('*');
        setPosts(articles.data);
    }

    return (
        posts != null &&
        <div className={styles.postsContainer}>
            {
                posts.map((post) =>
                    <div key={post.id} className={styles.post}>
                        <p className={styles.postTitle}>{post.title}</p>
                        <p className={styles.postBody}>{post.body}</p>
                    </div>)
            }
        </div >
    )
}
