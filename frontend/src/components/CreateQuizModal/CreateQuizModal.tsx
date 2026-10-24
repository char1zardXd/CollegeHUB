import { useState, type FormEvent } from 'react';
import type { NewQuestion, NewQuizPayload, QuizColor } from '../../types/quiz';
import { categories, cardColors } from '../../data/quizzes';
import Modal from '../Modal/Modal';
import { icons } from '../icons';
import './CreateQuizModal.css';

interface CreateQuizModalProps {
  onClose: () => void;
  onSubmit: (payload: NewQuizPayload) => void;
}

const createQuestion = (id: number): NewQuestion => ({
  id,
  text: '',
  answers: ['', '', '', ''],
  correctIndex: 0,
});

export default function CreateQuizModal({ onClose, onSubmit }: CreateQuizModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [duration, setDuration] = useState(15);
  const [color, setColor] = useState<QuizColor>('purple');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<NewQuestion[]>([createQuestion(1)]);

  const addQuestion = () =>
    setQuestions((prev) => [...prev, createQuestion(prev[prev.length - 1].id + 1)]);

  const updateQuestion = (id: number, patch: Partial<NewQuestion>) =>
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));

  const updateAnswer = (id: number, index: number, value: string) =>
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, answers: q.answers.map((a, i) => (i === index ? value : a)) }
          : q,
      ),
    );

  const removeQuestion = (id: number) =>
    setQuestions((prev) => (prev.length > 1 ? prev.filter((q) => q.id !== id) : prev));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, category, durationMinutes: duration, color, description, questions });
  };

  return (
    <Modal onClose={onClose} width={480}>
      <form className="create-quiz" onSubmit={handleSubmit}>
        <div className="create-quiz__head">
          <span className="create-quiz__head-icon">
            <img src={icons.clipboard} alt="" width={20} height={20} />
          </span>
          <div>
            <h2 className="create-quiz__title">Створити новий тест</h2>
            <p className="create-quiz__subtitle">Конструктор опитування для вашої групи</p>
          </div>
        </div>

        <div className="create-quiz__body">
          <div className="create-quiz__grid">
            <label className="field">
              <span className="field__label">Назва тесту</span>
              <input
                className="field__control"
                type="text"
                placeholder="напр., Фінал з Веб-розробки"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label className="field">
              <span className="field__label">Категорія</span>
              <span className="field__select">
                <select
                  className="field__control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <img src={icons.chevronDown} alt="" width={14} height={14} />
              </span>
            </label>

            <label className="field">
              <span className="field__label">Час на виконання (хвилин)</span>
              <input
                className="field__control"
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </label>

            <label className="field">
              <span className="field__label">Колір картки</span>
              <span className="field__select">
                <select
                  className="field__control"
                  value={color}
                  onChange={(e) => setColor(e.target.value as QuizColor)}
                >
                  {cardColors.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <img src={icons.chevronDown} alt="" width={14} height={14} />
              </span>
            </label>
          </div>

          <label className="field field--full">
            <span className="field__label">Короткий опис</span>
            <textarea
              className="field__control field__control--textarea"
              placeholder="Поясніть, що саме перевіряє цей тест..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>

          <div className="create-quiz__questions-head">
            <h3>Питання тесту</h3>
            <button type="button" className="create-quiz__add" onClick={addQuestion}>
              + Додати ще питання
            </button>
          </div>

          {questions.map((q, qi) => (
            <div className="question" key={q.id}>
              <div className="question__head">
                <span className="question__num">Питання #{qi + 1}</span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    className="question__remove"
                    onClick={() => removeQuestion(q.id)}
                  >
                    Видалити
                  </button>
                )}
              </div>

              <input
                className="field__control field__control--white"
                type="text"
                placeholder="Текст питання..."
                value={q.text}
                onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
              />

              <div className="question__answers">
                {q.answers.map((a, ai) => (
                  <label className="answer" key={ai}>
                    <input
                      type="radio"
                      name={`correct-${q.id}`}
                      checked={q.correctIndex === ai}
                      onChange={() => updateQuestion(q.id, { correctIndex: ai })}
                      title="Правильна відповідь"
                    />
                    <input
                      className="field__control field__control--white"
                      type="text"
                      placeholder={`Відповідь ${ai + 1}`}
                      value={a}
                      onChange={(e) => updateAnswer(q.id, ai, e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="create-quiz__footer">
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Скасувати
          </button>
          <button type="submit" className="btn btn--primary">
            Зберегти та опублікувати
          </button>
        </div>
      </form>
    </Modal>
  );
}
