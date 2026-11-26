export type FlashcardCategory = 'language' | 'logic' | 'other';

export interface Flashcards {
    id: number;
    term: string;
    translation: string;
    transcription?: string;
    partOfSpeech?: string;
    example?: string;
}

export interface FlashDeck {
    id: number;
    title: string;
    category: FlashcardCategory;
    description: string;
    owned: boolean;
    cards: Flashcards[];
}

export const flashcardCategories: { value: FlashcardCategory; label: string }[] = [
    { value: 'language', label: 'Мова' },
    { value: 'logic', label: 'Логіка та наука' },
    { value: 'other', label: 'Інше' },
];

// Тестовий набір, збережений локально (без запитів до бекенду).
export const flashDecks: FlashDeck[] = [
    {
        id: 1,
        title: 'Англійська IT & Бізнес',
        category: 'language',
        description: 'Базові терміни для роботи в IT та бізнес-комунікації.',
        owned: true,
        cards: [
            {
                id: 1,
                term: 'Resilience',
                translation: 'Стійкість',
                transcription: 'rɪˈzɪliəns',
                partOfSpeech: 'Іменник',
                example: 'System resilience is critical during high traffic loads.',
            },
            {
                id: 2,
                term: 'Scalability',
                translation: 'Масштабованість',
                transcription: 'ˌskeɪləˈbɪləti',
                partOfSpeech: 'Іменник',
                example: 'Scalability lets the product grow with the number of users.',
            },
            {
                id: 3,
                term: 'Ambiguous',
                translation: 'Неоднозначний',
                transcription: 'æmˈbɪɡjuəs',
                partOfSpeech: 'Прикметник',
                example: 'The requirements were ambiguous, so we asked the client.',
            },
            {
                id: 4,
                term: 'Mitigate',
                translation: 'Пом’якшувати / Зменшувати',
                transcription: 'ˈmɪtɪɡeɪt',
                partOfSpeech: 'Дієслово',
                example: 'We added caching to mitigate the risk of downtime.',
            },
            {
                id: 5,
                term: 'Bottleneck',
                translation: 'Вузьке місце',
                transcription: 'ˈbɒtlnek',
                partOfSpeech: 'Іменник',
                example: 'The database turned out to be the main bottleneck.',
            },
        ],
    },
];
