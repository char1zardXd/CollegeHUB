import type { AuthUser } from '../auth/authStorage';

export interface RegisterPayload {
    email: string;
    password: string;
    fullName: string;
    group: string;
}
async function readErrorMessage(response: Response, fallback: string): Promise<string> {
    try {
        const data: unknown = await response.json();
        if (
            typeof data === 'object' &&
            data !== null &&
            typeof (data as { message?: unknown }).message === 'string'
        ) {
            return (data as { message: string }).message;
        }
    } catch {
        // тіло відповіді не JSON
    }
    return fallback;
}
async function postJson(url: string, body: unknown): Promise<Response> {
    try {
        return await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    } catch {
        throw new Error('Не вдалося зʼєднатися із сервером. Спробуйте пізніше.');
    }
}

export async function loginRequest(email: string, password: string): Promise<AuthUser> {
    const response = await postJson('/api/auth/login', { email, password });

    if (!response.ok) {
        throw new Error(
            await readErrorMessage(response, `Не вдалося увійти (${response.status})`)
        );
    }

    return response.json() as Promise<AuthUser>;
}

export async function registerRequest(payload: RegisterPayload): Promise<void> {
    const response = await postJson('/api/auth/register', payload);

    if (!response.ok) {
        throw new Error(
            await readErrorMessage(response, `Не вдалося зареєструватися (${response.status})`)
        );
    }
}
