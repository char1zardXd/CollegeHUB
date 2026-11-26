export interface AuthUser {
    id: number;
    email: string;
    fullName: string;
    role: string;
    group: string | null;
    token: string;
}

const STORAGE_KEY = 'collegehub.auth';

function isAuthUser(value: unknown): value is AuthUser {
    if (typeof value !== 'object' || value === null) return false;
    const user = value as Record<string, unknown>;
    return typeof user.id === 'number'
        && typeof user.email === 'string'
        && typeof user.fullName === 'string';
}

function readFrom(storage: Storage): AuthUser | null {
    try {
        const raw = storage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed: unknown = JSON.parse(raw);
        return isAuthUser(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

export function getStoredUser(): AuthUser | null {
    return readFrom(sessionStorage) ?? readFrom(localStorage);
}

export function storeUser(user: AuthUser, remember: boolean): void {
    clearStoredUser();
    (remember ? localStorage : sessionStorage).setItem(STORAGE_KEY, JSON.stringify(user));

}

export function clearStoredUser(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
}
