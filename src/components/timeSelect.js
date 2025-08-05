import { useEffect, useState } from "react";
import { parse, addMinutes, format, isEqual } from "date-fns";
import typo from '@/styles/typography.module.css';
import buttons from '@/styles/buttons.module.css';
import styles from '@/styles/prenota.module.css';

export default function TimeSelect ({ bookings, selected, setSelected }) {
    const [timeLine, setTimeLine] = useState([]);
    const minimumBookingMinutes = parseInt(process.env.NEXT_PUBLIC_BOOKING_DURATION);


    const generateSchedule = (start = "05:00", end = "22:00", interval = 15) => {
        const schedule = [];
        let [h, m] = start.split(":").map(Number);
        let [endH, endM] = end.split(":").map(Number);

        while (h < endH || (h === endH && m < endM)) {
            const hh = h.toString().padStart(2, '0');
            const mm = m.toString().padStart(2, '0');

            schedule.push(`${hh}:${mm}`);
            m += interval;
            if (m >= 60) {
                m -= 60;
                h += 1;
            }
        }
        return schedule;
    }

    // aggiorna timeline al cambiamento di bookings
    useEffect(() => {
        const createTimeLine = () => {
            const schedule = generateSchedule();
            let timeLineUpdate = [];
            schedule.map((item, i) => {
                const d = new Date();
                const timeItem = {
                    key: i,
                    value: item,
                    disabled: false,
                    selected: false,
                }

                const t = parse(item, "HH:mm", d);

                bookings.map((booking) => { 
                    const bookingStart = parse(booking.oraInizio, "HH:mm:ss.SSS", d);
                    const bookingEnd = parse(booking.oraFine, "HH:mm:ss.SSS", d);
                    if (t > bookingStart && t < bookingEnd) {
                        timeItem.disabled = true;
                    }
                });

                timeLineUpdate.push(timeItem);
            });
            setTimeLine(timeLineUpdate);
        };

        createTimeLine();
    }, [bookings]);


    // Al click di un orario della timeline
    const handleSelectTime = (value) => {
        const d = new Date();
        const start = parse(value, "HH:mm", d);
        const end = addMinutes(start, minimumBookingMinutes);

        const updated = timeLine.map((item) => {
            const time = parse(item.value, "HH:mm", d);
            const selected = time >= start && time <= end && !item.disabled;

            return { ...item, selected };
        });
        setTimeLine(updated);
    }


    // aggiorna lo stato selected
    useEffect(() => {
        const selectedItems = timeLine.filter(item => item.selected); // filtra solo gli elementi con selected: true
        
        if (selectedItems.length === 0) return;
        const d = new Date();
        const start = parse(selectedItems[0].value, "HH:mm", d);
        const end = parse(selectedItems[selectedItems.length - 1].value, "HH:mm", d);
        
        if (start > end || isEqual(start, end) || ((end - start) / 60000 ) !== minimumBookingMinutes) {
            const updated = timeLine.map(item => ({
                ...item,
                selected: false,
            }));

            setTimeLine(updated);
            setSelected(null);
            return;
        }

        const formattedStart = format(start, "HH:mm:ss.SSS");
        setSelected(formattedStart);
    }, [timeLine]);



    return (
        <div style={{
            width: '100%',
            overflowY: 'scroll',
            height: '100%',
        }}>
            <div className={styles.schedules} style={{
                display: 'grid',
                padding: '10px',
                flexWrap: 'wrap',
                gap: '10px',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                justifyContent: 'center'
            }}>
                {timeLine.map((item) => ( 
                        <button 
                        className={`${typo.big} ${buttons.btn} ${buttons.primaryOutline}`}
                        disabled={item.disabled}
                        type="button"
                        style={{
                            borderRadius: '8px',
                            backgroundColor: item.selected ? "var(--primary)" : "",
                            color: item.selected ? "var(--background)" : "",
                            borderColor: item.selected ? "var(--primary)" : "",
                        }}
                        onClick={() => handleSelectTime(item.value)}
                        >
                            {item.value}
                        </button>
                ))}
            </div>
        </div>

    );
}