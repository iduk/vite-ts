export default [
    {
        url: '/api/users', // 요청 경로
        method: 'get', // HTTP 메서드
        response: () => {
            return {
                code: 200,
                message: 'Success',
                data: [
                    { id: 1, name: 'John Doe' },
                    { id: 2, name: 'Jane Doe' },
                ],
            }
        },
    },
]
