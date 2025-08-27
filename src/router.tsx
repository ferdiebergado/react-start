import Layout from '@/components/Layout'
import { lazy, type FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

const Home = lazy(() => import('@/Home'))
const NotFound = lazy(() => import('@/components/NotFound'))
const SignUp = lazy(() => import('@/components/SignUp'))

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
