import { useParams } from 'react-router-dom'

export default function ProductDetail() {
    const { id } = useParams<'id'>()
    return <div>{id}번 상품상세</div>
}
