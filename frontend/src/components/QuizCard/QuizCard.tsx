import type { Quiz } from '../../types/quiz';
import { icons } from '../icons';
import './QuizCard.css';

interface QuizCardProps {
  quiz: Quiz;
  onClick: (quiz: Quiz) => void;
}

export default function QuizCard({ quiz, onClick }: QuizCardProps) {
  return (
    <button
      type="button"
      className={`quiz-card quiz-card--${quiz.color}`}
      onClick={() => onClick(quiz)}
    >
      <div className="quiz-card__top">
        <span className="quiz-card__category">{quiz.category}</span>
        <span className="quiz-card__icon">
          <img src={icons[quiz.icon]} alt="" width={20} height={20} />
        </span>
      </div>

      <h3 className="quiz-card__title">{quiz.title}</h3>
      <p className="quiz-card__description">{quiz.description}</p>
    </button>
  );
}
