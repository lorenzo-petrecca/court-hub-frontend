import typo from '@/styles/typography.module.css'

export default function NoteTab ({title, content, styles=null}) {
    return (
        <div className={styles?.tab}>
            <div className={styles?.tabBox}>
                <h3 className={`${styles?.tabTitle} ${typo.pageTitle3} ${typo.w6} ${typo.italic}`}>{title}</h3>
                <p className={`${styles.tabContent} ${typo.big} ${typo.light} ${typo.italic} ${styles.paragraph}`}>
                    {content}
                </p>
            </div>
        </div>
    );
}