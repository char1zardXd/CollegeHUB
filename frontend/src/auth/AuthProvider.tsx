import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { loginRequest, registerRequest } from '../api/authApi';
import type { RegisterPayload } from '../api/authApi';
import { AuthContext } from './AuthContext';
import type { AuthContextValue } from './AuthContext';
import { clearStoredUser, getStoredUser, storeUser } from './authStorage';
import type { AuthUser } from './authStorage';

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

    const login = useCallback(
        async (email: string, password: string, remember: boolean) => {
            const loggedIn = await loginRequest(email, password);
            storeUser(loggedIn, remember);
            setUser(loggedIn);
        },
        []
    );

    const register = useCallback(
        async (payload: RegisterPayload, remember: boolean) => {
            await registerRequest(payload);
            await login(payload.email, payload.password, remember);
        },
        [login]
    );

    const logout = useCallback(() => {
        clearStoredUser();
        setUser(null);
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({ user, login, register, logout }),
        [user, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
