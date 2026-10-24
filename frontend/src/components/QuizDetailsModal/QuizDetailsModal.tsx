import type { Quiz } from '../../types/quiz';
import Modal from '../Modal/Modal';
import { icons } from '../icons';
import './QuizDetailsModal.css';

interface QuizDetailsModalProps {
  quiz: Quiz;
  onClose: () => void;
  onJoin?: (quiz: Quiz) => void;
}

export default function QuizDetailsModal({ quiz, onClose, onJoin }: QuizDetailsModalProps) {
  return (
    <Modal onClose={onClose} width={380}>
      <div className="quiz-details">
        <span className={`quiz-details__icon quiz-details__icon--${quiz.color}`}>
          <img src={icons[quiz.icon]} alt="" width={22} height={22} />
        </span>

        <span className="quiz-details__tag">{quiz.category}</span>
        <h2 className="quiz-details__title">{quiz.title}</h2>

        <ul className="quiz-details__meta">
          <li>
            <img src={icons.clipboard} alt="" width={14} height={14} />
            {quiz.questionsCount} питань
          </li>
          <li>
            <img src={icons.clock} alt="" width={14} height={14} />
            ~{quiz.durationMinutes} хв
          </li>
          <li>
            <img src={icons.users} alt="" width={14} height={14} />
            {quiz.participants} учасників
          </li>
        </ul>

        <p className="quiz-details__description">{quiz.description}</p>

        <button
          type="button"
          className="quiz-details__join"
          onClick={() => onJoin?.(quiz)}
        >
          <img src={icons.playCircle} alt="" width={18} height={18} />
          Приєднатися
        </button>
      </div>
    </Modal>
  );
}
