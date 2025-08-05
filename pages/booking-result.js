import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import { routes } from "@/src/utils/routes";
import Head from "next/head";

import buttons from '@/styles/buttons.module.css';
import typo from '@/styles/typography.module.css';

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";


export default function BookingResult () {
    const router = useRouter();
    const [status, setStatus] = useState('loading'); // loading | success | error
    const [message, setMessage] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const alreadySent = sessionStorage.getItem("prenotazione_inviata");
        if (!router.isReady || hasSubmitted || alreadySent) return;
        const { date, time, court, notes } = router.query;
        if (!date || !time || !court) {
            setStatus('error');
            setMessage("Mancano i dati per effettuare la prenotazione");
            return;
        }

        const sendBooking = async () => {
            setHasSubmitted(true);
            sessionStorage.setItem("prenotazione_inviata", "true");
            try {
                const res = await fetch(routes.prenotaAPI, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        data: {
                            data: date,
                            oraInizio: time,
                            campo: court,
                            note: notes,
                        }
                    })
                });

                console.log("Status:", res.status);
                console.log("res.ok:", res.ok);
                const text = await res.text();
                console.log("Raw body:", text);

                let result = {};
                try {
                    result = JSON.parse(text);
                } catch (err) {
                    console.warn("Errore nel parsing JSON:", err);
                }

    
                if (!res.ok || result?.error) {
                    setStatus('error');
                    setMessage(`Impossibile effettuare la prenotazione: ${result?.error || "Errore durante la registrazione della prenotazione"}`);
                } else {
                    setStatus('success');
                    setMessage('La prenotazione è stata registrata correttamente');
                    setTimeout(() => {
                        sessionStorage.removeItem("prenotazione_inviata");
                        router.push(routes.account);
                    }, 5000);
                }
    
            } catch (err) {
                console.error("Impossibile effettuare la prenotazione:", err);
                setErr('Impossibile effettuare la prenotazione: Errore imprevisto durante la registrazione della prenotazione');
            }

        };

        sendBooking();
    }, [router.isReady, hasSubmitted]);


    const divResponseStyle = {
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "40px 1fr",
        gap: "12px",
        textAlign: "start",
    };

    return (
        <>
            <Head>
                <title>CourtHub | prenotazione in corso...</title>
                <meta name="description" content="Piattaforma per la gestione di prenotazioni online, orari e utenti. Organizza la tua partita di tennis!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main 
                style={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '100%',
                    height: '100%',
                    gap: '12px',
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        width: '100%',
                    }}
                    className={`${typo.pageTitle3}`}
                >
                    {status === 'loading' &&
                        <div style={divResponseStyle}>
                            <AiOutlineLoading
                                size={32}
                            />
                            <p>
                                Stiamo registrando la prenotazione...
                            </p>
                        </div>
                        
                    }
                    {status === 'success' &&
                        <div style={divResponseStyle}>
                            <IoMdCheckmarkCircleOutline
                                size={40}
                                color="green"
                            />
                            <p>
                                {message} Verrai reindirizzato in pochi istanti...
                            </p>
                        </div>
                        
                    }
                    {status === 'error' &&
                        <div style={divResponseStyle}>
                            <IoMdCloseCircle
                                size={40}
                                color="red"
                            />
                            <p>
                                {message}
                            </p>
                        </div>
                        
                    }
                </div>
                {status !== 'loading' &&
                    <button 
                        style={{marginTop: "20px"}}
                        className={`${buttons.btn} ${buttons.primary}`}
                        onClick={status === 'success' ? () => {
                            sessionStorage.removeItem("prenotazione_inviata");
                            router.push(routes.account);
                        } : () => {
                            sessionStorage.removeItem("prenotazione_inviata");
                            router.push(routes.prenota);
                        }}
                    >
                        {status === 'success' ? "Torna a account" : "Riprova"}
                    </button>
                }
            </main>
        </>
    );
}