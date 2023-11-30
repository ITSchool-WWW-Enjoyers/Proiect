import React, { useEffect, useState } from 'react'
import styles from "./index.module.css";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs' // https://supabase.com/docs/reference/javascript/select

export const ArticlesComponent = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClientComponentClient(); // https://supabase.com/docs/reference/javascript/select

    useEffect(() => {
        getArticles();
    }, [])

    // https://supabase.com/docs/guides/api/creating-routes

    const getArticles = () => {
        setIsLoading(true);
        setTimeout(() => {
            supabase.from('Posts').select('*').then((response) => {
                setPosts(response.data);
                setIsLoading(false);
            })
        }, 1000);

    }

    const createArticle = () => {
        supabase
            .from('Posts')
            .insert([
                { title: 'test', body: 'Teestsfdsafasdfsa' },
            ])
            .select().then((data) => {
                getArticles();
            })
    }

    const removeArticle = async (id) => {
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id);
        getArticles();
    }

    return (
        <div>
            {isLoading && <p className={styles.loading}>Loading...</p>}
            {!isLoading && (
                <>
                    {
                        posts != null &&
                        <div className={styles.postsContainer}>
                            {
                                posts.map((post) =>
                                    <div key={post.id} className={styles.post}>
                                        <button onClick={() => removeArticle(post.id)} className={styles.remove}>X</button>
                                        <p className={styles.postTitle}>{post.title}</p>
                                        <p className={styles.postBody}>{post.body}</p>
                                    </div>)
                            }
                        </div>}
                </>
            )}
        </div>
    )
}
