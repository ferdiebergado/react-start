import { AuthContext, type User } from '@/features/auth'
import type { ContextProviderFactory } from '@/lib/context'
import { useCallback, useMemo, useState, type ReactNode } from 'react'

interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider: ContextProviderFactory<AuthProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<User>()

    const login = useCallback((loggedInUser: User) => {
        setUser(loggedInUser)
    }, [])

    const logout = () => {
        setUser(undefined)
    }

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user, login]
    )

    return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider
