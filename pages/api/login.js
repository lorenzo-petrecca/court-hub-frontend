import * as cookie from 'cookie';
import { api } from '../utils/routes';

export default async function handler (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Metodo non consentito"});
    }
    
    const { identifier, password } = req.body;

    const response = await fetch(api.login, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();


    if (!response.ok) {
        return res.status(response.status).json({ error: data.error?.message || 'Errore login' });
    }

    // 🔒 Set cookie httpOnly
    res.setHeader('Set-cookie', cookie.serialize('jwtToken', data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 giorni
        path: '/',
    }));

    return res.status(200).json({user: data.user}); // invia il codice OK con i dati utente come risposta
}