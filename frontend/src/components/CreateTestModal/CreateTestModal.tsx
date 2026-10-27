import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ClipboardList, X } from 'lucide-react';
import './CreateTestModal.css';

type CreateTestModalProps = {
    onClose: () => void;
};

export default function CreateTestModal({ onClose }: CreateTestModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        closeRef.current?.focus();

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
            if (event.key !== 'Tab' || !dialogRef.current) return;
            const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
                'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)'
            ));
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previous?.focus();
        };
    }, [onClose]);

    return createPortal(
        <div
            className="create-test-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                className="create-test-modal"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-test-title"
            >
                <header className="create-test-header">
                    <span className="create-test-header-icon"><ClipboardList size={24} /></span>
                    <div className="create-test-heading">
                        <h2 id="create-test-title">Створити новий тест</h2>
                        <p>Конструктор опитування для вашої групи</p>
                    </div>
                    <button ref={closeRef} type="button" className="create-test-close" onClick={onClose} aria-label="Закрити">
                        <X size={21} />
                    </button>
                </header>

                <div className="create-test-body">
                    <div className="create-test-fields">
                        <label className="create-test-field">
                            <span>НАЗВА ТЕСТУ</span>
                            <input placeholder="напр., Фінал з Веб-розробки" />
                        </label>
                        <label className="create-test-field">
                            <span>КАТЕГОРІЯ</span>
                            <select defaultValue="programming">
                                <option value="programming">Програмування</option>
                                <option value="career">Кар'єра</option>
                                <option value="development">Розвиток</option>
                                <option value="law">Право</option>
                                <option value="cybersecurity">Кібербезпека</option>
                                <option value="soft-skills">Soft Skills</option>
                                <option value="logic">Логіка</option>
                            </select>
                        </label>
                        <label className="create-test-field">
                            <span>ЧАС НА ВИКОНАННЯ (ХВИЛИН)</span>
                            <input type="number" min="1" defaultValue="15" />
                        </label>
                        <label className="create-test-field">
                            <span>КОЛІР КАРТКИ</span>
                            <select defaultValue="purple">
                                <option value="purple">Пастельно-фіолетовий</option>
                                <option value="mint">Пастельно-зелений</option>
                                <option value="pink">Пастельно-рожевий</option>
                                <option value="blue">Пастельно-блакитний</option>
                                <option value="peach">Пастельно-помаранчевий</option>
                                <option value="yellow">Пастельно-жовтий</option>
                            </select>
                        </label>
                        <label className="create-test-field create-test-field--wide">
                            <span>КОРОТКИЙ ОПИС</span>
                            <textarea placeholder="Поясніть, що саме перевіряє цей тест..." rows={3} />
                        </label>
                    </div>

                    <section className="create-test-questions" aria-labelledby="create-test-questions-title">
                        <div className="create-test-questions-heading">
                            <h3 id="create-test-questions-title">Питання тесту</h3>
                            <button type="button" className="create-test-add">+ Додати ще питання</button>
                        </div>
                        <div className="create-test-question-card">
                            <label className="create-test-question-label" htmlFor="demo-question">Питання #1</label>
                            <input id="demo-question" placeholder="Текст питання..." />
                            <div className="create-test-answer-grid">
                                <input className="create-test-answer--correct" aria-label="Варіант відповіді 1" placeholder="Варіант відповіді 1" />
                                <input aria-label="Варіант відповіді 2" placeholder="Варіант відповіді 2" />
                                <input aria-label="Варіант відповіді 3" placeholder="Варіант відповіді 3" />
                                <input aria-label="Варіант відповіді 4" placeholder="Варіант відповіді 4" />
                            </div>
                        </div>
                    </section>
                </div>

                <footer className="create-test-footer">
                    <button type="button" className="create-test-cancel" onClick={onClose}>Скасувати</button>
                    <button type="button" className="create-test-save">Зберегти та опублікувати</button>
                </footer>
            </div>
        </div>,
        document.body
    );
}
