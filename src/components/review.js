import { useEffect, useState } from "react";
import { format, parse, addMinutes, set } from "date-fns";
import typo from '@/styles/typography.module.css';
import responsible from '@/styles/prenota.module.css';

export default function Review ({ court, date, time, notes, setNotes }) {
    const [reviewArr, setReviewArr] = useState([]);
    const minimumBookingMinutes = parseInt(process.env.NEXT_PUBLIC_BOOKING_DURATION);

    useEffect (() => {
        const start = parse(time || "00:00:00.000", "HH:mm:ss.SSS", new Date());
        const end = addMinutes(start, minimumBookingMinutes);
        const endString = format(end, "HH:mm");
        const updatedReviewArr = [
            {
                key: "Campo",
                value: court?.label,
                editable: false,
            },
            {
                key: "Giorno",
                value: format(date, "dd-MM-yyyy"),
                editable: false,
            },
            {
                key: "Orario",
                value: `${time?.substring(0, 5)} - ${endString}`,
                editable: false,
            },
            {
                key: "Nota",
                value: notes,
                editable: true,
            },
        ];
        setReviewArr(updatedReviewArr);
    }, [court, date, time, notes]);





    const divStyle = {
        with: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto auto auto 1fr",
        gap: "12px",
        padding: '16px 8px 8px 8px',
        color: 'var(--foreground)',
    };

    const valueStyle = {
        color: 'var(--primary-hover)',
    };

    const textareaStyle = {
        with: "100%",
        height: "100%",
        minHeight: "0",
        resize: "none",
        border: '1px solid var(--foreground)',
        color: 'var(--foreground)',
        outline: 'none',
        padding: '12px',
        borderRadius: '6px',
        marginTop: '12px',
    };

    return (
        <div style={divStyle}>
            { reviewArr.map((item) => (
                !item?.editable ? (
                <p className={`${typo.medium} ${typo.regular} ${typo.alignStart}`}>
                    {item?.key}:&ensp;
                    <span style={valueStyle} className={typo.semibold}>{item?.value}</span>
                </p>
                )
                :
                (
                <textarea 
                    onChange={(e) => setNotes(e.target.value)} 
                    id="note" name="note" 
                    style={textareaStyle} 
                    className={`${typo.medium} ${responsible.note}`} 
                    placeholder="Aggiungi una nota..."
                    value={notes}
                />
                )
            ))}
        </div>
    );
}