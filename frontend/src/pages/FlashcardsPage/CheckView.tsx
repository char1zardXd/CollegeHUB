import { useState } from 'react';
import { ArrowLeft, CheckCheck, RotateCcw } from 'lucide-react';

import type { FlashDeck } from '../../data/flashcards';

interface CheckViewProps {
    deck: FlashDeck;
    onBack: () => void;
}

function normalize(value: string) {
    return value.trim().toLowerCase().replace(/[’']/g, '’').replace(/\s+/g, ' ');
}

function isCorrect(answer: string, translation: string) {
    const given = normalize(answer);
    if (!given) return false;
    return translation.split(/[\/,;]/).map(normalize).filter(Boolean).includes(given);
}

export default function CheckView({ deck, onBack }: CheckViewProps) {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [checked, setChecked] = useState(false);

    const total = deck.cards.length;
    const correct = deck.cards.filter(c => isCorrect(answers[c.id] ?? '', c.translation)).length;
    const wrong = total - correct;

    function reset() {
        setAnswers({});
        setChecked(false);
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
                    const ok = isCorrect(answers[card.id] ?? '', card.translation);
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
                                        {ok ? 'Правильно!' : `Правильна відповідь: ${card.translation}`}
                                    </small>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="fc-check__footer">
                {checked ? (
                    <span className="fc-pill fc-pill--result">Результат: {correct} з {total} вірно{wrong ? ` (помилок: ${wrong})` : ''}</span>
                ) : <span />}
                {checked ? (
                    <button type="button" className="fc-btn fc-btn--primary" onClick={reset}>
                        <RotateCcw size={15} /> Спробувати ще раз
                    </button>
                ) : (
                    <button type="button" className="fc-btn fc-btn--primary" onClick={() => setChecked(true)}>
                        <CheckCheck size={15} /> Перевірити переклади
                    </button>
                )}
            </div>
        </div>
    );
}
