import buttons from '@/styles/buttons.module.css';
export default function Contatti () {
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

    return (
        <a
            className={buttons.lnk}
            href={`mailto:${email}`}
        >
            {email}
        </a>
    );
}