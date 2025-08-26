/// <reference types="@vitest/browser/providers/playwright" />
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { afterAll, afterEach, beforeAll } from 'vitest'

const handlers = [
    http.get('https://dummyjson.com/quotes/random', () => {
        return HttpResponse.json({
            id: 1,
            quote: 'Stay hungry, stay foolish.',
            author: 'Steve Jobs',
        })
    }),
]

const worker = setupWorker(...handlers)

beforeAll(async () => await worker.start())
afterAll(() => {
    worker.stop()
})
afterEach(() => {
    worker.resetHandlers()
})
