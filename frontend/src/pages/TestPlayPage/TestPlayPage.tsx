
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bookmark, Check } from 'lucide-react';

import {
    getTestForPlay,
    submitTest,
    type PlayTest
} from '../../api/testApi';

import './TestPlayPage.css';

export default function TestPlayPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [test, setTest] = useState<PlayTest | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [marked, setMarked] = useState<number[]>([]);
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();

        setLoading(true);
        setError(null);
        setTest(null);
        setCurrentIndex(0);
        setAnswers({});
        setMarked([]);

        getTestForPlay(id, controller.signal)
            .then(setTest)
            .catch((err: unknown) => {
                if (controller.signal.aborted) return;

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Помилка завантаження'
                );
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [id]);

    function selectAnswer(questionId: number, optionId: number) {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    }

    function toggleMarked(questionId: number) {
        setMarked(prev =>
            prev.includes(questionId)
                ? prev.filter(value => value !== questionId)
                : [...prev, questionId]
        );
    }


    async function finishTest() {
        if (!id || !test || submitting) return;

        setSubmitting(true);
        setError(null);

        try {
            const result = await submitTest(
                id,
                answers,
                test.questions.length
            );

            navigate(`/tests/${id}/result`, {
                state: {
                    result,
                    test,
                    answers
                }
            });

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Помилка надсилання відповідей'
            );
        } finally {
            setSubmitting(false);
        }
    }


    if (loading) {
        return (
            <div className="test-play-message">
                Завантаження тесту...
            </div>
        );
    }

    if (!test || !test.questions.length) {
        return (
            <div className="test-play-message">
                <h2>{error ?? 'У цьому тесті поки немає питань'}</h2>
                <button onClick={() => navigate('/tests')}>
                    Повернутися до тестів
                </button>
            </div>
        );
    }

    const question = test.questions[currentIndex];
    const isLast = currentIndex === test.questions.length - 1;
    const isMarked = marked.includes(question.id);
    const selectedId = answers[question.id];

    return (
        <div className="test-play-screen">
            <header className="test-play-header">
                <h1>{test.title}</h1>
                <span>
                    Питання {currentIndex + 1} з {test.questions.length}
                </span>
            </header>

            <main className="test-play-content">
                <div className="test-play-meta">
                    <span className="test-play-tag">
                        {test.tag || 'Тестування'}
                    </span>

                    <button
                        type="button"
                        className={`test-play-mark ${isMarked ? 'active' : ''}`}
                        onClick={() => toggleMarked(question.id)}
                        aria-pressed={isMarked}
                    >
                        <Bookmark size={15} />
                        {isMarked
                            ? 'Позначено'
                            : 'Позначити для перевірки'}
                    </button>
                </div>

                <section className="test-play-question">
                    <h2>{question.text}</h2>
                </section>

                <div
                    className="test-play-options"
                    role="radiogroup"
                    aria-label="Варіанти відповіді"
                >
                    {question.options.map((option, index) => {
                        const selected = selectedId === option.id;
                        const letter = String.fromCharCode(65 + index);

                        return (
                            <label
                                key={option.id}
                                className={`test-play-option ${
                                    selected ? 'selected' : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={option.id}
                                    checked={selected}
                                    onChange={() =>
                                        selectAnswer(question.id, option.id)
                                    }
                                />

                                <span className="test-play-letter">
                                    {letter}
                                </span>

                                <span className="test-play-option-text">
                                    {option.text}
                                </span>

                                <span className="test-play-radio">
                                    {selected && <Check size={15} />}
                                </span>
                            </label>
                        );
                    })}
                </div>

                {error && (
                    <p className="test-play-error" role="alert">
                        {error}
                    </p>
                )}
            </main>

            <footer className="test-play-footer">
                <button
                    type="button"
                    className="test-play-back"
                    disabled={currentIndex === 0 || submitting}
                    onClick={() => setCurrentIndex(prev => prev - 1)}
                >
                    <ArrowLeft size={17} />
                    Назад
                </button>

                {isLast ? (
                    <button
                        type="button"
                        className="test-play-next"
                        disabled={submitting}
                        onClick={finishTest}
                    >
                        {submitting ? 'Збереження...' : 'Завершити тест'}
                        {!submitting && <Check size={17} />}
                    </button>
                ) : (
                    <button
                        type="button"
                        className="test-play-next"
                        onClick={() => setCurrentIndex(prev => prev + 1)}
                    >
                        Далі
                        <ArrowRight size={17} />
                    </button>
                )}
            </footer>
        </div>
    );
}
