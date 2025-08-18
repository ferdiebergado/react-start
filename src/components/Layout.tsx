import { type FC } from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'

const Layout: FC = () => {
    return (
        <>
            <Header />
            <main>
                <section>
                    <Outlet />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Layout
