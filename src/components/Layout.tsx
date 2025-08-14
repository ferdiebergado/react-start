import { type FC } from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import ThemeProvider from './ThemeProvider'

const Layout: FC = () => {
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

export default Layout
