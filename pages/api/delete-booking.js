import * as cookie from 'cookie';
import { api } from '../utils/routes';

export default async function handler (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Metodo non consentito" });
    }

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.jwtToken;

    if (!token) {
        return res.stauts(401).json({ message: "Non autenticato" });
    }

    const { booking } = req.body;

    try {
        const apiRes = await fetch(api.deleteBooking({ documentId: booking }), {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!apiRes.ok) {
            const error = await apiRes.json();
            return res.status(apiRes.status).json({ message: error.message || 'Errore lato server' });
        }

        return res.status(200).json({ message: 'Prenotazione eliminata' });

    } catch (err) {
        return res.status(500).json({ message: `Errore interno: ${err}` });
    }
}