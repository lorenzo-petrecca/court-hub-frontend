import { useEffect, useState} from "react";
import { requireAuthentication } from "./utils/auth";
import { format, parse, addMinutes, set } from "date-fns";
import Head from "next/head";
import ConfirmDialog from "./components/confirmDialog";
import typo from '@/styles/typography.module.css';
import buttons from '@/styles/buttons.module.css';
import styles from '@/styles/prenotazioni.module.css';

import { IoIosArrowDown } from "react-icons/io";
import { routes } from "./utils/routes";

import { FaTrashCan } from "react-icons/fa6";
import { useRouter } from "next/router";


export default function Prenotazioni () {
    const router = useRouter()
    const [pastIsOpen, setPastIsOpen] = useState(false);
    const [futureIsOpen, setFutureIsOpen] = useState(false);
    const [mybookings, setMybookings] = useState([]);
    const [oldBookings, setOldBookings] = useState([]);
    const [newBookings, setnewBookings] = useState([]);
    const [showDeleteBooking, setShowDeleteBooking] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState('');

    const handlePastTab = (e, open) => {
        e.preventDefault();
        setPastIsOpen(open);
        if (open) setFutureIsOpen(false);
    };

    const handleFutureTab = (e, open) => {
        e.preventDefault();
        setFutureIsOpen(open);
        if (open) setPastIsOpen(false);
    }

    const fetchBookings = async () => {
        const res = await fetch(routes.prenotazioniAPI, {
            method: 'GET',
            cache: 'no-store',
        });
        const json = await res.json();
        setMybookings(json.data);
    }

    useEffect (() => {
        fetchBookings();
    }, []);

    useEffect (() => {
        const today = new Date();

        const toDateTime = (booking) => new Date (`${booking.data}T${booking.oraFine}`);

        const oldb = mybookings
            ?.filter(b => toDateTime(b) < today)
            .sort((a, b) => toDateTime(a) - toDateTime(b));

        const newb = mybookings
            ?.filter(b => toDateTime(b) >= today)
            .sort((a, b) => toDateTime(a) - toDateTime(b));

        setOldBookings(oldb);
        setnewBookings(newb);

    }, [mybookings]);


    const handleDeleteBooking = async () => {
        try {
            const res = await fetch(routes.deleteBookingAPI, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    booking: selectedBooking,
                }),
            })
            if (!res.ok) {
                const error = await res.json();
                alert(error.message || 'Errore durante l\'eliminazione');
            }
            
            // 🔄 Ricarica prenotazioni
             await fetchBookings();
        } catch {
            alert("Errore di rete");
        }
    };

    return (
        <>
            <Head>
                <title>CourtHub | Le tue prenotazioni</title>
                <meta name="description" content="Piattaforma per la gestione di prenotazioni online, orari e utenti. Organizza la tua partita di tennis!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={typo.pageTitle}>Le tue prenotazioni</h1>
                <div className={styles.mainContent}>

                    <div className={`${styles.tabContainer} ${pastIsOpen ? styles.isopen : ''}`}>
                        <button 
                            className={`${buttons.btn} ${buttons.secondary} ${styles.tabEvent}`}
                            onClick={(e) => handlePastTab (e, !pastIsOpen)}
                        >
                            Partite giocate
                            <IoIosArrowDown
                                className={`${styles.downArrow} ${pastIsOpen ? styles.rotateArrow : ''}`}
                                size={18}
                                color="var(--foreground)"
                            />
                        </button>
                        <div className={styles.tabContent}>
                            <table>
                                <thead>
                                    <tr className={`${styles.tableHeader} ${styles.tableRow} ${typo.medium} ${typo.semibold}`}>
                                        <th className={styles.idCell}>ID</th>
                                        <th>Data</th>
                                        <th>Inizio</th>
                                        <th>Fine</th>
                                        <th>Campo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {oldBookings?.map((item, key) => (
                                        <tr 
                                            key={key}
                                            className={`${styles.bookingItem} ${styles.tableRow} ${typo.medium}`}
                                            style={key % 2 === 0 ? {backgroundColor: 'var(--table-row)'} : {}}
                                        >
                                            <td className={styles.idCell}>{item?.id}</td>
                                            <td>{item?.data}</td>
                                            <td>{item?.oraInizio.slice(0, 5)}</td>
                                            <td>{item?.oraFine.slice(0, 5)}</td>
                                            <td>{item?.campo?.nome}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={`${styles.tabContainer} ${styles.newBookingsContainer} ${futureIsOpen ? styles.isopen : ''}`}>
                        <button 
                            className={`${buttons.btn} ${buttons.secondary} ${styles.tabEvent}`}
                            onClick={(e) => handleFutureTab (e, !futureIsOpen)}
                        >
                            Partite in programma
                            <IoIosArrowDown
                                className={`${styles.downArrow} ${futureIsOpen ? styles.rotateArrow : ''}`}
                                size={18}
                                color="var(--foreground)"
                            />
                        </button>
                        <div className={styles.tabContent}>
                            <table>
                                <thead>
                                    <tr className={`${styles.tableHeader} ${styles.tableRow} ${typo.medium} ${typo.semibold}`}>
                                        <th className={styles.idCell}>ID</th>
                                        <th>Data</th>
                                        <th>Inizio</th>
                                        <th>Fine</th>
                                        <th>Campo</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newBookings?.map((item, key) => (
                                        <tr 
                                            key={key}
                                            className={`${styles.bookingItem} ${styles.tableRow} ${typo.medium}`}
                                            style={key % 2 === 0 ? {backgroundColor: 'var(--table-row)'} : {}}
                                        >
                                            <td className={styles.idCell}>{item?.id}</td>
                                            <td>{item?.data}</td>
                                            <td>{item?.oraInizio.slice(0, 5)}</td>
                                            <td>{item?.oraFine.slice(0, 5)}</td>
                                            <td>{item?.campo?.nome}</td>
                                            <td>
                                                <button 
                                                    className={`${buttons.lnk}`} 
                                                    title='Elimina prenotazione'
                                                    onClick={() => {
                                                        setSelectedBooking(item?.documentId);
                                                        setShowDeleteBooking(true);
                                                    }}
                                                >
                                                    <FaTrashCan
                                                        size={14}
                                                        color='var(--foreground)'
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            { showDeleteBooking && (
            <ConfirmDialog 
                title="Eliminare questa prenotazione?"
                message="Questa azione non è reversibile."
                onCancel={() => setShowDeleteBooking(false)}
                onConfirm={() => {
                    setShowDeleteBooking(false);
                    handleDeleteBooking();
                }}
            />
            )}
        </>
        
    );
}


// necessario essere autenticati
export async function getServerSideProps(context) {
  return await requireAuthentication(context);
}