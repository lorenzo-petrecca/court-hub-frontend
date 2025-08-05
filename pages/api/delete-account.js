import * as cookie from 'cookie';
import { api } from '@/src/utils/routes';

export default async function handler (req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Metodo non consentito" });
    }

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.jwtToken;

    if (!token) {
        return res.stauts(401).json({ message: "Non autenticato" });
    }

    try {
        const apiRes = await fetch(api.deleteAccount, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!apiRes.ok) {
            const error = await apiRes.json();
            return res.status(apiRes.status).json({ message: error.message || 'Errore lato server' });
        }

        // Cancella cookie
        res.setHeader(
            'Set-cookie',
            cookie.serialize('jwtToken', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: -1,
            }),
        );

        return res.status(200).json({ message: 'Account eliminato' });

    } catch (err) {
        return res.status(500).json({ message: `Errore interno: ${err}` });
    }
}