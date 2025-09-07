/// <reference types="@vitest/browser/providers/playwright" />
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { afterAll, afterEach, beforeAll } from 'vitest';

const handlers = [
  http.get('https://dummyjson.com/quotes/random', () => {
    return HttpResponse.json({
      id: 1,
      quote: 'Stay hungry, stay foolish.',
      author: 'Steve Jobs',
    });
  }),

  http.post('http://localhost:8888/auth/register', async ({ request }) => {
    const body = (await request.json()) as Record<string, string>;
    if (body.email === 'exists@mail.com') {
      return HttpResponse.json(
        {
          message: 'Validation failed',
          error: { email: 'Email already in use' },
        },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      message: 'Signup successful',
      data: {
        id: '123',
        email: body.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }),

  http.post('http://localhost:8888/auth/login', async ({ request }) => {
    const body = (await request.json()) as Record<string, string>;
    if (body.email === 'exists@mail.com') {
      return HttpResponse.json({
        message: 'Sign in successful',
      });
    }

    return HttpResponse.json(
      {
        message: 'Invalid username/password',
      },
      { status: 401 }
    );
  }),

  http.post('http://localhost:8888/auth/forgot', async ({ request }) => {
    const body = (await request.json()) as Record<string, string>;
    if (body.email === 'invalid@mail.com') {
      return HttpResponse.json(
        {
          message: 'Invalid input',
          error: { email: 'email is not a valid email address' },
        },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      message: 'Password reset link sent successfully',
    });
  }),

  http.post('http://localhost:8888/auth/reset', async ({ request }) => {
    const body = (await request.json()) as Record<string, string>;
    if (body.password === 'Password2') {
      return HttpResponse.json(
        {
          message: 'Invalid input',
          error: { password: 'Passwords do not match' },
        },
        { status: 422 }
      );
    }

    return HttpResponse.json({
      message: 'Password reset successful',
    });
  }),
];

const worker = setupWorker(...handlers);

beforeAll(async () => await worker.start());
afterAll(() => {
  worker.stop();
});
afterEach(() => {
  worker.resetHandlers();
});
