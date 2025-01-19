/* eslint-disable @typescript-eslint/no-explicit-any */
// API 응답 타입
export interface IResponse {
    statusCode: number
    statusMessage?: string
    message: string | null
    errorCode?: string | null
    data: any
}
