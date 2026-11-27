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
    maxFlips: number;
    cards: Flashcards[];
}

export const DEFAULT_MAX_FLIPS = 2;

export const flashcardCategories: { value: FlashcardCategory; label: string }[] = [
    { value: 'language', label: 'Мова' },
    { value: 'logic', label: 'Логіка та наука' },
    { value: 'other', label: 'Інше' },
];
