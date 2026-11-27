import { getStoredUser } from '../auth/authStorage';
import { DEFAULT_MAX_FLIPS } from '../data/flashcards';
import type { FlashDeck, FlashcardCategory } from '../data/flashcards';

interface FlashCardDto {
    id: number;
    frontText: string;
    frontSubText: string | null;
    answer: string;
    detail: string | null;
}

interface DeckDto {
    id: number;
    authorId: number;
    author: string;
    title: string;
    topic: string;
    maxFlips: number;
    cards: FlashCardDto[];
}

interface CardCheckResultDto {
    cardId: number;
    correct: boolean;
    expectedAnswer: string;
}

interface CheckDeckResponseDto {
    totalCount: number;
    correctCount: number;
    percentage: number;
    results: CardCheckResultDto[];
}

export interface CreateDeckPayload {
    title: string;
    category: FlashcardCategory;
    maxFlips?: number;
    cards: {
        term: string;
        translation: string;
        transcription?: string;
        example?: string;
    }[];
}

export interface CheckDeckResult {
    totalCount: number;
    correctCount: number;
    percentage: number;
    results: Record<number, { correct: boolean; expectedAnswer: string }>;
}

const CONNECTION_ERROR = 'Немає зв\'язку із сервером. Спробуйте ще раз';

function toCategory(topic: string): FlashcardCategory {
    return topic === 'language' || topic === 'logic' ? topic : 'other';
}

function mapDeck(dto: DeckDto, currentUserId: number | undefined): FlashDeck {
    const cards = dto.cards ?? [];
    return {
        id: dto.id,
        title: dto.title,
        category: toCategory(dto.topic),
        description: `Автор: ${dto.author} · ${cards.length} карток.`,
        owned: currentUserId !== undefined && dto.authorId === currentUserId,
        maxFlips: dto.maxFlips > 0 ? dto.maxFlips : DEFAULT_MAX_FLIPS,
        cards: cards.map(card => ({
            id: card.id,
            term: card.frontText,
            translation: card.answer,
            transcription: card.frontSubText || undefined,
            example: card.detail || undefined,
        })),
    };
}

async function request(url: string, init?: RequestInit): Promise<Response> {
    try {
        return await fetch(url, init);
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') throw error;
        throw new Error(CONNECTION_ERROR);
    }
}

export async function getDecks(signal?: AbortSignal): Promise<FlashDeck[]> {
    const response = await request('/api/flashcard', { signal });

    if (!response.ok) {
        throw new Error(`Не вдалося завантажити набори (${response.status})`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Некоректний формат списку наборів');
    }

    const currentUserId = getStoredUser()?.id;
    return (data as DeckDto[]).map(deck => mapDeck(deck, currentUserId));
}

export async function createDeck(payload: CreateDeckPayload): Promise<FlashDeck> {
    const userId = getStoredUser()?.id;

    if (userId === undefined) {
        throw new Error('Потрібно увійти в акаунт, щоб створити набір');
    }

    const response = await request(`/api/flashcard?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: payload.title,
            topic: payload.category,
            maxFlips: payload.maxFlips ?? DEFAULT_MAX_FLIPS,
            cards: payload.cards.map(card => ({
                frontText: card.term,
                frontSubText: card.transcription ?? null,
                answer: card.translation,
                detail: card.example ?? null,
            })),
        }),
    });

    if (!response.ok) {
        throw new Error(
            response.status === 400
                ? 'Перевірте заповнення обов\'язкових полів'
                : `Не вдалося створити набір (${response.status})`
        );
    }

    return mapDeck((await response.json()) as DeckDto, userId);
}

export async function checkDeck(
    deckId: number,
    answers: { cardId: number; userAnswer: string }[]
): Promise<CheckDeckResult> {
    const response = await request(`/api/flashcard/${deckId}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
        throw new Error(`Не вдалося перевірити відповіді (${response.status})`);
    }

    const data = (await response.json()) as CheckDeckResponseDto;

    return {
        totalCount: data.totalCount,
        correctCount: data.correctCount,
        percentage: data.percentage,
        results: Object.fromEntries(
            data.results.map(r => [r.cardId, { correct: r.correct, expectedAnswer: r.expectedAnswer }])
        ),
    };
}
