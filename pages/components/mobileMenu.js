import { MenuList } from "../utils/app-menu";
import Link from "next/link";
import { useState } from "react";

import mobileMenu from "@/styles/mobileMenu.module.css"
import typo from "@/styles/typography.module.css"
import buttons from "@/styles/buttons.module.css"

export default function MobileMenu () {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className={mobileMenu.mobileOnly}>
            <div className={mobileMenu.mobileHeader}>
                <button className={`${buttons.secondary} ${buttons.noborder}`} onClick={()=> setMobileMenuOpen(true)}>
                    ☰
                </button>
            </div>
            <div className={`${mobileMenu.menu} ${mobileMenuOpen ? mobileMenu.isOpen : ""}`}>
                <div className={mobileMenu.menuContent}>
                    <div className={mobileMenu.mobileMenuHeader}>
                        <button className={`${mobileMenu.close} ${buttons.secondary} ${buttons.noborder} ${typo.pageTitle} ${typo.w5}`} onClick={()=>setMobileMenuOpen(false)}>
                            ×
                        </button>
                    </div>
                    <nav role="navigation" className={mobileMenu.navbar}>
                    {MenuList.filter(item => item.inMenu).map((item, key) => (
                        <Link
                            key={key}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`${mobileMenu.link} ${typo.pageTitle4}`}
                            href={item?.path}
                        >
                            {item?.mobileIcon}
                            {item?.label}
                        </Link>
                    ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}