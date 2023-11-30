import './global.css';
import { MenuComponent } from '../components/MenuComponent/MenuComponent';

export default function App({ Component, pageProps }) {
    return (
        <>
            <MenuComponent></MenuComponent>
            <div className='wrapper'>
                <Component {...pageProps} />
            </div>
        </>
    );
}