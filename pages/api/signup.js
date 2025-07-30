// pages/api/signup.js
import * as cookie from 'cookie';
import { api } from '../utils/routes';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metodo non consentito' });
  }

  const { username, email, password } = req.body;

  try {
    const strapiRes = await fetch(api.signup, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return res.status(strapiRes.status).json({
        error: data.error?.message || 'Errore durante la registrazione'
      });
    }

    // Salva il JWT nel cookie
    res.setHeader('Set-Cookie', cookie.serialize('jwtToken', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    }));

    return res.status(200).json({ user: data.user });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Errore server interno' });
  }
}
