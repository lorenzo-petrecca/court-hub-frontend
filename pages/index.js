import Head from "next/head";
import Link from "next/link";
import { routes } from "./utils/routes";


import styles from "@/styles/Home.module.css";
import typography from "@/styles/typography.module.css";
import buttons from "@/styles/buttons.module.css";
import icons from "@/styles/icons.module.css";

import { FiLogIn } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa6";



import { useState } from "react";

export default function Home() {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <>
      <Head>
        <title>CourtHub</title>
        <meta name="description" content="Piattaforma per la gestione di prenotazioni online, orari e utenti. Organizza la tua partita di tennis!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        {/* main */}
        <main className={styles.main}>
          <div
            className={`${typography.pageTitle} ${typography.alignStart}`}
          >
          CourtHub
          </div>
          <p className={`${typography.big} ${typography.light}`}>Prenota ora la tua partita al primo orario disponibile.</p>

          <div className={`${buttons.btnsRow} flex-start`}>
            <Link
              className={`${buttons.btn} ${buttons.primaryColor}`}
              href= {routes.prenota}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              <FaRegCalendarCheck
                className={`${icons.secondary} ${btnHover ? icons.color : ""}`}
                size={24}
              />
              Prenota ora
            </Link>
            <Link
            className={`${buttons.btn} ${buttons.secondary}`}
              href={routes.login}
              
            >
              <FiLogIn
                className={`${icons.primary}`}
                size={24}
              />
              Login
            </Link>
          </div>
        </main>
    </>
  );
}
