/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

const VISION_URL = `https://vision.googleapis.com/v1/images:annotate?key=${import.meta.env.VITE_GOOGLE_VISION_API_KEY}`

interface FaceData {
    boundingPoly: { vertices: { x: number; y: number }[] }
}

interface ColorData {
    [x: string]: any
    red: number
    green: number
    blue: number
}

const PersonalColorDetector: React.FC = () => {
    const [image, setImage] = useState<string | null>(null)
    const [faceData, setFaceData] = useState<FaceData | null>(null)
    const [colors, setColors] = useState<ColorData[]>([])
    const [personalColor, setPersonalColor] = useState<string | null>(null)

    // 퍼스널 컬러 판별 함수
    const determinePersonalColor = (rgb: [number, number, number]): string => {
        const [r, g, b] = rgb

        // 봄웜: 밝고 따뜻한 색
        if (r > 180 && g > 140 && b < 120) return '봄웜 (Spring Warm)'

        // 여름쿨: 부드럽고 차가운 색
        if (r < 170 && g > 170 && b > 170) return '여름쿨 (Summer Cool)'

        // 가을웜: 깊고 따뜻한 색
        if (r > 130 && g < 100 && b < 100) return '가을웜 (Autumn Warm)'

        // 겨울쿨: 강렬하고 차가운 색
        if (r < 100 && g < 100 && b > 120) return '겨울쿨 (Winter Cool)'

        return '판별 불가'
    }

    // 이미지 업로드 핸들러
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // Google Vision API 호출 (얼굴 인식 + 색상 분석)
    const analyzeImage = async () => {
        if (!image) return

        const requestBody = {
            requests: [
                {
                    image: { content: image.split(',')[1] }, // Base64 인코딩된 이미지
                    features: [{ type: 'FACE_DETECTION' }, { type: 'IMAGE_PROPERTIES' }],
                },
            ],
        }

        try {
            const response = await fetch(VISION_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            })

            const data = await response.json()
            console.log('Vision API 응답 데이터:', data) // 응답 데이터 확인

            const faceAnnotations = data.responses[0]?.faceAnnotations || []
            const imageProperties = data.responses[0]?.imagePropertiesAnnotation

            // colorData 안전하게 가져오기 (기본값 설정)
            const colorData: ColorData[] = imageProperties?.dominantColors?.colors || []

            if (colorData.length > 0) {
                setColors(colorData.slice(0, 5)) // 상위 5개 색상 저장

                // 가장 지배적인 색상 찾기 (score가 가장 높은 색상)
                const dominantColor = colorData.reduce((prev, current) =>
                    prev.score > current.score ? prev : current
                )

                if (dominantColor && dominantColor.color) {
                    setPersonalColor(
                        determinePersonalColor([
                            dominantColor.color.red || 0,
                            dominantColor.color.green || 0,
                            dominantColor.color.blue || 0,
                        ])
                    )
                }
            }

            if (faceAnnotations.length > 0) {
                setFaceData(faceAnnotations[0])
            } else {
                setFaceData(null)
            }
        } catch (error) {
            console.error('Error analyzing image:', error)
        }
    }

    return (
        <div className="p-4 max-w-lg mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">퍼스널 컬러 분석기 (얼굴 인식 포함)</h2>

            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />

            {image && (
                <div className="mb-4">
                    <img src={image} alt="Uploaded Preview" className="w-48 mx-auto rounded-lg" />
                </div>
            )}

            <button onClick={analyzeImage} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                분석하기
            </button>

            {faceData ? (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-green-500">얼굴이 감지되었습니다!</h3>
                </div>
            ) : (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-red-500">얼굴을 찾을 수 없습니다.</h3>
                </div>
            )}

            {personalColor && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">결과: {personalColor}</h3>
                </div>
            )}

            {colors.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">대표 색상</h3>
                    <div className="flex justify-center gap-2 mt-2">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className="w-10 h-10 rounded-full"
                                style={{
                                    backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PersonalColorDetector
