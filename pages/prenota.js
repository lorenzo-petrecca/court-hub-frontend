import { use, useState, useEffect } from 'react';
import { requireAuthentication } from '@/src/utils/auth';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import CourtSelect from '@/src/components/courtSelect';
import TimeSelect from '@/src/components/timeSelect';
import Review from '@/src/components/review';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { routes, api } from '@/src/utils/routes';
import Head from "next/head";
import { it } from 'date-fns/locale/it';
registerLocale ( 'it' ,  it ) 

import styles from "@/styles/prenota.module.css";
import buttons from '@/styles/buttons.module.css';
import typo from '@/styles/typography.module.css';

export default function Prenota () {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [court, setCourt] = useState(null);
    const [notes, setNotes] = useState('');
    const [err, setErr] = useState('');
    const [step, setStep] = useState(0);
    const [busy, setBusy] = useState([]);

    const steps = [
        {
            key: "date",
            title: "Seleziona la data",
            prev: null,
            next: "Avanti",
            value: selectedDate,
        },
        {
            key: "court",
            title: "Seleziona il campo",
            prev: "Indietro",
            next: "Avanti",
            value: court,
        },
        {
            key: "time",
            title: "Seleziona l'orario",
            prev: "Indietro",
            next: "Avanti",
            value: selectedTime,
        },
        {
            key: "review",
            title: "Riepilogo prenotazione",
            prev: "Indietro",
            next: "Prenota",
            value: true,
        },
    ];

    const handleSteps = ({next}) => {
        if (next) {
            if (step < steps.length - 1) {
                const currentStep = steps[step];
        
                // Se serve un valore per procedere, controlla che sia presente
                if (currentStep.value !== undefined && currentStep.value !== null) {
                    setStep(step + 1);
                } else {
                    console.warn(`Step "${currentStep.key}" non completato`);
                }
            } else {
                console.log("Ultimo step raggiunto – trigger invio prenotazione");
                handleSubmit(new Event("submit"));
            }
        } else {
            if (step > 0) setStep(step - 1);
        }
    }
    
    // aggiorna il campo (state)
    const handleCourts = (courtOption) => {
        setCourt(courtOption);
    };

    // aggiorna le note (state)
    const handleNotes = (note) => {
        setNotes(note);
    }

    // Rimanda all api per effettuare la prenotazione
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');

        if (!selectedDate || !selectedTime) {
            setErr('Selezionare la data e l\'orario');
            return;
        }

        const date = format(selectedDate, 'yyyy-MM-dd');

        router.push({
            pathname: routes.bookingResult,
            query: {
                date: date,
                time: selectedTime,
                court: court.value,
                notes: notes,
            },
        });
    }

    // aggiorna lo stato "busy" degli orari occupati al cambiamento della data e/o del campo
    useEffect (() => {
        if (!selectedDate || !court?.value) return;

        const fetchBookings = async () => {
            const res = await fetch (api.getPrenotazioni({
                data: selectedDate,
                court: court.value
            }));

            const data = await res.json();
            setBusy(data.data);
        };
        
        fetchBookings();
    }, [selectedDate, court]);



    // style unico per step
    const stepStyle = {
        width: `calc(100% / ${steps.length})`,
        minWidth: `calc(100% / ${steps.length})`,
    };
    // style per step
    const wizardContentStyle = {
        width: `calc(100% * ${steps.length})`, 
        minWidth: `calc(100% * ${steps.length})`, 
        transform: `translateX(calc((-100% / ${steps.length}) * ${step}))`
    };

    return (
        <>
            <Head>
                <title>CourtHub | Prenota</title>
                <meta name="description" content="Piattaforma per la gestione di prenotazioni online, orari e utenti. Organizza la tua partita di tennis!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <form onSubmit={handleSubmit}>
                    <h1>Prenota la tua partita</h1>
                    <div className={styles.wizardContainer}>  
                        <div 
                            className={styles.wizardContent} 
                            style={wizardContentStyle}
                        >
                            <div style={stepStyle} className={`${styles.step} ${styles.datePickerContainer}`}>
                                <h2>{steps[0]?.title}</h2>
                                <DatePicker
                                    className={styles.calendar}
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}
                                    placeholderText="Seleziona una data"
                                    locale="it"
                                />
                            </div>
                            <div style={stepStyle} className={`${styles.step} ${styles.courtContainer}`}>
                                <h2>{steps[1]?.title}</h2>
                                <CourtSelect
                                    selectedCourt={court}
                                    onChange={handleCourts}
                                />
                            </div>
                            <div style={stepStyle} className={`${styles.step} ${styles.hourContainer}`}>
                                <div
                                    style={{width: "100%"}}
                                >
                                    <h2>{steps[2]?.title}</h2>
                                </div>
                                
                                <TimeSelect
                                    bookings={busy}
                                    selected={selectedTime}
                                    setSelected={setSelectedTime}
                                />
                            </div>
                            <div style={stepStyle} className={`${styles.step} ${styles.reviewContainer}`}>
                                <h2>{steps[3]?.title}</h2>
                                <Review
                                    court={court}
                                    date={selectedDate}
                                    time={selectedTime}
                                    notes={notes}
                                    setNotes={handleNotes}
                                />
                            </div>
                        </div>
                        <div className={styles.navbar}>
                            {steps[step]?.prev && 
                                <button
                                    type='button'
                                    style={{gridColumnStart: "1"}} 
                                    className={`${buttons.btn} ${buttons.secondary} ${styles.navBtn}`}
                                    onClick={() => handleSteps({next: false})}
                                >
                                    {steps[step]?.prev}
                                </button>
                            }
                            <button 
                                type="button"
                                style={{gridColumnStart: "3"}} 
                                className={`${buttons.btn} ${buttons.primaryColor} ${styles.navBtn}`}
                                onClick={() => handleSteps({next: true})}
                                disabled={!steps[step]?.value}
                            >
                                {steps[step]?.next}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </>

    );
}

// necessario essere autenticati
export async function getServerSideProps(context) {
  return await requireAuthentication(context);
}