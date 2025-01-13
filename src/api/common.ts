import apiHandler from './apiHandler'

// API 응답 타입
export interface ApiResponse<T> {
    code: number
    message: string
    data: T
}

// 유저 목록 가져오기
export const getUsers = async () => {
    return apiHandler<ApiResponse<{ id: number; name: string }[]>>('get', '/api/users')
}

// // 특정 유저 정보 가져오기
// export const fetchUserById = async (id: number) => {
//     return apiHandler<{ id: number; name: string }>('get', `/users/${id}`)
// }

// // 유저 생성
// export const createUser = async (user: { name: string }) => {
//     return apiHandler<{ id: number; name: string }>('post', '/users', user)
// }

// // 유저 삭제
// export const deleteUser = async (id: number) => {
//     return apiHandler<null>('delete', `/users/${id}`)
// }
