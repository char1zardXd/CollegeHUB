import { useCallback, useState } from 'react';
import type { NewQuizPayload, Quiz } from '../../types/quiz';
import { quizzes as initialQuizzes } from '../../data/quizzes';
import QuizCard from '../../components/QuizCard/QuizCard';
import QuizDetailsModal from '../../components/QuizDetailsModal/QuizDetailsModal';
import CreateQuizModal from '../../components/CreateQuizModal/CreateQuizModal';
import './QuizzesPage.css';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [selected, setSelected] = useState<Quiz | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const closeDetails = useCallback(() => setSelected(null), []);
  const closeCreate = useCallback(() => setIsCreateOpen(false), []);

  const handleCreate = (payload: NewQuizPayload) => {
    // TODO: тут буде POST /api/quizzes — зараз лише додаємо в локальний стан
    const newQuiz: Quiz = {
      id: Date.now(),
      title: payload.title,
      category: payload.category,
      description: payload.description,
      questionsCount: payload.questions.length,
      durationMinutes: payload.durationMinutes,
      participants: '0',
      color: payload.color,
      icon: 'compass',
    };
    setQuizzes((prev) => [newQuiz, ...prev]);
    setIsCreateOpen(false);
  };

  return (
    <div className="quizzes-page">
      <div className="quizzes-page__head">
        <button
          type="button"
          className="quizzes-page__create"
          onClick={() => setIsCreateOpen(true)}
        >
          + Створити тест
        </button>
      </div>

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onClick={setSelected} />
        ))}
      </div>

      {selected && <QuizDetailsModal quiz={selected} onClose={closeDetails} />}
      {isCreateOpen && <CreateQuizModal onClose={closeCreate} onSubmit={handleCreate} />}
    </div>
  );
}