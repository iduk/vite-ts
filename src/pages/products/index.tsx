import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductIndex() {
  const { setFooter } = useOutletContext<{
    setFooter?: (content: React.ReactNode) => void
  }>()

  useEffect(() => {
    setFooter?.(
      <div>
        <p>Products 페이지의 커스텀 Footer 내용입니다.</p>
      </div>
    )

    return () => {
      setFooter?.(null)
    }
  }, [setFooter])

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
