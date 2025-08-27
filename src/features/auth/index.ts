import { createContext, use } from 'react'

export interface User {
    name: string
    email: string
}

export interface AuthState {
    user?: User
    login: (user: User) => void
    logout: () => void
}

export const AuthContext = createContext<AuthState | undefined>(undefined)

export function useAuth() {
    const context = use(AuthContext)

    if (context === undefined)
        throw new Error('useAuth must be used within an AuthProvider')

    return context
}
