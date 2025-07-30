import * as cookie from 'cookie';
import { api } from '../utils/routes'
import { ApiError } from 'next/dist/server/api-utils';

export default async function handler (req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Metodo non consentito' });
    }

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.jwtToken;

    if (!token) {
      return res.status(401).json({ error: 'Non autenticato' });
    }

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

    const apiRes = await fetch(`${api.prenotazioni}?my=true`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    const data = await apiRes.json();
    return res.status(apiRes.status).json(data);
}