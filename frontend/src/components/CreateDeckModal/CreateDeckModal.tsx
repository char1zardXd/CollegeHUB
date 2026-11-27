import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Layers, Plus, Trash2, X } from 'lucide-react';

import { flashcardCategories } from '../../data/flashcards';
import type { FlashcardCategory } from '../../data/flashcards';
import type { CreateDeckPayload } from '../../api/flashcardsApi';
import './CreateDeckModal.css';

interface CreateDeckModalProps {
    onClose: () => void;
    onCreate: (deck: CreateDeckPayload) => Promise<void>;
}

interface DraftCard {
    key: number;
    term: string;
    translation: string;
    transcription: string;
    example: string;
}

let nextKey = 1;
const emptyCard = (): DraftCard => ({ key: nextKey++, term: '', translation: '', transcription: '', example: '' });

export default function CreateDeckModal({ onClose, onCreate }: CreateDeckModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const [category, setCategory] = useState<FlashcardCategory | ''>('');
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState<DraftCard[]>(() => [emptyCard()]);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        closeRef.current?.focus();
        function onKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
        }
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            previous?.focus();
        };
    }, [onClose]);

    function updateCard(key: number, patch: Partial<DraftCard>) {
        setCards(prev => prev.map(c => (c.key === key ? { ...c, ...patch } : c)));
    }

    async function handleSubmit() {
        const filled = cards.filter(c => c.term.trim() && c.translation.trim());
        if (!title.trim()) return setError('Вкажіть назву колоди.');
        if (!category) return setError('Оберіть категорію.');
        if (filled.length === 0) return setError('Додайте хоча б одну картку з терміном і перекладом.');

        setError(null);
        setSubmitting(true);
        try {
            await onCreate({
                title: title.trim(),
                category,
                cards: filled.map(c => ({
                    term: c.term.trim(),
                    translation: c.translation.trim(),
                    transcription: c.transcription.trim() || undefined,
                    example: c.example.trim() || undefined,
                })),
            });
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Не вдалося створити набір');
            setSubmitting(false);
        }
    }

    return createPortal(
        <div className="deck-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div ref={dialogRef} className="deck-modal" role="dialog" aria-modal="true" aria-labelledby="deck-modal-title">
                <div className="deck-modal__header">
                    <span className="deck-modal__icon"><Layers size={24} /></span>
                    <div className="deck-modal__heading">
                        <h2 id="deck-modal-title">Конструктор флеш-карток</h2>
                        <p>Створіть власний набір термінів для тренажера пам’яті</p>
                    </div>
                    <button ref={closeRef} type="button" className="deck-modal__close" onClick={onClose} aria-label="Закрити вікно">
                        <X size={19} />
                    </button>
                </div>

                <div className="deck-modal__body">
                    <div className="deck-modal__grid">
                        <label className="deck-field">
                            <span>Категорія</span>
                            <select value={category} onChange={e => setCategory(e.target.value as FlashcardCategory | '')}>
                                <option value="" disabled>Мої набори</option>
                                {flashcardCategories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </label>
                        <label className="deck-field">
                            <span>Назва колоди</span>
                            <input type="text" placeholder="Наприклад: Іспанська, Подорожі або терміни" value={title} onChange={e => setTitle(e.target.value)} />
                        </label>
                    </div>

                    <div className="deck-modal__cards-head">
                        <h3>Картки в наборі ({cards.length})</h3>
                        <button type="button" className="deck-add" onClick={() => setCards(prev => [...prev, emptyCard()])}>
                            <Plus size={16} /> Додати картку
                        </button>
                    </div>

                    {cards.map((card, i) => (
                        <div className="deck-card" key={card.key}>
                            <div className="deck-card__title">
                                <strong>Картка #{i + 1}</strong>
                                {cards.length > 1 && (
                                    <button type="button" className="deck-card__remove" onClick={() => setCards(prev => prev.filter(c => c.key !== card.key))} aria-label={`Видалити картку ${i + 1}`}>
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                            <div className="deck-modal__grid">
                                <input type="text" placeholder="Термін або слово *" value={card.term} onChange={e => updateCard(card.key, { term: e.target.value })} />
                                <input type="text" placeholder="Переклад/ значення *" value={card.translation} onChange={e => updateCard(card.key, { translation: e.target.value })} />
                                <input type="text" placeholder="Підказка/ транскрипція (необов’язково)" value={card.transcription} onChange={e => updateCard(card.key, { transcription: e.target.value })} />
                                <input type="text" placeholder="Приклад використання (необов’язково)" value={card.example} onChange={e => updateCard(card.key, { example: e.target.value })} />
                            </div>
                        </div>
                    ))}

                    {error && <p className="deck-error" role="alert">{error}</p>}
                </div>

                <div className="deck-modal__footer">
                    <button type="button" className="deck-btn deck-btn--ghost" onClick={onClose}>Скасувати</button>
                    <button type="button" className="deck-btn deck-btn--primary" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? 'Збереження…' : '✓ Зберегти та вивчити'}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
