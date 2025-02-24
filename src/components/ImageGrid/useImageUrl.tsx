import { useEffect, useState } from 'react'
// import BgImg from 'assets/images/sumup-unsplash-0.jpg'

export default function useImageUrl(count: number) {
    const [imageUrl, setImageUrl] = useState<string[]>([])

    useEffect(() => {
        const fetchImages = async () => {
            const urls = Array.from(
                { length: count },
                (_, i) => `https://picsum.photos/seed/${i}/300/300`
            )
            setImageUrl(urls)
        }

        fetchImages()
    }, [count])

    return imageUrl
}
