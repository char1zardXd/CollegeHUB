import type { Quiz } from '../types/quiz';

// Тимчасові дані. Коли буде бекенд — замінити на запит до /api/quizzes
export const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'Профорієнтаційний тест',
    category: 'Кар’єра',
    description:
      'Тест, що діагностує, які професії вам підходять. Створено за підтримки експертів з кар’єрного консультування.',
    questionsCount: 45,
    durationMinutes: 30,
    participants: '1.2k',
    color: 'green',
    icon: 'compass',
  },
  {
    id: 2,
    title: 'Тест для пошуку професії',
    category: 'Розвиток',
    description:
      'Пройдіть тест, щоб ми допомогли вам знайти нову роботу або професію. Містить питання про ваші навички та інтереси.',
    questionsCount: 30,
    durationMinutes: 20,
    participants: '860',
    color: 'purple',
    icon: 'briefcase',
  },
  {
    id: 3,
    title: 'Викривання корупції: від повідомлення',
    category: 'Право',
    description:
      'Тест допоможе перевірити знання законодавства України про запобігання корупції: хто такий викривач, як і куди повідомляти.',
    questionsCount: 25,
    durationMinutes: 15,
    participants: '540',
    color: 'pink',
    icon: 'shield',
  },
  {
    id: 4,
    title: 'Квест «Гігієна й Мережа»',
    category: 'Кібербезпека',
    description:
      'Перевірте свої знання з цифрової безпеки та навчіться захищати себе в мережі.',
    questionsCount: 20,
    durationMinutes: 15,
    participants: '720',
    color: 'blue',
    icon: 'lock',
  },
  {
    id: 5,
    title: 'Основи лідерства в команді',
    category: 'Soft Skills',
    description:
      'Дізнайтеся більше про ефективну комунікацію, співпрацю та лідерство в команді.',
    questionsCount: 25,
    durationMinutes: 20,
    participants: '430',
    color: 'orange',
    icon: 'users',
  },
  {
    id: 6,
    title: 'Тест: Критичне мислення',
    category: 'Логіка',
    description:
      'Перевірте, як ви аналізуєте інформацію, оцінюєте аргументи та ухвалюєте рішення.',
    questionsCount: 30,
    durationMinutes: 25,
    participants: '980',
    color: 'yellow',
    icon: 'brain',
  },
];

export const categories = [
  'Програмування',
  'Кар’єра',
  'Розвиток',
  'Право',
  'Кібербезпека',
  'Soft Skills',
  'Логіка',
];

export const cardColors: { value: Quiz['color']; label: string }[] = [
  { value: 'green', label: 'Пастельно-зелений' },
  { value: 'purple', label: 'Пастельно-фіолетовий' },
  { value: 'pink', label: 'Пастельно-рожевий' },
  { value: 'blue', label: 'Пастельно-блакитний' },
  { value: 'orange', label: 'Пастельно-помаранчевий' },
  { value: 'yellow', label: 'Пастельно-жовтий' },
];
