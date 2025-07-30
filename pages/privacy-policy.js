import Head from "next/head";
import styles from '@/styles/regolamento.module.css';
import typo from '@/styles/typography.module.css';

export default function PrivacyPolicy () {
    return (
        <>
            <Head>
                <title>CourtHub | Privacy policy</title>
                <meta name="description" content="Piattaforma per la gestione di prenotazioni online, orari e utenti. Organizza la tua partita di tennis!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className={`${typo.pageTitle} ${styles.title}`}>Privacy policy</h1>
            <main className={styles.main}>
                <ol type="1">
                    <div>
                        <li className={typo.pageTitle2}>Titolare del trattamento</li>
                        <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            Il titolare del trattamento dei dati personali raccolti tramite questo sito è il gestore del sito stesso, che lo amministra a titolo volontario e gratuito.
                        </p>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Finalità del trattamento</li>
                        <ul type="disc" className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            I dati personali raccolti (nome utente, email, password) sono trattati per le seguenti finalità:
                            <li>Permettere la registrazione e l’accesso all’area riservata del sito.</li>
                            <li>Consentire la prenotazione dei campi sportivi.</li>
                            <li>Gestire e consultare lo storico delle prenotazioni effettuate.</li>
                        </ul>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Tipologie di dati raccolti</li>
                        <ul type="disc" className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            I dati trattati includono:
                            <li>Nome utente</li>
                            <li>Indirizzo email</li>
                            <li>Password (salvata in modo criptato)</li>
                            <li>Prenotazioni effettuate (data, orario, campo, eventuali note)</li>
                        </ul>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Base giuridica del trattamento</li>
                        <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            Il trattamento si basa sul consenso esplicito dell’utente, espresso al momento della registrazione, 
                            e sulla <b className={typo.semibold}>necessità contrattuale</b> di fornire i servizi di prenotazione richiesti.
                        </p>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Modalità del trattamento</li>
                        <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            I dati sono raccolti e gestiti in forma digitale, tramite una piattaforma web realizzata con strumenti open-source. 
                            Sono adottate misure tecniche di base per proteggerli da accessi non autorizzati, modifiche o perdite accidentali. 
                            Non sono utilizzati sistemi di tracciamento, profilazione o decisioni automatizzate.
                        </p>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Conservazione dei dati</li>
                        <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            I dati personali sono conservati fino a quando l’utente mantiene il proprio account. L’utente può in qualsiasi momento richiederne la cancellazione. 
                            Le prenotazioni passate, una volta cancellato l’account, vengono mantenute ed <b className={typo.semibold}>anonimizzate</b> per fini statistici: 
                            nome utente, email e note vengono rimossi.
                        </p>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Diritti dell'utente</li>
                        <ul type="disc" className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            L’utente ha diritto, in qualsiasi momento, di:
                            <li>Ottenere conferma dell’esistenza o meno dei propri dati personali.</li>
                            <li>Conoscerne il contenuto e l’origine.</li>
                            <li>Chiederne la rettifica, l’integrazione o la cancellazione.</li>
                            <li>Opporsi al trattamento per motivi legittimi.</li>
                            <li>Proporre reclamo a un’autorità di controllo (es. Garante per la protezione dei dati personali).</li>
                            Per esercitare tali diritti, è possibile contattare il gestore del sito all’indirizzo email indicato nella sezione “Contatti”.
                        </ul>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Responsabilità</li>
                        <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            Il sito è gestito a titolo personale, volontario e gratuito. Il gestore si impegna a tutelare i dati con misure adeguate, 
                            ma non può garantire l’assoluta sicurezza delle informazioni online. <b className={typo.semibold}>Il titolare non è responsabile per eventuali 
                            accessi non autorizzati o incidenti causati da fattori esterni o da soggetti terzi non collegati al progetto</b>.
                        </p>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Dove vengono salvati i dati</li>
                        <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            I dati sono archiviati su un server backend gestito tramite il CMS Strapi, ospitato su un servizio cloud, 
                            in combinazione con un database per la conservazione delle prenotazioni e degli account utente.
                        </p>
                    </div>

                    <div>
                        <li className={typo.pageTitle2}>Contatti</li>
                        <p className={`${typo.big} ${typo.regular} ${styles.paragraph}`}>
                            Per qualsiasi richiesta o informazione relativa al trattamento dei dati personali, è possibile contattare il titolare via email all’indirizzo:
                            [Indirizzo email]
                        </p>
                    </div>
                </ol>
            </main>
        </>
    );
}