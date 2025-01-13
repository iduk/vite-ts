import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/users', () => {
        return HttpResponse.json({
            code: 200,
            message: '유저 목록을 성공적으로 가져왔습니다.',
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
