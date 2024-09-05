import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './sample.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import Button from '@/components/Button/Button'
import Dialog from '@/components/Dialog/Dialog'

export default function Sample() {
  const { setFooter } = useOutletContext<{
    setFooter?: (content: React.ReactNode) => void
  }>()
  useEffect(() => {
    setFooter?.(
      <div>
        <p>Sample 페이지의 커스텀 Footer 내용입니다.</p>
      </div>
    )
    return () => {
      setFooter?.(null)
    }
  }, [setFooter])

  return (
    <>
      <div className={cx('wrapper')}>
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>Button</h1>
          <div className={cx('flex', 'items-center', 'flex-gap-4')}>
            <Button size="xs" color="primary">
              버튼버튼
            </Button>
            <Button size="sm" color="primary">
              버튼버튼
            </Button>
            <Button color="primary">버튼버튼</Button>
            <Button size="lg" color="primary">
              버튼버튼
            </Button>
          </div>
          <div className={cx('flex', 'items-center', 'flex-gap-4')}>
            <Button size="lg" color="primary">
              버튼버튼
            </Button>
            <Button size="lg" color="primary" square>
              버튼버튼
            </Button>
            <Button size="lg" color="primary" outline>
              버튼버튼
            </Button>
            <Button size="lg" color="primary" outline square>
              버튼버튼
            </Button>
          </div>
          <div className={cx('flex', 'items-center', 'flex-gap-4')}>
            <Button size="lg" color="secondary">
              버튼버튼
            </Button>
            <Button size="lg" color="secondary" square>
              버튼버튼
            </Button>
            <Button size="lg" color="secondary" outline>
              버튼버튼
            </Button>
            <Button size="lg" color="secondary" outline square>
              버튼버튼
            </Button>
          </div>
        </section>
        <section>
          <h1>Dialog</h1>
          <Dialog trigger={<button>모달 열기</button>} title="모달 제목" close={true}>
            <p>모달 내용이 여기에 표시됩니다.</p>
          </Dialog>
        </section>
      </div>
    </>
  )
}
