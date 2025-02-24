import { useEffect, useState } from 'react'

export default function useImageUrl(count: number) {
    const [imageUrls, setImageUrls] = useState<string[]>([])

    useEffect(() => {
        const urls = Array.from(
            { length: count },
            (_, i) => `https://picsum.photos/seed/${i}/500/500`
        )
        setImageUrls(urls)
    }, [count])

    return imageUrls
}
