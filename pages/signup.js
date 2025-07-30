import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/login.module.css"
import typo from "@/styles/typography.module.css"
import buttons from "@/styles/buttons.module.css"
import Link from "next/link";
import { routes, api } from "./utils/routes";
import rules from "./utils/userRules";

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

export default function Signup () {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);
    const [privacy, setPrivacy] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    const eyeIconSize = 12;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);

        if (!email || !pass || !confPass) {
            setErr("Tutti i campi sono obbligatori.");
            return;
        }

        if (!privacy) {
            setErr("Devi accettare l'informativa sulla privacy per registrarti");
            return;
        }

        if (!rules.password.isValid(pass)) {
            setErr("La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero");
            return;
        }

        if (pass !== confPass) {
            setErr("Le password devono coincidere");
            return;
        }

        try {
            const res = await fetch(routes.signupAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: `user_${Date.now()}_${Math.floor(Math.random() * 1e8).toString().padStart(8, "0")}`,  // user_[Date.now]_00000000 
                    email: email, 
                    password: pass
                }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push(routes.account);
            } else {
                throw new Error(data.error?.message || "Errore nella registrazione");
            }
        } catch (e) {
            setErr(e.message);
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
                <form onSubmit={handleSubmit} style={{gap: '16px'}}>
                    <h1 className={typo.pageTitle}>Sign up</h1>
                    <input className={`${typo.big}`} type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
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
                    <div className={styles.input}>
                        <input className={`${typo.big}`} type={!showConfPass ? "password" : "text"} placeholder="Conferma password" value={confPass} onChange={(e)=> setConfPass(e.target.value)} required/>
                        <button type="button" className={styles.show} onClick={()=>setShowConfPass(!showConfPass)}>
                            {showConfPass ?
                                <FiEyeOff className={styles.eye} size={eyeIconSize} style={{backgroundColor: 'var(--background)'}}/>
                            :
                                <FiEye className={styles.eye} size={eyeIconSize} style={{backgroundColor: 'var(--background)'}}/>
                            }
                        </button>
                    </div>
                    
                    <button className={`${buttons.btn} ${buttons.primaryColor}`} type="submit">Registrati</button>
                    <div>
                        <p className={`${typo.normal} ${typo.light}`}>Hai già un account?</p>
                        <button type="button" className={`${buttons.lnk}`} onClick={() => router.push(routes.login)}>Accedi</button>
                    </div>

                    
                    <div>
                        <input type="checkbox" placeholder="" value={privacy} onChange={(e)=> setPrivacy(e.target.checked)} required/>
                        <span style={{ marginLeft: '8px' }} className={typo.normal}>
                            Ho letto e accetto l'<Link style={{color: "var(--color-hover)"}} href={routes.privacyPolicy} target="_blank" rel="noopener noreferrer">informativa sulla privacy</Link>
                        </span>
                    </div>
                    {err && <p style={{ color: 'red', marginTop: '10px', textAlign: "center"}}>{err}</p>}
                </form>
            </main>
        </>
    );
}
