import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { ClipboardList, Trash2, X } from 'lucide-react';

import { createTest } from '../../api/testApi';
import './CreateTestModal.css';

type CreateTestModalProps = {
    onClose: () => void;
    onCreated?: () => void;
};

type DraftQuestion = {
    key: number;
    text: string;
    options: string[];
    correctIndex: number;
};

const OPTIONS_PER_QUESTION = 4;
const MAX_QUESTIONS = 25;

const categories = [
    { value: 'programming', label: 'Програмування' },
    { value: 'career', label: 'Кар\'єра' },
    { value: 'development', label: 'Розвиток' },
    { value: 'law', label: 'Право' },
    { value: 'cybersecurity', label: 'Кібербезпека' },
    { value: 'soft-skills', label: 'Soft Skills' },
    { value: 'logic', label: 'Логіка' },
];

let nextQuestionKey = 1;

function createEmptyQuestion(): DraftQuestion {
    return {
        key: nextQuestionKey++,
        text: '',
        options: Array.from({ length: OPTIONS_PER_QUESTION }, () => ''),
        correctIndex: 0,
    };
}

export default function CreateTestModal({ onClose, onCreated }: CreateTestModalProps) {
    const dialogRef = useRef<HTMLFormElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('programming');
    const [minutes, setMinutes] = useState('15');
    const [color, setColor] = useState('purple');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<DraftQuestion[]>(() => [createEmptyQuestion()]);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    function updateQuestion(key: number, patch: Partial<DraftQuestion>) {
        setQuestions(prev => prev.map(q => (q.key === key ? { ...q, ...patch } : q)));
    }

    function updateOption(key: number, optionIndex: number, value: string) {
        setQuestions(prev => prev.map(q => {
            if (q.key !== key) return q;
            const options = q.options.map((opt, i) => (i === optionIndex ? value : opt));
            return { ...q, options };
        }));
    }

    function addQuestion() {
        if (questions.length >= MAX_QUESTIONS) return;
        setQuestions(prev => [...prev, createEmptyQuestion()]);
    }

    function removeQuestion(key: number) {
        setQuestions(prev => (prev.length > 1 ? prev.filter(q => q.key !== key) : prev));
    }

    function validate(): string | null {
        if (!title.trim()) return 'Вкажіть назву тесту';
        if (!description.trim()) return 'Додайте короткий опис тесту';

        const minutesValue = Number(minutes);
        if (!Number.isFinite(minutesValue) || minutesValue < 1) {
            return 'Час на виконання має бути не менше 1 хвилини';
        }

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.text.trim()) return `Питання #${i + 1}: введіть текст питання`;
            if (q.options.some(opt => !opt.trim())) {
                return `Питання #${i + 1}: заповніть усі ${OPTIONS_PER_QUESTION} варіанти відповіді`;
            }
        }

        return null;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submitting) return;

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setSubmitting(true);

        try {
            await createTest({
                title: title.trim(),
                description: description.trim(),
                tag: categories.find(c => c.value === category)?.label ?? null,
                questions: questions.map(q => ({
                    text: q.text.trim(),
                    options: q.options.map((opt, i) => ({
                        text: opt.trim(),
                        correct: i === q.correctIndex,
                    })),
                })),
            });

            onCreated?.();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не вдалося створити тест');
            setSubmitting(false);
        }
    }

    return createPortal(
        <div
            className="create-test-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <form
                className="create-test-modal"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-test-title"
                onSubmit={handleSubmit}
                noValidate
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
                            <input
                                placeholder="напр., Фінал з Веб-розробки"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label className="create-test-field">
                            <span>КАТЕГОРІЯ</span>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categories.map(c => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </label>
                        <label className="create-test-field">
                            <span>ЧАС НА ВИКОНАННЯ (ХВИЛИН)</span>
                            <input
                                type="number"
                                min="1"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                            />
                        </label>
                        <label className="create-test-field">
                            <span>КОЛІР КАРТКИ</span>
                            <select value={color} onChange={(e) => setColor(e.target.value)}>
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
                            <textarea
                                placeholder="Поясніть, що саме перевіряє цей тест..."
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>

                    <section className="create-test-questions" aria-labelledby="create-test-questions-title">
                        <div className="create-test-questions-heading">
                            <h3 id="create-test-questions-title">Питання тесту</h3>
                            <button
                                type="button"
                                className="create-test-add"
                                onClick={addQuestion}
                                disabled={questions.length >= MAX_QUESTIONS}
                            >
                                + Додати ще питання
                            </button>
                        </div>

                        {questions.map((question, qIndex) => (
                            <div className="create-test-question-card" key={question.key}>
                                <div className="create-test-question-top">
                                    <label className="create-test-question-label" htmlFor={`question-${question.key}`}>
                                        Питання #{qIndex + 1}
                                    </label>
                                    {questions.length > 1 && (
                                        <button
                                            type="button"
                                            className="create-test-remove"
                                            onClick={() => removeQuestion(question.key)}
                                            aria-label={`Видалити питання ${qIndex + 1}`}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <input
                                    id={`question-${question.key}`}
                                    placeholder="Текст питання..."
                                    value={question.text}
                                    onChange={(e) => updateQuestion(question.key, { text: e.target.value })}
                                />
                                <div className="create-test-answer-grid" role="radiogroup" aria-label="Варіанти відповіді">
                                    {question.options.map((option, oIndex) => {
                                        const isCorrect = question.correctIndex === oIndex;
                                        return (
                                            <div className="create-test-answer" key={oIndex}>
                                                <input
                                                    type="radio"
                                                    className="create-test-answer-radio"
                                                    name={`correct-${question.key}`}
                                                    checked={isCorrect}
                                                    onChange={() => updateQuestion(question.key, { correctIndex: oIndex })}
                                                    aria-label={`Позначити варіант ${oIndex + 1} правильним`}
                                                    title="Правильна відповідь"
                                                />
                                                <input
                                                    className={isCorrect ? 'create-test-answer--correct' : undefined}
                                                    aria-label={`Варіант відповіді ${oIndex + 1}`}
                                                    placeholder={`Варіант відповіді ${oIndex + 1}`}
                                                    value={option}
                                                    onChange={(e) => updateOption(question.key, oIndex, e.target.value)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="create-test-hint">Оберіть кружечок біля правильної відповіді</p>
                            </div>
                        ))}
                    </section>
                </div>

                {error && (
                    <p className="create-test-error" role="alert">{error}</p>
                )}

                <footer className="create-test-footer">
                    <button type="button" className="create-test-cancel" onClick={onClose} disabled={submitting}>
                        Скасувати
                    </button>
                    <button type="submit" className="create-test-save" disabled={submitting}>
                        {submitting ? 'Збереження...' : 'Зберегти та опублікувати'}
                    </button>
                </footer>
            </form>
        </div>,
        document.body
    );
}
