import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/users', () => {
        return HttpResponse.json({
            data: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
            ],
        })
    }),
    http.post('/api/login', () => {
        return HttpResponse.json({ message: 'Login successful' })
    }),
]
