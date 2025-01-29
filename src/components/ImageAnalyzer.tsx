import { useState } from 'react'

interface AnalysisResult {
    response: string // Ollama API 응답 데이터
}
export default function ImageAnalyzer() {
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    // 이미지 업로드 핸들러
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const validFormats = ['image/jpeg', 'image/png']
            if (!validFormats.includes(file.type)) {
                alert('지원되지 않는 파일 형식입니다. JPG 또는 PNG 이미지를 업로드하세요.')
                return
            }

            // 파일 크기 제한 (2MB 이하)
            const maxSizeMB = 2
            if (file.size > maxSizeMB * 1024 * 1024) {
                alert(`이미지 크기가 너무 큽니다. 최대 ${maxSizeMB}MB 이하로 업로드하세요.`)
                return
            }

            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const base64String = reader.result as string
                const cleanBase64 = base64String.split(',')[1] // 🚨 Base64 프리픽스 제거
                resolve(cleanBase64)
            }
            reader.onerror = error => reject(error)
        })
    }

    // Ollama 3.1 API 호출
    const handleAnalyze = async () => {
        if (!image) {
            alert('이미지를 업로드하세요.')
            return
        }
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('image', image)

            const response = await fetch(`${import.meta.env.VITE_OLLAMA_HOST}/api/generate`, {
                method: 'POST',
                body: JSON.stringify({
                    model: 'llava-llama3', // 사용 모델
                    prompt: '이 이미지의 전반적인 색감을 한국어로 설명해주세요.', // 요청 문구
                    stream: false,
                    images: [await convertToBase64(image)],
                }),
            })

            if (!response.ok) {
                throw new Error('API 요청 실패')
            }

            const result: AnalysisResult = await response.json()

            // Ollama의 응답 `response` 필드를 추출하여 화면에 표시
            setAnalysis(result)
        } catch (error) {
            console.error('이미지 분석 오류:', error)
            alert('이미지 분석 중 오류가 발생했습니다.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Ollama 3.1 이미지 분석</h2>

            {/* 이미지 업로드 */}
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {preview && (
                <img
                    src={preview}
                    alt="미리보기"
                    className="w-full h-64 mt-4 object-cover rounded-lg"
                />
            )}

            {/* 분석 버튼 */}
            <button
                onClick={handleAnalyze}
                className="mt-4 bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={loading}
            >
                {loading ? '분석 중...' : '이미지 분석'}
            </button>

            {/* 분석 결과 표시 */}
            {analysis && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-semibold">분석 결과</h3>
                    <p>{analysis.response}</p>
                </div>
            )}
        </div>
    )
}
