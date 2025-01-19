/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IResponse } from '/types/common'

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    error => {
        // 공통 에러 처리 (예: 토큰 만료)
        if (error.response?.status === 401) {
            console.error('인증 오류: 로그인 페이지로 이동')
            // 로그아웃 처리 또는 리다이렉트
        }
        return Promise.reject(error)
    }
)

// API 핸들러 함수
const apiHandler = async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: AxiosResponse,
    config?: AxiosRequestConfig
): Promise<IResponse<AxiosResponse>> => {
    try {
        const response = await axiosInstance.request({
            method,
            url,
            data,
            ...config,
        })
        return response.data
    } catch (error: any) {
        // 공통 에러 메시지 처리
        console.error(`API 호출 실패: ${error.message}`)
        throw error
    }
}

export default apiHandler
