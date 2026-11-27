import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
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
    const [tabDir, setTabDir] = useState<'left' | 'right' | 'none'>('none');
    const [mode, setMode] = useState<Mode>('catalog');
    const [activeId, setActiveId] = useState<number | null>(null);
    const [session, setSession] = useState(0);
    const [showCreate, setShowCreate] = useState(false);

    const tabsContainerRef = useRef<HTMLDivElement | null>(null);
    const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
    const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; ready: boolean }>({
        left: 0,
        width: 0,
        ready: false,
    });

    const updateIndicator = useCallback(() => {
        const container = tabsContainerRef.current;
        const activeBtn = tabRefs.current[tab];
        if (!container || !activeBtn) return;

        setIndicatorStyle({
            left: activeBtn.offsetLeft,
            width: activeBtn.offsetWidth,
            ready: true,
        });
    }, [tab]);

    useLayoutEffect(() => {
        updateIndicator();
    }, [updateIndicator]);

    useEffect(() => {
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [updateIndicator]);

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
        if (next === tab && mode === 'catalog') return;
        const prevIdx = tabs.findIndex(t => t.id === tab);
        const nextIdx = tabs.findIndex(t => t.id === next);
        setTabDir(nextIdx > prevIdx ? 'right' : nextIdx < prevIdx ? 'left' : 'none');
        setTab(next);
        setMode('catalog');
    }

    async function handleCreate(payload: CreateDeckPayload) {
        const created = await createDeck(payload);
        setDecks(prev => [...prev, created]);
        setShowCreate(false);
        setTabDir('left');
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

            <div className="fc-tabs" role="tablist" ref={tabsContainerRef}>
                {indicatorStyle.ready && (
                    <span
                        className="fc-tabs__indicator"
                        aria-hidden="true"
                        style={{
                            transform: `translateX(${indicatorStyle.left}px)`,
                            width: `${indicatorStyle.width}px`,
                        }}
                    />
                )}

                <button type="button" className="fc-tab fc-tab--create" onClick={() => setShowCreate(true)}>
                    <PlusCircle size={15} /> Створити
                </button>
                {tabs.map(({ id, label, Icon }) => (
                    <button
                        key={id}
                        ref={el => { tabRefs.current[id] = el; }}
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
                <div
                    key={`catalog-${tab}`}
                    className={`fc-view-transition${tabDir !== 'none' ? ` fc-view-transition--${tabDir}` : ''}`}
                >
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
                    {!loading && !loadError && visible.length === 0 && (
                        <p className="fc-empty">У цій категорії ще немає наборів.</p>
                    )}
                    <div className="fc-grid">
                        {visible.map((deck, idx) => (
                            <article
                                key={deck.id}
                                className="fc-deck"
                                style={{ '--stagger': idx } as CSSProperties}
                            >
                                <span className="fc-deck__cat">
                                    {deck.category === 'language' ? 'Мова' : deck.category === 'logic' ? 'Логіка та наука' : 'Інше'}
                                </span>
                                <h3>{deck.title}</h3>
                                <p>{deck.description}</p>
                                <div className="fc-deck__footer">
                                    <span><BookOpen size={13} /> {deck.cards.length} карток</span>
                                    <button type="button" className="fc-btn fc-btn--primary" onClick={() => openDeck(deck.id)}>Вчити</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {mode === 'study' && activeDeck && (
                <div key={`study-${activeDeck.id}-${session}`} className="fc-view-transition fc-view-transition--fade">
                    <StudyView deck={activeDeck} onBack={() => setMode('catalog')} />
                </div>
            )}

            {mode === 'check' && activeDeck && (
                <div key={`check-${activeDeck.id}-${session}`} className="fc-view-transition fc-view-transition--fade">
                    <CheckView deck={activeDeck} onBack={() => setMode('study')} />
                </div>
            )}

            {showCreate && <CreateDeckModal onClose={closeCreate} onCreate={handleCreate} />}
        </section>
    );
}