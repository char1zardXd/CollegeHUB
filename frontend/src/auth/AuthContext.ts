import { createContext, useContext } from 'react';
import type { AuthUser } from './authStorage';
import type { RegisterPayload } from '../api/authApi';

export interface AuthContextValue {
    user: AuthUser | null;
    login: (email: string, password: string, remember: boolean) => Promise<void>;
    register: (payload: RegisterPayload, remember: boolean) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useAuth має використовуватися всередині AuthProvider');
    }
    return value;
}
