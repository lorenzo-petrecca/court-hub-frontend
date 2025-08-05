import * as cookie from 'cookie';
import { api } from '@/src/utils/routes';

export default async function handler (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: 'Metodo non consentito' });
    }

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.jwtToken;

    if (!token) {
        return res.status(401).json({ error: 'Non autenticato' });
    }

    const booking = await fetch(api.prenotazioni, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(req.body),
    });

    const data = await booking.json();
    return res.status(booking.status).json(data);
}