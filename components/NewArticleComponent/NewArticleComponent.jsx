import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs' // https://supabase.com/docs/guides/auth/auth-helpers/nextjs
import Link from 'next/link';

export const NewArticleComponent = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const supabaseClient = createClientComponentClient(); // https://supabase.com/docs/reference/javascript/select

    const handleSubmit = async (e) => {
        e.preventDefault();
        await supabaseClient
            .from('Posts')
            .insert([
                { title: title, body: body },
            ])
            .select();
        setIsSubmitted(true);
    }

    return (
        isSubmitted ? (
            <div>
                <p>Multumim pentru articolul adaugat</p>
                <Link href="/">Inapoi la pagina de start</Link>
            </div>
        ) :
            (
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor='Title'>Titlu: </label>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='Article'>Articol: </label>
                        <textarea
                            type='text'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </div>
                    <button className='button' type='submit'>Creaza articol</button>
                </form>)
    );
}
