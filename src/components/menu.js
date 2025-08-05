import Link from "next/link";
import { MenuList } from "@/src/utils/app-menu";
import style from "@/styles/menu.module.css"
import typo from "@/styles/typography.module.css"


export default function Menu () {
    return (
        <nav role="navigation" className={style.navbar}>
            {MenuList.filter(item => item.inMenu).map((item, key) => (
                <Link
                    key={key}
                    className={`${style.link} ${typo.pageTitle4}`} 
                    href={item?.path}
                >
                    {item.desktopIcon}
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}