import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Markdown from 'react-markdown'

export default function Review() {
    const [encodedFiles, setEncodedFiles] = useState<string[]>([])
    const [review, setReview] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    // Handle file uploads and convert to Base64
    const { getRootProps, getInputProps } = useDropzone({
        onDropAccepted: async files => {
            const getBase64 = async (file: Blob): Promise<string> => {
                const reader = new FileReader()
                reader.readAsDataURL(file)

                return new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result as string)
                    reader.onerror = error => reject(error)
                })
            }

            const eFiles: string[] = []
            for (const file of files) {
                eFiles.push(await getBase64(file))
            }
            setEncodedFiles(eFiles)
            handleReview(eFiles)
        },
    })

    const handleReview = async (files: string[]) => {
        setIsLoading(true)
        setReview('')

        try {
            const response = await fetch(
                `${import.meta.env.VITE_OLLAMA_HOST}/api/models/llama3.2`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ encodedFiles: files }),
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder('utf-8')
            let content = ''

            while (reader) {
                const { value, done } = await reader.read()
                if (done) break
                content += decoder.decode(value, { stream: true })
                setReview(content) // Update review as it streams
            }
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
