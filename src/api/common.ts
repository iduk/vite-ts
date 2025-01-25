// 유저 목록 가져오기
import axios from 'axios'
import apiHandler from 'api/apiHandler'
import { IResponse } from 'types/common'

export const getUsers = async (): Promise<{ data: { id: number; name: string }[] }> => {
    const response = await axios.get('/api/users')
    return response.data
}

// board 목록 가져오기
export const getBoardList = async (): Promise<IResponse> => {
    return apiHandler('get', `/api/board`)
}
// board 상세
export const getBoardDetail = async (id: number): Promise<IResponse> => {
    return apiHandler('get', `/api/board/${id}`)
}
