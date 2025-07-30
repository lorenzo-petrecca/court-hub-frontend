import { routes } from "./routes"
import mobileMenu from "@/styles/mobileMenu.module.css"
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoTennisballOutline } from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { LiaCookieBiteSolid } from "react-icons/lia";
import { RiContractLine } from "react-icons/ri";


export const MenuList = [
    {
        key: 'home',
        label: 'Home',
        path: routes.home,
        desktopIcon: null,
        mobileIcon: null,
        inMenu: false,
    },
    {
        key: 'prenota',
        label: 'Prenota',
        path: routes.prenota,
        desktopIcon: <FaRegCalendarAlt size={16}/>,
        mobileIcon: <FaRegCalendarAlt className={mobileMenu.icon} size={28}/>,
        inMenu: true,
    },
    {
        key: 'account',
        label: 'Account',
        path: routes.account,
        desktopIcon: <MdOutlineAccountCircle size={16}/>,
        mobileIcon: <MdOutlineAccountCircle className={mobileMenu.icon} size={28}/>,
        inMenu: true,
    },
    {
        key: 'prenotazioni',
        label: 'Le mie prenotazioni',
        path: routes.prenotazioni,
        desktopIcon: <IoTennisballOutline size={16}/>,
        mobileIcon: <IoTennisballOutline className={mobileMenu.icon} size={28}/>,
        inMenu: true,
    },
    {
        key: 'regolamento',
        label: 'Regolamento',
        path: routes.regolamento,
        desktopIcon: <RiContractLine size={16} />,
        mobileIcon: <RiContractLine className={mobileMenu.icon} size={28} />,
        inMenu: true,
    },
    {
        key: 'privacy',
        label: 'Privacy Policy',
        path: routes.privacyPolicy,
        desktopIcon: <MdOutlinePrivacyTip size={16}/>,
        mobileIcon: <MdOutlinePrivacyTip className={mobileMenu.icon} size={28}/>,
        inMenu: true,
    },
    {
        key: 'cookie',
        label: 'Cookie Policy',
        path: routes.cookiePolicy,
        desktopIcon: <LiaCookieBiteSolid size={16}/>,
        mobileIcon: <LiaCookieBiteSolid className={mobileMenu.icon} size={28}/>,
        inMenu: true,
    },

];