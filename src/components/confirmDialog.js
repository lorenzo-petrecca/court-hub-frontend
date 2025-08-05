import typo from '@/styles/typography.module.css';
import buttons from '@/styles/buttons.module.css';

export default function ConfirmDialog ({ title, message, onConfirm, onCancel }) {
    return (
        <div className="dialog-backdrop">
            <div className="dialog">
                <h3 className={`${typo.pageTitle3}`}>{title}</h3>
                <p className={`${typo.medium}`}>{message}</p>
                <div className={`dialog-actions-row`}>
                    <button className={`${buttons.btn} ${buttons.primary}`} type='button' onClick={onCancel}>Annulla</button>
                    <button className={`${buttons.btn} ${buttons.secondary}`} type='button' onClick={onConfirm}>Conferma</button>
                </div>
            </div>
            <style jsx>{`
                .dialog-backdrop {
                    position: fixed;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100000000000000000;
                    width: 100%;
                    height: 100%;
                }
                .dialog {
                    background: var(--background);
                    padding: 1.5rem;
                    border-radius: 6px;
                    width: 90%;
                    max-width: 400px;
                    display: flex;
                    flex-direction: column;
                    flex-wrap: nowrap;
                    justifyContent: center;
                    align-items: start;
                    gap: 10px;
                }
                .dialog-actions-row {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.5rem;
                    margin-top: 12px;
                }
            `}</style>
        </div>
        
    );
}