// pages/api/account.js
import * as cookie from 'cookie';
import { api } from '@/src/utils/routes';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ error: 'Non autenticato' });
  }

  const { username, password } = req.body;
  const updateData = {};

  if (username) updateData.username = username;
  if (password) updateData.password = password;

  const userRes = await fetch(api.account, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await userRes.json();

  const updateRes = await fetch(api.updateAccount(user.id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!updateRes.ok) {
    const errData = await updateRes.json();
    return res.status(400).json({ error: errData.message || 'Errore aggiornamento' });
  }

  return res.status(200).json({ message: 'Aggiornato con successo' });
}
