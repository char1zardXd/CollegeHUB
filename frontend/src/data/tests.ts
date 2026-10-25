export type TestIcon = 'compass' | 'briefcase' | 'shield' | 'lock' | 'users' | 'brain';
export type TestColor = 'mint' | 'purple' | 'pink' | 'blue' | 'peach' | 'yellow';

export interface TestPreview {
    id: number;
    category: string;
    title: string;
    description: string;
    icon: TestIcon;
    color: TestColor;
}

export const tests: TestPreview[] = [
    {
        id: 1,
        category: 'Кар’єра',
        title: 'Профорієнтаційний тест',
        description: 'Тест, що діагностує, які професії вам підходять. Створено за підтримки експертів з кар’єрного консультування.',
        icon: 'compass',
        color: 'mint',
    },
    {
        id: 2,
        category: 'Розвиток',
        title: 'Тест для пошуку професії',
        description: 'Пройдіть тест, щоб ми допомогли вам знайти нову роботу або професію. Містить питання про ваші навички та інтереси.',
        icon: 'briefcase',
        color: 'purple',
    },
    {
        id: 3,
        category: 'Право',
        title: 'Викривання корупції: від повідомлення',
        description: 'Тест допоможе перевірити знання законодавства України про запобігання корупції: хто такий викривач.',
        icon: 'shield',
        color: 'pink',
    },
    {
        id: 4,
        category: 'Кібербезпека',
        title: 'Квест «Гігієна й Мережа»',
        description: 'Перевірте свої знання з цифрової безпеки та навчіться захищати себе в мережі.',
        icon: 'lock',
        color: 'blue',
    },
    {
        id: 5,
        category: 'Soft Skills',
        title: 'Основи лідерства в команді',
        description: 'Дізнайтеся більше про ефективну комунікацію, співпрацю та лідерство в команді.',
        icon: 'users',
        color: 'peach',
    },
    {
        id: 6,
        category: 'Логіка',
        title: 'Тест: Критичне мислення',
        description: 'Перевірте, як ви аналізуєте інформацію, оцінюєте аргументи та ухвалюєте рішення.',
        icon: 'brain',
        color: 'yellow',
    },
    {
        id: 7,
        category: 'Логіка',
        title: 'Тест: Критичне мислення',
        description: 'Перевірте, як ви аналізуєте інформацію, оцінюєте аргументи та ухвалюєте рішення.',
        icon: 'brain',
        color: 'yellow',
    },
];
