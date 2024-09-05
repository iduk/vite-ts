import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './sample.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import Button from '@/components/Button/Button'
import Dialog from '@/components/Dialog/Dialog'
import Item from '@/components/Item/Item'
import sampleIcon from '@/assets/react.svg'

const itemSets = [
  [
    { id: 'a1', imgSrc: sampleIcon, label: '아이템 1' },
    { id: 'a2', imgSrc: sampleIcon, label: '아이템 2' },
    { id: 'a3', imgSrc: sampleIcon, label: '아이템 3' },
    { id: 'a4', imgSrc: sampleIcon, label: '아이템 4' },
  ],
  [
    { id: 'b1', imgSrc: sampleIcon, label: '아이템 1' },
    { id: 'b2', imgSrc: sampleIcon, label: '아이템 2' },
    { id: 'b3', imgSrc: sampleIcon, label: '아이템 3' },
    { id: 'b4', imgSrc: sampleIcon, label: '아이템 4' },
    { id: 'b5', imgSrc: sampleIcon, label: '아이템 5' },
    { id: 'b6', imgSrc: sampleIcon, label: '아이템 6' },
  ],
]

export default function Sample() {
  // 푸터
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

  //아이템
  const [checkItems, setCheckItem] = useState<{ [key: string]: boolean }>(() => {
    return itemSets.flat().reduce(
      (acc, item) => {
        acc[item.id] = false
        return acc
      },
      {} as { [key: string]: boolean }
    )
  })
  const handleCheckboxChange = (id: string) => {
    setCheckItem(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      <div className={cx('wrapper', 'flex', 'flex-col', 'flex-gap-16')}>
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
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>Dialog</h1>
          <Dialog
            trigger={
              <Button size="lg" color="primary">
                Dialog 열기
              </Button>
            }
            title="제목"
          >
            <p>내용</p>
          </Dialog>
          <Dialog
            trigger={
              <Button size="lg" color="primary">
                BottomSheet 열기
              </Button>
            }
            title="제목"
            type="bottomsheet"
          >
            <p>내용</p>
          </Dialog>
        </section>
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>Item</h1>
          <div className={cx('item-wrap', 'two')}>
            {itemSets[0].map(({ id, imgSrc, label }) => (
              <Item
                key={id}
                imgSrc={imgSrc}
                label={label}
                id={id}
                checked={checkItems[id] || false} // 기본값 false 제공
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
          <div className={cx('item-wrap', 'three')}>
            {itemSets[1].map(({ id, imgSrc, label }) => (
              <Item
                key={id}
                imgSrc={imgSrc}
                label={label}
                id={id}
                checked={checkItems[id] || false} // 기본값 false 제공
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
