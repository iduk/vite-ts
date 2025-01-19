/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/users', () => {
        return HttpResponse.json({
            statusCode: 200,
            statusMessage: '유저 목록을 성공적으로 가져왔습니다.',
            data: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
            ],
        })
    }),
    // board 목록
    http.get('/api/board', () => {
        return HttpResponse.json({
            statusCode: 200,
            statusMessage: '게시판 목록을 성공적으로 가져왔습니다.',
            data: [
                {
                    id: 1,
                    title: '게시글 제목 1',
                    writer: '작성자 1',
                    date: '2025-08-01',
                    views: 10,
                },
                {
                    id: 2,
                    title: '게시글 제목 2',
                    writer: '작성자 2',
                    date: '2025-08-02',
                    views: 20,
                },
                {
                    id: 3,
                    title: '게시글 제목 3',
                    writer: '작성자 3',
                    date: '2025-08-03',
                    views: 30,
                },
                {
                    id: 4,
                    title: '게시글 제목 4',
                    writer: '작성자 4',
                    date: '2025-08-04',
                    views: 40,
                },
                {
                    id: 5,
                    title: '게시글 제목 5',
                    writer: '작성자 5',
                    date: '2025-08-05',
                    views: 50,
                },
            ],
        })
    }),
    // board 상세
    http.get('/api/board/:id', ({ params }: any) => {
        const { id } = params
        return HttpResponse.json({
            statusCode: 200,
            statusMessage: '게시글을 성공적으로 가져왔습니다.',
            data: {
                id: Number(id),
                title: `게시글 제목 ${id}`,
                writer: `작성자 ${id}`,
                date: '2025-08-01',
                views: 10,
                content: `
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                `,
            },
        })
    }),
    // board 작성
    http.post('/api/board', () => {
        return HttpResponse.json({
            statusCode: 200,
            statusMessage: '게시글을 성공적으로 작성했습니다.',
            data: {
                id: 6,
                title: '게시글 제목 6',
                writer: '작성자 6',
                date: '2025-08-06',
                views: 60,
                content: '게시글 내용 6',
            },
        })
    }),
    // board 수정
    http.put('/api/board/:id', ({ params }: any) => {
        const { id } = params
        return HttpResponse.json({
            statusCode: 200,
            statusMessage: '게시글을 성공적으로 수정했습니다.',
            data: {
                id: Number(id),
                title: '게시글 제목 1 수정',
                writer: '작성자 1',
                date: '2025-08-01',
                views: 10,
                content: '게시글 내용 1 수정',
            },
        })
    }),
]
