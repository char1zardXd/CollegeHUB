
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    BookOpen,
    Trophy,
    RotateCcw,
    ArrowRight,
    ClipboardList
} from 'lucide-react';

import type {
    PlayTest,
    SubmitTestResult
} from '../../api/testApi';

import './TestResultPage.css';

interface ResultState {
    test: PlayTest;
    result: SubmitTestResult;
    answers: Record<number, number>;
}

export default function TestResultPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const data = location.state as ResultState | null;

    if (!data?.test || !data?.result) {
        return (
            <div className="test-result-empty">
                <h2>Результат недоступний</h2>
                <p>Поверніться до списку тестів.</p>
                <button onClick={() => navigate('/tests')}>
                    Повернутися до тестів
                </button>
            </div>
        );
    }

    const { test, result, answers = {} } = data;

    const percentage = result.percentage;

    const title =
        percentage >= 80
            ? 'Чудовий результат!'
            : percentage >= 50
                ? 'Гарна робота!'
                : 'Тест завершено!';

    function retryTest() {
        navigate(`/tests/${id}/play`);
    }

    return (
        <div className="test-result-page">

            <header className="test-result-header">
                <div className="test-result-brand">
                    <div className="test-result-logo">
                        <BookOpen size={17} />
                    </div>
                    <span>CollegeHUB</span>
                </div>

                <span className="test-result-header-title">
                    {test.title}
                </span>
            </header>

            <main className="test-result-main">

                <section className="test-result-intro">
                    <div className="test-result-trophy">
                        <Trophy size={32} />
                    </div>

                    <span className="test-result-badge">
                        ТЕСТ ЗАВЕРШЕНО
                    </span>

                    <h1>{title}</h1>

                    <p>
                        Ви завершили тест «{test.title}».
                        Перегляньте свої відповіді нижче.
                    </p>
                </section>

                <section className="test-result-stats">

                    <div className="test-result-stat">
                        <strong className="test-result-stat-count">
                            {result.correctAnswers} / {result.totalQuestions}
                        </strong>
                        <span>ПРАВИЛЬНИХ ВІДПОВІДЕЙ</span>
                    </div>

                    <div className="test-result-stat">
                        <strong className="test-result-stat-percent">
                            {percentage}%
                        </strong>
                        <span>УСПІШНІСТЬ</span>
                    </div>

                </section>

                <section className="test-result-questions">
                    {test.questions.map((question, index) => {

                        const selectedId = answers[question.id];

                        const selectedOption = question.options.find(
                            option => option.id === selectedId
                        );

                        return (
                            <article
                                key={question.id}
                                className="test-result-card test-result-card-neutral"
                            >
                                <div className="test-result-card-status">
                                    <ClipboardList size={15} />
                                    <span>Питання {index + 1}</span>
                                </div>

                                <h3>{question.text}</h3>

                                <div className="test-result-card-answer">
                                    <span>Ваша відповідь:</span>

                                    <p>
                                        {selectedOption?.text ??
                                            'Відповідь не обрано'}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </section>

                <footer className="test-result-footer">

                    <button
                        type="button"
                        className="test-result-retry"
                        onClick={retryTest}
                    >
                        <RotateCcw size={17} />
                        Пройти знову
                    </button>

                    <button
                        type="button"
                        className="test-result-return"
                        onClick={() => navigate('/tests')}
                    >
                        Повернутися до навчальної панелі
                        <ArrowRight size={17} />
                    </button>

                </footer>

            </main>
        </div>
    );
}
