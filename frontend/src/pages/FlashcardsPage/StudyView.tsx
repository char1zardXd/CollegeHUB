import { useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Hand, Lightbulb } from 'lucide-react';

import type { FlashDeck } from '../../data/flashcards';

interface StudyViewProps {
    deck: FlashDeck;
    onBack: () => void;
}

export default function StudyView({ deck, onBack }: StudyViewProps) {
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [reveals, setReveals] = useState<Record<number, number>>({});
    const [known, setKnown] = useState<Set<number>>(() => new Set());
    const [limitHit, setLimitHit] = useState(false);

    const maxReveals = deck.maxFlips;
    const card = deck.cards[index];
    const revealCount = reveals[card.id] ?? 0;
    const isFirst = index === 0;
    const isLast = index === deck.cards.length - 1;

    function go(next: number) {
        setIndex(next);
        setFlipped(false);
        setLimitHit(false);
    }

    function handleFlip() {
        if (flipped) {
            setFlipped(false);
            return;
        }
        if (revealCount >= maxReveals) {
            setLimitHit(true);
            return;
        }
        setReveals(prev => ({ ...prev, [card.id]: revealCount + 1 }));
        setFlipped(true);
        setLimitHit(false);
    }

    function toggleKnown() {
        setKnown(prev => {
            const next = new Set(prev);
            if (next.has(card.id)) next.delete(card.id);
            else next.add(card.id);
            return next;
        });
    }

    function restart() {
        setReveals({});
        setKnown(new Set());
        go(0);
    }

    const meta = [card.transcription ? `[ ${card.transcription} ]` : null, card.partOfSpeech]
        .filter(Boolean)
        .join(' • ');

    return (
        <div className="fc-study">
            <div className="fc-study__top">
                <button type="button" className="fc-link" onClick={onBack}>
                    <ArrowLeft size={14} /> До каталогу наборів
                </button>
                <span className="fc-study__deck">{deck.title}</span>
            </div>

            <div className="fc-study__progress">
                <span>Картка {index + 1} з {deck.cards.length}</span>
                <span className="fc-pill fc-pill--warn">
                    <Lightbulb size={13} /> Запам’ятовано переклад: {known.size} / {deck.cards.length}
                </span>
            </div>

            <button
                type="button"
                className={`fc-card${flipped ? ' fc-card--back' : ''}`}
                onClick={handleFlip}
                aria-label={flipped ? 'Сховати переклад' : 'Показати переклад'}
            >
                <span className="fc-card__label">{flipped ? 'Значення / переклад' : 'Термін / слово'}</span>
                {!flipped && (
                    <span className={`fc-pill fc-pill--tiny${revealCount >= maxReveals ? ' fc-pill--danger' : ''}`}>
                        Ліміт переглядів: {revealCount} / {maxReveals}
                    </span>
                )}
                <span className="fc-card__main">{flipped ? card.translation : card.term}</span>
                <span className="fc-card__sub">
                    {flipped ? (card.example ? `“${card.example}”` : '') : meta}
                </span>
                <span className="fc-card__hint">
                    <Hand size={14} />
                    {flipped ? 'Натисніть, щоб повернути картку' : 'Натисніть, щоб побачити значення'}
                </span>
            </button>

            {limitHit && (
                <div className="fc-alert" role="alert">
                    <AlertCircle size={16} />
                    <span>
                        Ви вже переглядали цю картку {maxReveals} рази! Спробуйте згадати переклад
                        самостійно або перейдіть до перевірки знань.
                    </span>
                </div>
            )}

            <div className="fc-study__actions">
                <button type="button" className="fc-btn fc-btn--ghost" onClick={() => go(index - 1)} disabled={isFirst}>
                    <ArrowLeft size={15} /> Попередня
                </button>

                <div className="fc-dots" aria-hidden="true">
                    {deck.cards.map((c, i) => (
                        <span key={c.id} className={`fc-dot${i === index ? ' fc-dot--active' : ''}${known.has(c.id) ? ' fc-dot--known' : ''}`} />
                    ))}
                </div>

                {isLast ? (
                    <button type="button" className="fc-btn fc-btn--primary" onClick={restart}>
                        Спочатку
                    </button>
                ) : (
                    <button type="button" className="fc-btn fc-btn--primary" onClick={() => go(index + 1)}>
                        Наступна <ArrowRight size={15} />
                    </button>
                )}
            </div>

            <button type="button" className={`fc-known${known.has(card.id) ? ' fc-known--on' : ''}`} onClick={toggleKnown}>
                <CheckCircle2 size={15} />
                {known.has(card.id) ? 'Позначено як запам’ятоване' : 'Я запам’ятав(ла) цей термін'}
            </button>
        </div>
    );
}
