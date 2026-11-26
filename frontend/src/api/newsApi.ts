import { getStoredUser } from '../auth/authStorage';

export interface NewsChange {
    title: string;
    description: string;
}

export interface NewsPost {
    id: number;
    title: string;
    version: string;
    accentColor: string | null;
    icon: string | null;
    createdAt: string;
    authorName: string;
    changes: NewsChange[];
    pinned: boolean;
    introText: string;
    highlightedNote: string | null;
}

export interface CreateNewsPayload {
    title: string;
    version: string;
    accentColor: string;
    icon: string;
    introText: string;
    highlightedNote: string | null;
    pinned: boolean;
    changes: NewsChange[];
}

export const NEWS_CHANGED_EVENT = 'collegehub:news-changed';

export async function getNews(signal?: AbortSignal): Promise<NewsPost[]> {
    const response = await fetch('/api/news', { signal });

    if (!response.ok) {
        throw new Error(`Не вдалося завантажити новини (${response.status})`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
        throw new Error('Некоректний формат списку новин');
    }

    return (data as NewsPost[]).map(post => ({
        ...post,
        changes: post.changes ?? []
    }));
}

export async function createNews(payload: CreateNewsPayload): Promise<NewsPost> {
    const userId = getStoredUser()?.id;

    if (!userId) {
        throw new Error('Потрібно увійти в акаунт, щоб опублікувати новину');
    }

    let response: Response;

    try {
        response = await fetch(`/api/news?userId=${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch {
        throw new Error('Немає зв\'язку із сервером. Спробуйте ще раз');
    }

    if (!response.ok) {
        throw new Error(
            response.status === 400
                ? 'Перевірте заповнення обов\'язкових полів'
                : `Не вдалося опублікувати новину (${response.status})`
        );
    }

    const created = (await response.json()) as NewsPost;

    window.dispatchEvent(new Event(NEWS_CHANGED_EVENT));

    return created;
}
