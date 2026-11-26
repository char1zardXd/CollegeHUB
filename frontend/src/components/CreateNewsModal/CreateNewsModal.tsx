import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import {
    Check,
    Eye,
    GraduationCap,
    Info,
    LayoutList,
    ListChecks,
    Megaphone,
    Pin,
    Plus,
    Rocket,
    Send,
    Sparkles,
    Trash2,
    Wrench,
    X
} from 'lucide-react';

import './CreateNewsModal.css';

type CreateNewsModalProps = {
    onClose: () => void;
};

type DraftChange = {
    key: number;
    title: string;
    description: string;
};

const accentColors = [
    { id: 'release', label: 'Реліз', value: '#87456f' },
    { id: 'announce', label: 'Анонс', value: '#3b82f6' },
    { id: 'fix', label: 'Фікс', value: '#10b981' },
    { id: 'important', label: 'Важливо', value: '#f59e0b' }
] as const;

const cardIcons = [
    { id: 'rocket', label: 'Ракета', icon: Rocket },
    { id: 'sparkles', label: 'Іскри', icon: Sparkles },
    { id: 'megaphone', label: 'Мегафон', icon: Megaphone },
    { id: 'wrench', label: 'Ключ', icon: Wrench },
    { id: 'education', label: 'Навчання', icon: GraduationCap }
] as const;

type AccentId = (typeof accentColors)[number]['id'];
type IconId = (typeof cardIcons)[number]['id'];

const MAX_CHANGES = 20;

const initialChanges: DraftChange[] = [
    {
        key: 1,
        title: 'Новий функціонал',
        description: 'Короткий опис того, як це покращить навчання'
    }
];

function accentStyle(color: string): CSSProperties {
    return { '--accent': color } as CSSProperties;
}

export default function CreateNewsModal({ onClose }: CreateNewsModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const nextChangeKey = useRef(initialChanges.length + 1);

    const [title, setTitle] = useState('');
    const [version, setVersion] = useState('v3.1.0');
    const [accentId, setAccentId] = useState<AccentId>('release');
    const [iconId, setIconId] = useState<IconId>('rocket');
    const [intro, setIntro] = useState('');
    const [changes, setChanges] = useState<DraftChange[]>(initialChanges);
    const [noteEnabled, setNoteEnabled] = useState(false);
    const [note, setNote] = useState('');
    const [pinned, setPinned] = useState(true);

    const accent = accentColors.find(color => color.id === accentId) ?? accentColors[0];
    const PreviewIcon = (cardIcons.find(item => item.id === iconId) ?? cardIcons[0]).icon;
    const previewChanges = changes.filter(change => change.title.trim() || change.description.trim());

    useEffect(() => {
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        titleRef.current?.focus();

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
            if (event.key !== 'Tab' || !dialogRef.current) return;
            const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
                'button:not(:disabled), input:not(:disabled), textarea:not(:disabled)'
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

    function addChange() {
        if (changes.length >= MAX_CHANGES) return;
        const key = nextChangeKey.current++;
        setChanges(prev => [...prev, { key, title: '', description: '' }]);
    }

    function updateChange(key: number, patch: Partial<DraftChange>) {
        setChanges(prev => prev.map(change => (change.key === key ? { ...change, ...patch } : change)));
    }

    function removeChange(key: number) {
        setChanges(prev => prev.filter(change => change.key !== key));
    }

    return createPortal(
        <div
            className="news-modal-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                className="news-modal"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="news-modal-title"
            >
                <header className="news-modal-header">
                    <span className="news-modal-header-icon" aria-hidden="true">
                        <LayoutList size={22} />
                    </span>
                    <div className="news-modal-heading">
                        <h2 id="news-modal-title">Конструктор оновлень</h2>
                        <p>Створіть структурований пост з прев'ю в реальному часі</p>
                    </div>
                    <button type="button" className="news-modal-close" onClick={onClose} aria-label="Закрити">
                        <X size={19} />
                    </button>
                </header>

                <div className="news-modal-content">
                    <div className="news-modal-editor">
                        <div className="news-modal-fields">
                            <div className="news-modal-row">
                                <label className="news-modal-field">
                                    <span className="news-modal-label">Заголовок релізу *</span>
                                    <input
                                        ref={titleRef}
                                        className="news-modal-input"
                                        placeholder="Наприклад: Інтерактивний розклад 2.0"
                                        maxLength={255}
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label className="news-modal-field">
                                    <span className="news-modal-label">Версія / тег *</span>
                                    <input
                                        className="news-modal-input news-modal-input--version"
                                        placeholder="v1.0.0"
                                        maxLength={32}
                                        required
                                        value={version}
                                        onChange={(e) => setVersion(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div className="news-modal-pickers">
                                <fieldset className="news-modal-picker">
                                    <legend className="news-modal-label">Колір акценту</legend>
                                    <div className="news-modal-options">
                                        {accentColors.map(color => (
                                            <button
                                                key={color.id}
                                                type="button"
                                                className="news-modal-color"
                                                style={accentStyle(color.value)}
                                                aria-pressed={color.id === accentId}
                                                onClick={() => setAccentId(color.id)}
                                            >
                                                <span className="news-modal-color-dot" aria-hidden="true" />
                                                {color.label}
                                            </button>
                                        ))}
                                    </div>
                                </fieldset>

                                <fieldset className="news-modal-picker" style={accentStyle(accent.value)}>
                                    <legend className="news-modal-label">Іконка картки</legend>
                                    <div className="news-modal-options">
                                        {cardIcons.map(({ id, label, icon: Icon }) => (
                                            <button
                                                key={id}
                                                type="button"
                                                className="news-modal-icon"
                                                aria-label={label}
                                                title={label}
                                                aria-pressed={id === iconId}
                                                onClick={() => setIconId(id)}
                                            >
                                                <Icon size={18} aria-hidden="true" />
                                            </button>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>

                            <label className="news-modal-field">
                                <span className="news-modal-label">Вступний опис *</span>
                                <textarea
                                    className="news-modal-input news-modal-textarea"
                                    placeholder="Коротко розкажіть, що нового з'явилося на платформі..."
                                    rows={2}
                                    required
                                    value={intro}
                                    onChange={(e) => setIntro(e.target.value)}
                                />
                            </label>

                            <section className="news-modal-box" aria-labelledby="news-modal-changes-title">
                                <div className="news-modal-box-heading">
                                    <h3 id="news-modal-changes-title" className="news-modal-box-title">
                                        <ListChecks size={16} aria-hidden="true" />
                                        Список змін
                                    </h3>
                                    <button
                                        type="button"
                                        className="news-modal-add"
                                        onClick={addChange}
                                        disabled={changes.length >= MAX_CHANGES}
                                    >
                                        <Plus size={16} aria-hidden="true" />
                                        Додати пункт
                                    </button>
                                </div>

                                {changes.length === 0 && (
                                    <p className="news-modal-empty">Поки що немає жодного пункту</p>
                                )}

                                {changes.map((change, index) => (
                                    <div className="news-modal-change" key={change.key}>
                                        <div className="news-modal-change-fields">
                                            <input
                                                className="news-modal-change-title"
                                                aria-label={`Назва пункту ${index + 1}`}
                                                placeholder="Назва зміни"
                                                maxLength={255}
                                                value={change.title}
                                                onChange={(e) => updateChange(change.key, { title: e.target.value })}
                                            />
                                            <input
                                                className="news-modal-change-description"
                                                aria-label={`Опис пункту ${index + 1}`}
                                                placeholder="Короткий опис зміни"
                                                value={change.description}
                                                onChange={(e) => updateChange(change.key, { description: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="news-modal-remove"
                                            onClick={() => removeChange(change.key)}
                                            aria-label={`Видалити пункт ${index + 1}`}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </section>

                            <section className="news-modal-box">
                                <div className="news-modal-box-heading">
                                    <h3 className="news-modal-box-title news-modal-box-title--note">
                                        <Info size={16} aria-hidden="true" />
                                        Виділена примітка (опціонально)
                                    </h3>
                                    <label className="news-modal-toggle">
                                        <input
                                            type="checkbox"
                                            checked={noteEnabled}
                                            onChange={(e) => setNoteEnabled(e.target.checked)}
                                        />
                                        Увімкнути
                                    </label>
                                </div>

                                {noteEnabled && (
                                    <textarea
                                        className="news-modal-input news-modal-textarea news-modal-note-input"
                                        aria-label="Текст виділеної примітки"
                                        placeholder="Важлива інформація, на яку варто звернути увагу..."
                                        rows={2}
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                )}
                            </section>
                        </div>

                        <footer className="news-modal-footer">
                            <label className="news-modal-toggle news-modal-toggle--pin">
                                <input
                                    type="checkbox"
                                    checked={pinned}
                                    onChange={(e) => setPinned(e.target.checked)}
                                />
                                Закріпити вгорі стрічки
                            </label>
                            <div className="news-modal-actions">
                                <button type="button" className="news-modal-cancel" onClick={onClose}>
                                    Скасувати
                                </button>
                                {/* Публікацію ще не підключено: кнопка навмисно без обробника */}
                                <button type="button" className="news-modal-publish">
                                    <Send size={17} aria-hidden="true" />
                                    Опублікувати
                                </button>
                            </div>
                        </footer>
                    </div>

                    <aside
                        className="news-modal-preview"
                        style={accentStyle(accent.value)}
                        aria-labelledby="news-modal-preview-title"
                    >
                        <div className="news-modal-preview-heading">
                            <h3 id="news-modal-preview-title">
                                <Eye size={15} aria-hidden="true" />
                                Попередній перегляд
                            </h3>
                            <span>Живе оновлення</span>
                        </div>

                        <article className="news-preview-card">
                            <header className="news-preview-header">
                                <span className="news-preview-icon" aria-hidden="true">
                                    <PreviewIcon size={21} />
                                </span>
                                <div className="news-preview-heading">
                                    <h4>{title.trim() || 'Заголовок вашого оновлення'}</h4>
                                    {pinned && (
                                        <span className="news-preview-pinned">
                                            <Pin size={10} aria-hidden="true" />
                                            Закріплено
                                        </span>
                                    )}
                                    {version.trim() && (
                                        <span className="news-preview-version">{version.trim()}</span>
                                    )}
                                </div>
                            </header>

                            <span className="news-preview-date">Щойно</span>

                            <p className="news-preview-intro">
                                {intro.trim() || 'Тут відображатиметься основний текст вашої новини для студентів...'}
                            </p>

                            {previewChanges.length > 0 && (
                                <ul className="news-preview-changes">
                                    {previewChanges.map(change => (
                                        <li key={change.key}>
                                            <Check size={16} aria-hidden="true" />
                                            <div>
                                                {change.title.trim() && <strong>{change.title}</strong>}
                                                {change.description.trim() && <p>{change.description}</p>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {noteEnabled && note.trim() && (
                                <div className="news-preview-note">
                                    <Info size={16} aria-hidden="true" />
                                    <p>{note}</p>
                                </div>
                            )}
                        </article>
                    </aside>
                </div>
            </div>
        </div>,
        document.body
    );
}
