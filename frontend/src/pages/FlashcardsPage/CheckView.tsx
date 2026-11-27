import { useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCheck, RotateCcw } from 'lucide-react';

import { checkDeck } from '../../api/flashcardsApi';
import type { CheckDeckResult } from '../../api/flashcardsApi';
import type { FlashDeck } from '../../data/flashcards';

interface CheckViewProps {
    deck: FlashDeck;
    onBack: () => void;
}

export default function CheckView({ deck, onBack }: CheckViewProps) {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<CheckDeckResult | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checked = result !== null;
    const total = result?.totalCount ?? deck.cards.length;
    const correct = result?.correctCount ?? 0;
    const wrong = total - correct;

    function reset() {
        setAnswers({});
        setResult(null);
        setError(null);
    }

    async function handleCheck() {
        setSubmitting(true);
        setError(null);
        try {
            setResult(await checkDeck(
                deck.id,
                deck.cards.map(c => ({ cardId: c.id, userAnswer: answers[c.id] ?? '' }))
            ));
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Не вдалося перевірити відповіді');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fc-check">
            <div className="fc-check__head">
                <div>
                    <h2>Перевірка пам’яті: Впишіть значення</h2>
                    <p>Спробуйте згадати переклад кожного терміна без підказок. Кілька варіантів можна писати через «/».</p>
                </div>
                <button type="button" className="fc-link" onClick={onBack}>
                    <ArrowLeft size={14} /> До набору
                </button>
            </div>

            <div className="fc-check__list">
                {deck.cards.map((card, i) => {
                    const cardResult = result?.results[card.id];
                    const ok = cardResult?.correct ?? false;
                    const state = !checked ? '' : ok ? ' fc-input--ok' : ' fc-input--bad';
                    return (
                        <div className="fc-check__row" key={card.id}>
                            <div className="fc-check__term">
                                <span>Картка {i + 1}</span>
                                <strong>{card.term}</strong>
                            </div>
                            <div className="fc-check__answer">
                                <input
                                    className={`fc-input${state}`}
                                    type="text"
                                    placeholder="Введіть переклад / значення..."
                                    value={answers[card.id] ?? ''}
                                    disabled={checked}
                                    onChange={e => setAnswers(prev => ({ ...prev, [card.id]: e.target.value }))}
                                    aria-label={`Переклад слова ${card.term}`}
                                />
                                {checked && (
                                    <small className={ok ? 'fc-note fc-note--ok' : 'fc-note fc-note--bad'}>
                                        {ok ? 'Правильно!' : `Правильна відповідь: ${cardResult?.expectedAnswer ?? card.translation}`}
                                    </small>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {error && (
                <div className="fc-alert" role="alert">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}

            <div className="fc-check__footer">
                {checked ? (
                    <span className="fc-pill fc-pill--result">Результат: {correct} з {total} вірно{wrong ? ` (помилок: ${wrong})` : ''}</span>
                ) : <span />}
                {checked ? (
                    <button type="button" className="fc-btn fc-btn--primary" onClick={reset}>
                        <RotateCcw size={15} /> Спробувати ще раз
                    </button>
                ) : (
                    <button type="button" className="fc-btn fc-btn--primary" onClick={handleCheck} disabled={submitting}>
                        <CheckCheck size={15} /> {submitting ? 'Перевірка…' : 'Перевірити переклади'}
                    </button>
                )}
            </div>
        </div>
    );
}
