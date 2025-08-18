import Layout from '@/components/Layout'
import NotFound from '@/components/NotFound'
import Home from '@/Home'
import { type FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

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
