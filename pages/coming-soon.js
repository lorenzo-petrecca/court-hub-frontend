import typo from '@/styles/typography.module.css';

export default function ComingSoon () {
    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            color: 'var(--foreground)', 
            flexDirection: 'column',
            gap: '0',
            gridRowStart: '2',
            textAlign: 'center',
            maxWidth: '700px',
        }}>
            <img style={{maxWith: '100%', height: 'auto'}} src="/coming-soon-graphic.svg" alt="Coming Soon" />
            <p
                style={{
                    color: '#32514c',
                }}
                className={`${typo.bigger} ${typo.semibold} ${typo.alignCenter} ${typo.uppercase}`}
            >
                Stiamo lavorando per offrirti il miglior servizio possibile.<br />Torna presto!
            </p>
        </div>
    );
}