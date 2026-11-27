import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, BookOpen, ClipboardCheck, FolderOpen, FlaskConical, Languages, PlusCircle, RotateCcw, Sparkles } from 'lucide-react';

import CreateDeckModal from '../../components/CreateDeckModal/CreateDeckModal';
import { createDeck, getDecks } from '../../api/flashcardsApi';
import type { CreateDeckPayload } from '../../api/flashcardsApi';
import { DEFAULT_MAX_FLIPS } from '../../data/flashcards';
import type { FlashDeck } from '../../data/flashcards';
import StudyView from './StudyView';
import CheckView from './CheckView';
import './FlashcardsPage.css';

type Tab = 'mine' | 'language' | 'logic';
type Mode = 'catalog' | 'study' | 'check';

const tabs: { id: Tab; label: string; Icon: typeof FolderOpen }[] = [
    { id: 'mine', label: 'Мої набори', Icon: FolderOpen },
    { id: 'language', label: 'Мова', Icon: Languages },
    { id: 'logic', label: 'Логіка та наука', Icon: FlaskConical },
];

export default function FlashcardsPage() {
    const [decks, setDecks] = useState<FlashDeck[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);
    const [tab, setTab] = useState<Tab>('mine');
    const [mode, setMode] = useState<Mode>('catalog');
    const [activeId, setActiveId] = useState<number | null>(null);
    const [session, setSession] = useState(0);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setLoadError(null);

        getDecks(controller.signal)
            .then(setDecks)
            .catch(error => {
                if (controller.signal.aborted) return;
                setLoadError(error instanceof Error ? error.message : 'Не вдалося завантажити набори');
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [reloadKey]);

    const closeCreate = useCallback(() => setShowCreate(false), []);
    const activeDeck = decks.find(d => d.id === activeId) ?? null;

    const visible = decks.filter(d => (tab === 'mine' ? d.owned : d.category === tab));

    function openDeck(id: number) {
        setActiveId(id);
        setSession(s => s + 1);
        setMode('study');
    }

    function selectTab(next: Tab) {
        setTab(next);
        setMode('catalog');
    }

    async function handleCreate(payload: CreateDeckPayload) {
        const created = await createDeck(payload);
        setDecks(prev => [...prev, created]);
        setShowCreate(false);
        setTab('mine');
        openDeck(created.id);
    }

    return (
        <section className="fc-page" aria-label="Флеш-картки">
            <div className="fc-banner">
                <div className="fc-banner__text">
                    <span className="fc-banner__badges">
                        <span className="fc-badge">Інтерактивний тренажер</span>
                        <span className="fc-badge"><Sparkles size={12} /> Мови, 2 переклади</span>
                    </span>
                    <h2>Тренажер термінів та слів</h2>
                    <p>Клікніть на картку, щоб побачити переклад. Ліміт: {activeDeck?.maxFlips ?? DEFAULT_MAX_FLIPS} перегляди на картку.</p>
                </div>
                <div className="fc-banner__actions">
                    <button
                        type="button"
                        className="fc-banner__btn"
                        onClick={() => activeDeck ? openDeck(activeDeck.id) : setMode('catalog')}
                    >
                        <RotateCcw size={14} /> Спочатку
                    </button>
                    <button
                        type="button"
                        className="fc-banner__btn fc-banner__btn--solid"
                        disabled={!activeDeck}
                        onClick={() => setMode('check')}
                    >
                        <ClipboardCheck size={14} /> Перевірити знання
                    </button>
                </div>
            </div>

            <div className="fc-tabs" role="tablist">
                <button type="button" className="fc-tab" onClick={() => setShowCreate(true)}>
                    <PlusCircle size={15} /> Створити
                </button>
                {tabs.map(({ id, label, Icon }) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={tab === id}
                        className={`fc-tab${tab === id ? ' fc-tab--active' : ''}`}
                        onClick={() => selectTab(id)}
                    >
                        <Icon size={15} /> {label}
                    </button>
                ))}
            </div>

            {mode === 'catalog' && (
                <>
                    {loading && <p className="fc-empty">Завантаження наборів…</p>}
                    {loadError && (
                        <div className="fc-alert" role="alert">
                            <AlertCircle size={16} />
                            <span>{loadError}</span>
                            <button type="button" className="fc-link" onClick={() => setReloadKey(k => k + 1)}>
                                Спробувати ще раз
                            </button>
                        </div>
                    )}
                    {!loading && !loadError && visible.length === 0 && <p className="fc-empty">У цій категорії ще немає наборів.</p>}
                    <div className="fc-grid">
                        {visible.map(deck => (
                            <article key={deck.id} className="fc-deck">
                                <span className="fc-deck__cat">{deck.category === 'language' ? 'Мова' : deck.category === 'logic' ? 'Логіка та наука' : 'Інше'}</span>
                                <h3>{deck.title}</h3>
                                <p>{deck.description}</p>
                                <div className="fc-deck__footer">
                                    <span><BookOpen size={13} /> {deck.cards.length} карток</span>
                                    <button type="button" className="fc-btn fc-btn--primary" onClick={() => openDeck(deck.id)}>Вчити</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}

            {mode === 'study' && activeDeck && (
                <StudyView key={`${activeDeck.id}-${session}`} deck={activeDeck} onBack={() => setMode('catalog')} />
            )}

            {mode === 'check' && activeDeck && (
                <CheckView key={`${activeDeck.id}-${session}-check`} deck={activeDeck} onBack={() => setMode('study')} />
            )}

            {showCreate && <CreateDeckModal onClose={closeCreate} onCreate={handleCreate} />}
        </section>
    );
}
