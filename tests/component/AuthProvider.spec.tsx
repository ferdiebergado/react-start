import AuthProvider from '@/components/AuthProvider'
import { useAuth, type User } from '@/lib/auth'
import { describe, expect, it } from 'vitest'
import { render, renderHook } from 'vitest-browser-react'

const mockUser: User = { name: 'john', email: 'abc@example.com' }

function AuthConsumer() {
    const { user, login, logout } = useAuth()

    const handleLogin = () => {
        login(mockUser)
    }

    return (
        <div>
            <div data-testid="user">
                {user ? `${user.name} (${user.email})` : 'no user'}
            </div>
            <button type="button" data-testid="login" onClick={handleLogin}>
                login
            </button>
            <button type="button" data-testid="logout" onClick={logout}>
                logout
            </button>
        </div>
    )
}

describe('AuthProvider', () => {
    it('provides default state', async () => {
        const { getByTestId } = render(
            <AuthProvider>
                <AuthConsumer />
            </AuthProvider>
        )

        await expect.element(getByTestId('user')).toHaveTextContent('no user')
    })

    it('can login and logout', async () => {
        const { getByTestId } = render(
            <AuthProvider>
                <AuthConsumer />
            </AuthProvider>
        )

        const loginBtn = getByTestId('login')
        await loginBtn.click()
        await expect
            .element(getByTestId('user'))
            .toHaveTextContent(mockUser.name)

        const logoutBtn = getByTestId('logout')
        await logoutBtn.click()
        await expect.element(getByTestId('user')).toHaveTextContent('no user')
    })
})

describe('useAuth', () => {
    it('throws if used outside AuthProvider', () => {
        expect(() => renderHook(() => useAuth())).toThrowError(
            'useAuth must be used within an AuthProvider'
        )
    })

    it('provides default state', () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        })

        expect(result.current.user).toBeUndefined()
    })

    it('logs in and logs out a user', () => {
        const { result, act } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        })

        const mockUser = { name: 'Alice', email: 'alice@example.com' }

        act(() => {
            result.current.login(mockUser)
        })
        expect(result.current.user).toEqual(mockUser)

        act(() => {
            result.current.logout()
        })
        expect(result.current.user).toBeUndefined()
    })
})
