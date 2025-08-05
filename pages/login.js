import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/login.module.css"
import typo from "@/styles/typography.module.css"
import buttons from "@/styles/buttons.module.css"
import Link from "next/link";
import { routes, api } from "@/src/utils/routes";

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

export default function Login () {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [privacy, setPrivacy] = useState('');
    const [err, setErr] = useState('');
    const eyeIconSize = 12;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr('');

        const res = await fetch(routes.loginAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: identifier, 
                password: pass
            }),
        });

        if (res.ok) {
            router.push(routes.account);
        } else {
            const { error } = await res.json();
            setErr(error || 'Errore login');
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

            <main className={styles.main}>
                <form onSubmit={handleSubmit}>
                    <h1 className={typo.pageTitle}>Login</h1>
                    <input className={`${typo.big}`} type="text" placeholder="Email o username" value={identifier} onChange={(e)=> setIdentifier(e.target.value)} required/>
                    <div className={styles.input}>
                        <input className={`${typo.big}`} type={!showPass ? "password" : "text"} placeholder="Password" value={pass} onChange={(e)=> setPass(e.target.value)} required/>
                        <button type="button" className={styles.show} onClick={()=>setShowPass(!showPass)}>
                            {showPass ?
                                <FiEyeOff className={styles.eye} size={eyeIconSize} style={{backgroundColor: 'var(--background)'}}/>
                            :
                                <FiEye className={styles.eye} size={eyeIconSize} style={{backgroundColor: 'var(--background)'}}/>
                            }
                        </button>
                    </div>
                    
                    <button className={`${buttons.btn} ${buttons.primaryColor}`} type="submit">Accedi</button>
                    <div>
                        <p className={`${typo.normal} ${typo.light}`}>Non hai un account?</p>
                        <button type="button" className={`${buttons.lnk}`} onClick={() => router.push(routes.signup)}>Registrati</button>
                    </div>

                    {err && <p style={{ color: 'red', marginTop: '10px', textAlign:'center' }}>{err}</p>}
                </form>
            </main>
        </>
    );
}
