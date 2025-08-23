import Layout from '@/components/Layout'
import { lazy, type FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

const Home = lazy(() => import('@/Home'))
const NotFound = lazy(() => import('@/components/NotFound'))

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
