import Head from "next/head";
import NoteTab from "@/src/components/note-tab";
import styles from '@/styles/regolamento.module.css';
import typo from '@/styles/typography.module.css';

export default function Regolamento () {
    return (
        <>
            <Head>
                <title>CourtHub | Regolamento</title>
                <meta name="description" content="Piattaforma per la gestione di prenotazioni online, orari e utenti. Organizza la tua partita di tennis!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className={`${typo.pageTitle} ${styles.title}`}>Regolamento</h1>
            <main className={styles.main}>
                <ol type="1">
                    <div>
                        <li className={typo.pageTitle2}>Scopo del sito</li>
                        <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            Questo sito è un'iniziativa indipendente, non ufficiale e non collegata al Comune di Isernia.
                            Ha lo scopo di facilitare l’organizzazione tra cittadini per l’utilizzo del campo da tennis situato presso il parco della stazione, al fine di evitare sovrapposizioni e conflitti.
                        </p>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Natura del servizio</li>
                        <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            Le prenotazioni effettuate tramite questo sito non garantiscono in alcun modo l'esclusiva sull'utilizzo del campo.
                            Il campo è pubblico e a libero accesso. Le prenotazioni sono intese come accordi informali tra cittadini.
                        </p>
                        <NoteTab
                            className={styles.tab}
                            title="⚠️ Importante: il campo NON è riservato"
                            content={
                                <span>
                                    Il presente sito non garantisce l'esclusività di utilizzo del campo da tennis.
                                    Il campo si trova in un'area pubblica e <b className={typo.semibold}>l’accesso non è controllato né regolamentato da questo sito</b>.
                                    Le prenotazioni hanno lo scopo puramente organizzativo tra i cittadini per evitare sovrapposizioni, ma <b className={typo.semibold}>non danno diritto legale di riservare l’uso del campo o escludere altri</b>.
                                </span>
                            }
                            styles={styles}
                        />
                    </div>
                    
                    <div>
                        <li className={typo.pageTitle2}>Responsabilità</li>
                        <ul className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            L’amministratore del sito non è responsabile per:
                            <li>conflitti sull’uso del campo</li>    
                            <li>disservizi</li>    
                            <li>accessi non autorizzati</li>    
                            <li>uso scorretto delle prenotazioni</li> 
                            L'utilizzo del sito è gratuito e volontario.    
                        </ul>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Regolamento</li>
                        <ul className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            <li>È consentita una sola prenotazione per fascia oraria.</li>
                            <li>Ogni prenotazione ha durata fissa di un'ora.</li>
                            <li>Ogni utente può registrare un massimo di due prenotazioni al giorno.</li>
                            <li>Si raccomanda di rispettare l’orario indicato.</li>
                            <li>La prenotazione, in ogni caso, non garantisce l'esclusività di utilizzo del campo.</li>
                            <li>In caso di impossibilità ad usufruire della prenotazione, si invita a cancellarla per liberare lo slot.</li>
                        </ul>
                    </div>
                    <div>
                        <li className={typo.pageTitle2}>Comportamento corretto e uso responsabile</li>
                        <ul className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            L’uso del campo dovrebbe sempre rispettare le regole del buon senso e della convivenza civile.
                            Si prega gli utilizzatori del campo di:
                            <li>rispettare l’ordine di prenotazione se presente</li>
                            <li>lasciare il campo pulito</li>
                            <li>evitare comportamenti molesti</li>
                        </ul>

                        <NoteTab
                            className={styles.tab}
                            title="⚠️ Nota bene"
                            content={
                                <>
                                <p> 
                                Sebbene ogni utente possa effettuare al massimo due prenotazioni nello stesso giorno, si invita a un uso responsabile del campo da tennis. 
                                <br /> È fortemente sconsigliato: 
                                </p> 
                                <ul type="disc"> 
                                    <li>Occupare il campo per un tempo prolungato prenotando slot consecutivi con account diversi appartenenti allo stesso gruppo di persone;</li> 
                                    <li>Aggirare il limite massimo giornaliero mediante prenotazioni coordinate tra giocatori dello stesso match;</li> 
                                    <li>Prenotare slot che poi non verranno effettivamente utilizzati, impedendo ad altri cittadini di accedere al campo.</li> 
                                </ul> 
                                <p> 
                                    Questo sito si basa sul principio della collaborazione tra cittadini. Un uso scorretto del sistema può portare alla <i className={typo.semibold}>sospensione dell’accesso</i> per gli utenti coinvolti. 
                                </p>
                                </>

                            }
                            styles={styles}
                        />
                    </div>
                </ol>
            </main>
        </>
    );
}