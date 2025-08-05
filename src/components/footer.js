import typography from "@/styles/typography.module.css"
import style from "@/styles/footer.module.css"
import Menu from "./menu";

export default function Footer() {
    return (
        <footer className={style.f}>
            <Menu></Menu>
            <p
                style={{padding: "10px", display:"flex", textAlign: "center", alignItems:"center", justifyContent: "center"}}
                className={typography.small}
            >
                © {new Date().getFullYear()} Lorenzo Petrecca. Tutti i diritti riservati.
            </p>
        </footer>
    );
}