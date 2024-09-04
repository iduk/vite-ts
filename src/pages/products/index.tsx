import { useNavigate } from 'react-router-dom'

export default function ProductIndex() {
  const navigate = useNavigate()
  const handleButtonClick = (path: string) => {
    navigate(path)
  }
  return (
    <>
      <div>src/pages/products 페이지</div>
      <button onClick={() => handleButtonClick('/products/[id]')}>상품상세로이동</button>
    </>
  )
}
