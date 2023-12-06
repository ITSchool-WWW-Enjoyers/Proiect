import './global.css';
import { MenuComponent } from '../components/MenuComponent/MenuComponent';

export default function App({ Component }) { // https://nextjs.org/docs/pages/building-your-application/routing/custom-app
    return (
        <>
            <MenuComponent></MenuComponent>
            <div className='wrapper'>
                <Component />
            </div>
        </>
    );
}