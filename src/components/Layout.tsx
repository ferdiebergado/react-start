import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import ThemeProvider from './ThemeProvider'

export default function Layout() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Header />
            <main>
                <section>
                    <Outlet />
                </section>
            </main>
            <Footer />
        </ThemeProvider>
    )
}
