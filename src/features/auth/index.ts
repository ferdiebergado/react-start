import { createContext, use } from 'react'

export interface Token {
    value: string
    type: string
    expiresIn: number
}

export interface User {
    id: string
    email: string
    token: Token
}

export interface AuthState {
    user?: User
    login: (user: User) => void
    logout: () => void
}

export const AuthContext = createContext<AuthState | undefined>(undefined)

export function useAuth() {
    const context = use(AuthContext)

    if (!context) throw new Error('useAuth must be used within an AuthProvider')

    return context
}
