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

- ⚛️ React – Modern component architecture
- 🗺️ React Router – Declarative routing
- 🌸 React Query – Declarative server state management
- 🌬️ Tailwind CSS – Utility-first styling
- 💅 shadcn/ui – Beautifully designed components built on top of Radix UI and Tailwind CSS
- 🧪 Vitest – Unit and component testing
- 🎭 Playwright – End-to-end testing
- ⚡ Vite – Fast builds and HMR
- 📕 Storybook – UI component development and documentation
- 🛡️ TypeScript – Type safety
- 🧹 ESLint + Prettier + EditorConfig – Consistent code style

## Features

- [React Compiler](https://react.dev/learn/react-compiler) enabled
- Theme switcher
- User Account: sign-up, sign-in, password reset and profile

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
  <App />
</BrowserRouter>
```

### Adding new routes

All routes are defined in `routes.ts`. To create a route, add a `RouteObject` to the `routes` array:

```tsx
// src/routes.tsx
// omitted for brevity...
export const paths = {
  signup: '/signup',
  signin: '/signin',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
};

export const routes = [
  { index: true, Component: Home },
  { path: paths.signup, Component: SignUp },
  { path: paths.signin, Component: Login },
  { path: paths.forgotPassword, Component: ForgotPassword },
  { path: paths.resetPassword, Component: ResetPassword },
  { path: '*', Component: NotFound },
] satisfies RouteObject[];
```

### Lazy loading components

Deferring the loading of component’s code until it is rendered for the first time improves performance. To lazy load components, dynamically import components with the `lazy` function from `react`. Then, set the lazy-loaded component as the value of the `Component` property of the `RouteObject`.

```tsx
const About = lazy(() => import('@/About'));

export const routes = [
  // existing route objects omitted for brevity...
  { path: 'about', Component: About },
] satisfies RouteObject[];
```

> **Tip:** _Always use absolute paths with path alias when importing for better maintainability. The `@` alias is preconfigured to point to the `src` folder._

For a complete guide on defining routes and using hooks like `useRoutes` and `useLocation`, refer to the official [React Router documentation](https://reactrouter.com/start/data/routing).

## Data fetching

We utilize **React Query** for efficient server-state management. The `QueryClient` is globally configured and wrapped around the application to provide a simple API for fetching, caching, and updating data.

```tsx
// src/App.tsx
import ErrorFallback from '@/components/ErrorFallback';
import ThemeProvider from '@/components/ThemeProvider';
import Router from '@/router';
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { type FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient();

const root = document.getElementById('root');
if (!root) {
  throw new Error('root element not found');
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
              <ThemeProvider>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </ThemeProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
```

To fetch data with React Query, first create a custom hook that calls `useQuery` or `useSuspenseQuery`.

```ts
// src/features/quote/index.ts
export interface Quote {
  id: number;
  quote: string;
  author: string;
}

async function fetchRandomQuote(): Promise<Quote> {
  const res = await fetch('https://dummyjson.com/quotes/random');
  if (!res.ok) throw new Error(res.statusText);
  return (await res.json()) as Quote;
}

export const randomQuoteQuery = queryOptions({
  queryKey: ['random_quote'],
  queryFn: fetchRandomQuote,
});

export function useRandomQuote() {
  return useSuspenseQuery(randomQuoteQuery);
}
```

Then, call the custom hook on the component to make the fetched data available to it.

```tsx
// src/features/quote/RandomQuote.tsx
import { useRandomQuote } from '@/features/quote';
import type { FC } from 'react';

const RandomQuote: FC = () => {
  const {
    data: { quote, author },
  } = useRandomQuote();

  return (
    <blockquote>
      <span className="text-lg italic">"{quote}"</span>
      <footer className="pt-4 text-xl font-bold">{author}</footer>
    </blockquote>
  );
};

export default RandomQuote;
```

When using `useSuspenseQuery`, wrap your component that calls it with a `Suspense` boundary.

```tsx
// src/Home.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RandomQuote from '@/features/quote/RandomQuote';
import SkeletonRandomQuote from '@/features/quote/SkeletonRandomQuote';
import { Suspense, type FC } from 'react';

const Home: FC = () => {
  return (
    <Card className="m-16 shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl">Random Quote</CardTitle>
        <CardDescription>
          A demo of data fetching using React Query
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<SkeletonRandomQuote />}>
          <RandomQuote />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default Home;
```

> **Tip**: _Structure your component atomically (smallest possible component) to prevent unnecessary re-renders. React Compiler can't help you if your components are not well-structured._

To learn more about hooks like `useQuery` and `useMutation`, check out the official [React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start).

## Adding components

The following command will add a `Button` component to your project.

```sh
pnpm dlx shadcn@latest add button
```

You can then import it like this:

```tsx
// src/App.tsx
import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}

export default App;
```

To learn more about the available components, how to add, import, and customize them, consult the [shadcn/ui documentation](https://ui.shadcn.com/docs/installation/vite#add-components).

## User Account

Routes and forms for user accounts are already setup. You only need to send a request to your backend.
The routes are wrapped with an `AuthProvider` that exposes a `useAuth` hook that provide access to the auth context.

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

### useAuth hook

The auth context can be retrieved by calling the `useAuth` hook. It returns an object containing the current logged in `user` if it exists together with a `login` and `logout` function.

```tsx
export interface AuthState {
  user?: User;
  login: (user: User) => void;
  logout: () => void;
}
```

### Logging-in a user

To login a user, call the login function in and pass the User object as an argument.

```tsx
const { login } = useAuth();

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const res = await fetch('http://localhost:8888/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    });

    if (!res.ok) throw new Error('Login request failed.');

    return (await res.json()) as LoginData;

    login({ name: user.name, email: user.email });
    toast.success(JSON.stringify('You are now logged in!', undefined, 2));
  } catch (error) {
    console.error('Form submission error', error);
    toast.error('Failed to submit the form. Please try again.');
  }
};
```

## Stories

This template uses **Storybook** to test and document components. Theme switching support works out of the box. The builtin components on this template have their respective stories.

Storybook comes with a built-in development server featuring everything you need for project development.

```sh
pnpm run storybook
```

For a guide on the concept of stories and to create stories, visit the [storybook documentation](https://storybook.js.org/docs).

## Screenshot

![screenshot](/screenshot.png)

## FAQ

- Why use **React Router** in `declarative mode`?

  This template follows the principle of _separation of concerns_, thus, **React Router** is only used for handling client side routing, nothing else. For data fetching needs, **React Query** is integrated for that purpose.

- Where to place my code?

  For scalability, we recommend that you organize your code into "features". Create a folder for your feature in the `src/features` folder and put all your code there.

## Suggested libraries/tools

- Client State Management: [zustand](https://zustand-demo.pmnd.rs)
- Detect Performance Issues: [react-scan](https://react-scan.com)
- Accessibility Testing: [react-axe](https://www.npmjs.com/package/@axe-core/react)
- Design shadcn/ui theme: [tweakcn](https://tweakcn.com)
- Shadcn form builder: [shadcn-form](https://www.shadcn-form.com)
- Ready to use hooks: [usehooks-ts](https://www.npmjs.com/package/usehooks-ts)
- Essential typescript types: [ts-essentials](https://www.npmjs.com/package/ts-essentials)
