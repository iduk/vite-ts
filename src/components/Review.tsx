import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Markdown from 'react-markdown'

export default function Review() {
    const [encodedFiles, setEncodedFiles] = useState<string[]>([])
    const [review, setReview] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    const { getRootProps, getInputProps } = useDropzone({
        onDropAccepted: async files => {
            try {
                const getBase64 = (file: Blob): Promise<string> =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader()
                        reader.onload = () => resolve(reader.result as string)
                        reader.onerror = error => reject(error)
                        reader.readAsDataURL(file)
                    })

                const eFiles = await Promise.all(files.map(file => getBase64(file)))
                setEncodedFiles(eFiles)
                handleReview(eFiles) // Base64 파일 목록 전달
            } catch (error) {
                console.error('Error processing files:', error)
            }
        },
    })

    // 리뷰 생성 요청
    const handleReview = async (files: string[]) => {
        setIsLoading(true)
        setReview('')

        // base64 이미지 변환
        const images = files.map(file => file.split(',')[1])

        try {
            const response = await fetch(`${import.meta.env.VITE_OLLAMA_HOST}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama3.2', // 사용 모델
                    prompt: 'A review of the image, focusing on the colors and objects in it.',
                    images, // Base64 파일 목록
                }),
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
            }

            const data = await response.json() // JSON 데이터 처리
            const parsedResponse = JSON.parse(data.response || '{}') // 응답 데이터 파싱
            setReview(JSON.stringify(parsedResponse, null, 2)) // 가독성을 위한 JSON 출력
        } catch (error) {
            console.error('Error fetching AI review:', error)
            setReview('Failed to generate review. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-10">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
                        {encodedFiles.length === 0 ? (
                            <div
                                {...getRootProps({
                                    className:
                                        'dropzone w-full h-32 flex flex-col justify-center items-center cursor-pointer',
                                })}
                            >
                                <input {...getInputProps()} />
                                <p className="text-gray-600 font-medium">
                                    Drag & drop your photo here or click to select
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {encodedFiles.map((file, i) => (
                                    <img
                                        src={file}
                                        key={i}
                                        className="rounded-md shadow-md object-cover w-full"
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <div className="flex flex-col gap-4">
                        {isLoading ? (
                            <div className="text-gray-600 font-semibold">
                                Generating your review... please wait.
                            </div>
                        ) : (
                            <Markdown className="bg-gray-100 p-4 rounded-lg shadow-md text-gray-800">
                                {review}
                            </Markdown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
