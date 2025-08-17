# React Start

A modern React SPA starter template with routing, data fetching, styling, and testing out-of-the-box. Built with simplicity and developer productivity in mind.

## Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![Playwright](https://img.shields.io/badge/-playwright-%232EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

- ⚛ **React** – Modern component architecture
- 🛣 **React Router** – Declarative routing
- 🔍 **React Query** – Declarative server state management
- 🎨 **Tailwind CSS** – Utility-first styling
- 💅 **shadcn/ui** – Beautifully designed components built on top of Radix UI and Tailwind CSS
- 🧪 **Vitest** – Unit and component testing
- 🎭 **Playwright** – End-to-end testing
- ⚡ **Vite** – Fast builds and HMR
- 🛡 **TypeScript** – Type safety
- 🧹 **ESLint + Prettier + EditorConfig** – Consistent code style

## Features

- Dark mode support

## Requirements

- [Node](https://nodejs.org/en/download) 22 or higher
- [pnpm](https://pnpm.io/installation)

## Getting Started

1. [Create a repository from the template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template).

2. Install dependencies.

```sh
   pnpm install
```

3. Run in development mode.

```sh
   pnpm run dev
```

Open your browser at http://localhost:5173

4. Run tests
   Unit & Component Tests (Vitest)

```sh
pnpm run test
```

End-to-End Tests (Playwright)

```sh
pnpm run test:e2e
```

5. Build for production.

```sh
pnpm run build
pnpm run preview
```

## Routing

This starter kit uses **React Router** for handling all client-side routing. The router is pre-configured to use a `<BrowserRouter>`, enabling declarative navigation between different pages.

```tsx
<BrowserRouter>
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
</BrowserRouter>
```

To create a route, add a `Route` component as child of the `Routes` component:

```tsx
<Route path="about" element={<About />} />
```

For a complete guide on defining routes and using hooks like `useNavigate`, refer to the official [React Router documentation](https://reactrouter.com/start/data/routing).

## Data fetching

We utilize **React Query** for efficient server-state management. The `QueryClient` is globally configured and wrapped around the application to provide a simple API for fetching, caching, and updating data.

```tsx
// src/App.tsx
const queryClient = new QueryClient()

return (
    <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary fallbackRender={fallbackRender} onReset={reset}>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route index element={<Home />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    </QueryClientProvider>
)
```

To fetch data with React Query, first create a custom hook that calls `useQuery` or `useSuspenseQuery`.

```ts
// src/home.ts
export interface Quote {
    id: number
    quote: string
    author: string
}

async function fetchRandomQuote(): Promise<Quote> {
    const res = await fetch('https://dummyjson.com/quotes/random')
    if (!res.ok) throw new Error(res.statusText)
    return (await res.json()) as Quote
}

export const quoteQuery = queryOptions({
    queryKey: ['random'],
    queryFn: fetchRandomQuote,
})

export function useQuoteQuery() {
    return useSuspenseQuery(quoteQuery)
}
```

Then, call the custom hook on the component to make the fetched data available to it.

```tsx
// src/Home.tsx
const Home: FC = () => {
    const {
        data: { quote, author },
    } = useQuoteQuery()

    return (
        <Card className="m-16 shadow-md">
            <CardHeader>
                <CardTitle className="text-3xl">Random Quote</CardTitle>
                <CardDescription>
                    A demo of data fetching using React Query
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<SuspenseFallback />}>
                    <blockquote>
                        <span className="text-lg italic">"{quote}"</span>
                        <footer className="pt-4 text-xl font-bold">
                            {author}
                        </footer>
                    </blockquote>
                </Suspense>
            </CardContent>
        </Card>
    )
}
```

To learn more about hooks like `useQuery` and `useMutation`, check out the official [React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start).

## Adding components

The following command will add a `Button` component to your project.

```sh
pnpm dlx shadcn@latest add button
```

You can then import it like this:

```tsx
// src/App.tsx
import { Button } from '@/components/ui/button'

function App() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Button>Click me</Button>
        </div>
    )
}

export default App
```

To learn more about the available components, how to add, import, and customize them, consult the [shadcn/ui documentation](https://ui.shadcn.com/docs/installation/vite#add-components).
