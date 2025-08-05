import Head from "next/head";
import styles from '@/styles/regolamento.module.css';
import typo from '@/styles/typography.module.css';
import buttons from '@/styles/buttons.module.css';
import { CookieColored } from "@/src/icons";
import { routes } from "@/src/utils/routes";
import Contatti from "@/src/components/contatti";

export default function CookiePolicy () {
    return (
        <>
            <Head>
                <title>CourtHub | Cookie policy</title>
                <meta name="description" content="Piattaforma per la gestione di prenotazioni online, orari e utenti. Organizza la tua partita di tennis!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px'
            }}
                className={styles.title}
            >
                <CookieColored size={60}/>
                <h1 
                    className={`${typo.pageTitle}`}
                    style={{textAlign: 'start'}}
                >
                    Cookie policy
                </h1>                
            </div>
            <main className={styles.main}>
                <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                    Questa Cookie Policy descrive l’utilizzo dei cookie sul sito <b className={typo.semibold}>CourtHub</b>.
                </p>
                <div style={{marginTop: '38px'}}>
                    <h3 className={typo.pageTitle2}>Cosa sono i cookie</h3>
                    <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                        I cookie sono piccoli file di testo che i siti web inviano al dispositivo dell’utente (computer, smartphone, ecc.), 
                        dove vengono memorizzati per essere poi ritrasmessi agli stessi siti in occasione di visite successive.
                    </p>
                </div>

                <div style={{marginTop: '38px'}}>
                    <h3 className={typo.pageTitle2}>Tipologie di cookie utilizzati</h3>
                    <ul type="disc" className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                        Il presente sito utilizza esclusivamente cookie tecnici necessari al suo corretto funzionamento. In particolare:
                        <li><b className={typo.bold}>Cookie di autenticazione</b>: servono per mantenere attiva la sessione dell’utente dopo il login e per permettere l’accesso alle aree riservate.</li>
                        <li><b className={typo.bold}>Cookie di preferenze</b>(eventuali): memorizzano alcune scelte dell’utente (es. lingua, tema, impostazioni).</li>
                        Il sito <b className={typo.semibold}>non utilizza</b> cookie di profilazione, cookie di terze parti, né sistemi di tracciamento o pubblicità.
                    </ul>
                </div>

                <div style={{marginTop: '38px'}}>
                    <h3 className={typo.pageTitle2}>Base giuridica per l’uso dei cookie</h3>
                    <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                        I cookie tecnici vengono utilizzati in base al legittimo interesse del titolare a garantire la funzionalità del sito. 
                        Non è necessario il consenso dell’utente per questi cookie.
                    </p>
                </div>

                <div style={{marginTop: '38px'}}>
                    <h3 className={typo.pageTitle2}>Gestione dei cookie</h3>
                    <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                        Poiché il sito utilizza solo cookie tecnici, <b className={typo.semibold}>non è richiesto un banner per il consenso</b>. 
                        Tuttavia, l’utente può comunque gestire i cookie attraverso le impostazioni del proprio browser, scegliendo di disabilitarli o cancellarli.
                    </p>
                </div>

                <div style={{marginTop: '38px'}}>
                    <h3 className={typo.pageTitle2}>Contatti</h3>
                    <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                        Per ulteriori informazioni sul trattamento dei dati personali e sull’uso dei cookie, è possibile consultare la <a className={buttons.lnk} href={routes.privacyPolicy}>Privacy Policy</a> oppure contattare il titolare via email all’indirizzo: <Contatti/>
                    </p>
                </div>
            </main>
        </>
    );
}