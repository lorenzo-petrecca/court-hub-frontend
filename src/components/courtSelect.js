import { useEffect, useState } from "react";
import { api } from '@/src/utils/routes';
import Select from 'react-select';

export default function CourtSelect({ selectedCourt, onChange }) {
    const [courts, setCourts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourts = async () => {
            try {
                const res = await fetch(api.getCourts);
                const data = await res.json();
                setCourts(data.data);
            } catch (err) {
                console.log("Errore nel caricamento dei campi: ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCourts();
    },[]);

    const courtOptions = courts.map((item) => ({
        value: item.documentId, 
        label: item.nome,
        image: item.immagine?.url,
        description: item.descrizione?.[0]?.children?.[0]?.text
    }));

    if (loading) return <p>Caricamento campi...</p>

    const customStyle = {
        menu: (base) => ({
            ...base,
            border: 'none',
            fontSize: '1.2rem',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? 'var(--primary)' : 'var(--foreground)',
            color: state.isSelected ? 'var(--foreground)' : 'var(--background)',
            
        }),
        control: (base, state) => ({
            ...base,
            border: 'none',
            outline: state.isSelected ? 'none' : 'none',
            boxShadow: 'none',
            fontSize: '1.2rem',
            '&:hover':{
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
            },
            '&:focus':{
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
            },
        }),
    }

    return (
        <div style={{width: "100%"}}>
            {selectedCourt && (
            console.log(selectedCourt?.image),
            <div 
            style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
                flexDirection: "column",
                flexWrap: "nowrap",
                width: "100%",
            }}>
                <img
                    style={{width: "30rem"}}
                    src={selectedCourt.image?.startsWith('http') ? selectedCourt.image : `${process.env.NEXT_PUBLIC_API_URL}${selectedCourt.image}`}
                    alt="Immagine del campo selezionato"
                />
                <p style={{marginBottom: '12px'}}>
                    {selectedCourt?.description}
                </p>

            </div>
            )}
                <Select
                    styles={customStyle}
                    value={selectedCourt}
                    onChange={onChange}
                    options={courtOptions}
                    placeholder="Seleziona il campo"
                />
        </div>
    );
}