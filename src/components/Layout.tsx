import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Spinner from '@/components/Spinner'
import { Suspense, type FC } from 'react'
import { Outlet } from 'react-router'

const Layout: FC = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="grow">
                <section>
                    <Suspense fallback={<Spinner />}>
                        <Outlet />
                    </Suspense>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Layout
