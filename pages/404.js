import typo from '@/styles/typography.module.css';
import buttons from '@/styles/buttons.module.css';
import { routes } from './utils/routes';

export default function Custom404 () {
    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            color: 'var(--foreground)', 
            flexDirection: 'column',
            gap: '12px',
            gridRowStart: '2',
            textAlign: 'center',
        }}>
            <h1 style={{marginBottom: '0', fontSize: '52px'}} className={`${typo.pageTitle}`}>404</h1>
            <p className={`${typo.big}`}><span style={{display: 'block'}} className={`${typo.pageTitle3} ${typo.semibold}`}>Oops!</span>La pagina non è stata trovata</p>
            <a href={routes.home} className={`${typo.big} ${buttons.btn} ${buttons.primary}`}>Torna alla home</a>
        </div>
    );
}