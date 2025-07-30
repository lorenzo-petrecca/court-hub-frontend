import { requireAuthentication } from './utils/auth';
import { api, routes } from './utils/routes';
import { useState } from 'react';
import { useRouter } from 'next/router';
import rules from "./utils/userRules";

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

import styles from "@/styles/account.module.css";
import loginTheme from "@/styles/login.module.css";
import typo from "@/styles/typography.module.css";
import buttons from "@/styles/buttons.module.css";

import Head from "next/head";
import ConfirmDialog from './components/confirmDialog';

export default function Account({ user }) {
  const router = useRouter();
  const userID = user.id;
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageOk, setMessageOK] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const eyeIconSize = 12;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !username) {
      setMessage("È necessario che i campi \"Username\" e \"Password attuale\" siano compilati per aggiornare il profilo");
      setMessageOK(false);
      return;
    }

    if (newPassword) {
      if (!rules.password.isValid(newPassword)) {
        setMessage("La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero");
        setMessageOK(false);
        return;
      }
    }

    if (!rules.username.isValidLength(username)) {
      setMessage("L'username deve avere una lunghezza minima di 3 caratteri e massima di 30.");
      setMessageOK(false);
      return;
    }

    if (!rules.username.isValidRegex(username)) {
      setMessage("Lo username può contenere solo lettere, numeri, punti (.), trattini (-) e underscore (_), e deve iniziare con una lettera.");
      setMessageOK(false);
      return;
    }

    const available = await rules.username.isAvailable(username, userID);
    if (!available) {
      setMessage("Username già preso");
      setMessageOK(false);
      return;
    }
    const body = {
      username,
    };
    if (newPassword) body.password = newPassword;
    const res = await fetch(routes.accountApi, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || 'Errore durante l\'aggiornamento');
      setMessageOK(false);
    } else {
      setMessage('Dati aggiornati con successo');
      setMessageOK(true);
    }
  };

  
  // Effettua il logout dall'account corrente
  const handleLogout = async () => {
    try {
      await fetch(routes.logoutAPI);
      router.push(routes.login);
    } catch {
      alert("Errore di rete");
    }
  };


  // Elimina l'utente con le relative prenotazioni future
  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(routes.deleteAccountApi, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push(routes.login);
      } else {
        const error = await res.json();
        alert(error.message || 'Errore durante l\'eliminazione');
      }

    } catch {
      alert('Errore di rete');
    }
  }

  return (
    <>
      <Head>
        <title>CourtHub</title>
        <meta name="description" content="Piattaforma per la gestione di prenotazioni online, orari e utenti. Organizza la tua partita di tennis!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${loginTheme.main} ${styles.main}`} style={{textAlign: "start"}}>
        <form onSubmit={handleSubmit}>
          <h1 className={typo.pageTitle}>Il tuo account</h1>
          <p className={`${typo.medium} ${typo.light}`}>Email<br/><span className={typo.pageTitle3}>{user.email}</span></p>
          <div className={`${typo.medium} ${typo.light} ${loginTheme.input} ${styles.responsiveRow}`}>
            <label>Username</label>
            <input
              className={typo.medium}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={`${typo.medium} ${typo.light} ${loginTheme.input} ${styles.responsiveRow}`}>
            <label>Password attuale</label>
            <input
              className={typo.medium}
              type= {showPass ? "text" : "password"}
              value={password}
              placeholder="Inserisci password attuale per le modifiche"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" style={{top: '30px'}} className={loginTheme.show} onClick={()=>setShowPass(!showPass)}>
              {showPass ?
                  <FiEyeOff className={loginTheme.eye} size={eyeIconSize} style={{backgroundColor: 'var(--background)'}}/>
              :
                  <FiEye className={loginTheme.eye} size={eyeIconSize} style={{backgroundColor: 'var(--background)'}}/>
              }
            </button>
          </div>

          <div className={`${typo.medium} ${typo.light} ${loginTheme.input} ${styles.responsiveRow}`}>
            <label>Nuova password</label>
            <input
              className={typo.medium}
              type= {showNewPass ? "text" : "password"}
              value={newPassword}
              placeholder="Lascia vuoto per non cambiare password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="button" style={{top: '30px'}} className={loginTheme.show} onClick={()=>setShowNewPass(!showNewPass)}>
              {showNewPass ?
                  <FiEyeOff className={loginTheme.eye} size={eyeIconSize} style={{backgroundColor: 'var(--background)'}}/>
              :
                  <FiEye className={loginTheme.eye} size={eyeIconSize} style={{backgroundColor: 'var(--background)'}}/>
              }
            </button>
          </div>

          <div style={{marginTop: '10px', justifyContent: 'start'}} className={buttons.btnsRow}>
            <button onClick={handleLogout} title='Esci (log-out)' type='button' className={`${buttons.iconBtn} ${buttons.secondary} ${styles.iconButton}`}>
              <BiLogOut
                className={styles.logoutIcon}
                size={22}
                color='var(--foreground-hover)'
              />
            </button>
            <button className={`${buttons.btn} ${buttons.primaryColor}`} type="submit">Applica modifiche</button>
            <button 
              title='Elimina account' 
              type='button' 
              className={`${buttons.iconBtn} ${buttons.secondary} ${styles.iconButton}`}
              onClick={() => setShowDeleteConfirm(true)}
            >
              <FaTrashCan
                className={styles.deleteIcon}
                size={22}
                color='var(--disabled)'
              />
            </button>
          </div>
            {message && <p className={`${typo.normal} ${typo.regular}`} style={{color: messageOk ?'green' : 'red', textAlign:'center'}}>{message}</p>}
        </form>
        
      </main>

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Sei sicuro?"
          message="Questa azione è irreversibile. Vuoi eliminare l'account?"
          onConfirm={() => {
            setShowDeleteConfirm(false);
            handleDeleteAccount();
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>

  );
}

// necessario essere autenticati
export async function getServerSideProps(context) {
  return await requireAuthentication(context);
}