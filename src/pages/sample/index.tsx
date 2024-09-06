import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './sample.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import Button from '@/components/Button/Button'
import Dialog from '@/components/Dialog/Dialog'
import CheckItem from '@/components/Item/CheckItem'
import VoteItem from '@/components/Item/VoteItem'
import RankItem from '@/components/Item/RankItem'
import GraphItem from '@/components/Item/GraphItem'
import Filter from '@/components/Filter/Filter'
import Carousel from '@/components/Carousel/Carousel'
import TextField from '@/components/Form/TextField'
import Dropdown from '@/components/Form/Dropdown'
import sampleIcon from '@/assets/react.svg'

// 체크아이템
const CheckItemSet1 = [
  { id: 'a1', imgSrc: sampleIcon, label: '아이템 1' },
  { id: 'a2', imgSrc: sampleIcon, label: '아이템 2' },
  { id: 'a3', imgSrc: sampleIcon, label: '아이템 3' },
  { id: 'a4', imgSrc: sampleIcon, label: '아이템 4' },
]
const CheckItemSet2 = [
  { id: 'b1', imgSrc: sampleIcon, label: '아이템 1' },
  { id: 'b2', imgSrc: sampleIcon, label: '아이템 2' },
  { id: 'b3', imgSrc: sampleIcon, label: '아이템 3' },
  { id: 'b4', imgSrc: sampleIcon, label: '아이템 4' },
  { id: 'b5', imgSrc: sampleIcon, label: '아이템 5' },
  { id: 'b6', imgSrc: sampleIcon, label: '아이템 6' },
]
const allItems = [...CheckItemSet1, ...CheckItemSet2]

// 필터
const FilterSet1 = [
  { id: 'a1', filterName: '필터A' },
  { id: 'b1', filterName: '필터B' },
  { id: 'c1', filterName: '필터C' },
]
const FilterSet2 = [
  { id: 'a2', filterName: '필터X', count: 3 },
  { id: 'b2', filterName: '필터Y' },
  { id: 'c2', filterName: '필터Z', count: 7 },
]

// 투표아이템
const VoteItemSet1 = [
  {
    imgSrc: sampleIcon,
    imgAlt: 'sampleIcon1',
    brand: '브랜드1',
    count: '1.2K',
    title: '투표 타이틀1',
  },
  {
    imgSrc: sampleIcon,
    imgAlt: 'sampleIcon2',
    brand: '브랜드2',
    count: '2.3K',
    title: '투표 타이틀2',
  },
]
const VoteItemSet2 = [
  {
    imgSrc: sampleIcon,
    imgAlt: 'sampleIcon3',
    brand: '브랜드3',
    count: '3.2K',
    title: '투표 타이틀3',
  },
  {
    imgSrc: sampleIcon,
    imgAlt: 'sampleIcon4',
    brand: '브랜드4',
    count: '4.3K',
    title: '투표 타이틀4',
  },
]

// 랭크아이템
const RankItemSet1 = [
  {
    colorWidth: '90%',
    state: 'up',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 1',
    name: '아이템1',
    info: '아이템설명1',
    like: '10대가 좋아해요!',
    count: '1K',
  },
  {
    colorWidth: '50%',
    state: 'keep',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 2',
    name: '아이템2',
    info: '아이템설명2',
    like: '20대가 좋아해요!',
    count: '2K',
  },
  {
    colorWidth: '30%',
    state: 'up',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 3',
    name: '아이템3',
    info: '아이템설명3',
    like: '30대가 좋아해요!',
    count: '3K',
  },
  {
    colorWidth: '10%',
    state: 'down',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 4',
    name: '아이템4',
    info: '아이템설명4',
    like: '40대가 좋아해요!',
    count: '4K',
  },
]
const RankItemSet2 = [
  {
    colorWidth: '90%',
    state: 'up',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 1',
    name: '아이템1',
    info: '아이템설명1',
    like: '10대가 좋아해요!',
    count: '1K',
  },
  {
    colorWidth: '50%',
    state: 'keep',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 2',
    name: '아이템2',
    info: '아이템설명2',
    like: '20대가 좋아해요!',
    count: '2K',
  },
  {
    colorWidth: '30%',
    state: 'up',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 3',
    name: '아이템3',
    info: '아이템설명3',
    like: '30대가 좋아해요!',
    count: '3K',
  },
  {
    colorWidth: '10%',
    state: 'down',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 4',
    name: '아이템4',
    info: '아이템설명4',
    like: '40대가 좋아해요!',
    count: '4K',
  },
]
const RankItemSet3 = [
  {
    colorWidth: '90%',
    state: 'up',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 1',
    name: '아이템1',
    info: '아이템설명1',
    like: '10대가 좋아해요!',
    count: '1K',
  },
  {
    colorWidth: '50%',
    state: 'keep',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 2',
    name: '아이템2',
    info: '아이템설명2',
    like: '20대가 좋아해요!',
    count: '2K',
  },
  {
    colorWidth: '30%',
    state: 'up',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 3',
    name: '아이템3',
    info: '아이템설명3',
    like: '30대가 좋아해요!',
    count: '3K',
  },
  {
    colorWidth: '10%',
    state: 'down',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 4',
    name: '아이템4',
    info: '아이템설명4',
    like: '40대가 좋아해요!',
    count: '4K',
  },
  {
    colorWidth: '0%',
    state: 'keep',
    ImgSrc: sampleIcon,
    ImgAlt: 'Thumbnail 5',
    name: '아이템5',
    info: '아이템설명5',
    like: '50대가 좋아해요!',
    count: '5K',
  },
]

// 캐러셀
const CarouselItemSet1 = [
  <div>Slide 1 Content</div>,
  <RankItem items={RankItemSet1} />,
  <VoteItem items={VoteItemSet2} type="col" />,
]

// 그래프아이템
const GraphItemSet1 = [
  { count: '1.4M', height: '100%', name: '아이템 A' },
  { count: '1M', height: '80%', name: '아이템 B' },
  { count: '4K', height: '50%', name: '아이템 C' },
  { count: '3.1K', height: '40%', name: '아이템 D' },
  { count: '2K', height: '30%', name: '아이템 E' },
  { count: '543', height: '15%', name: '아이템 F' },
]

// 드롭다운아이템
const DropdownSet1 = ['한국', '일본', '미국']
// const DropdownSet1 = [<div>한국</div>, <div>일본</div>, <div>미국</div>]

export default function Sample() {
  // 푸터
  const { setFooter } = useOutletContext<{
    setFooter?: (content: React.ReactNode) => void
  }>()
  useEffect(() => {
    setFooter?.(
      <div style={{ padding: '10px 20px' }}>
        <Button size="lg" color="primary" block>
          Sample 페이지의 커스텀 Footer 내용입니다.
        </Button>
      </div>
    )
    return () => {
      setFooter?.(null)
    }
  }, [setFooter])

  // 체크아이템
  const [checkItems, setCheckItem] = useState<{ [key: string]: boolean }>(() => {
    return allItems.reduce(
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

  // 투표아이템 토글
  const [voteType, setVoteType] = useState<'row' | 'col'>('row')
  const toggleVoteType = () => {
    setVoteType(prevType => (prevType === 'row' ? 'col' : 'row'))
  }

  // 텍스트필드 관련
  const [isSubmitted, setIsSubmitted] = useState(false)
  const TextFieldSubmit = () => {
    setIsSubmitted(true)
  }

  // 드롭다운 관련
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [hasError, setHasError] = useState<boolean>(false)
  const DropdownSubmit = () => {
    if (!selectedValue) {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }

  return (
    <>
      <div className={cx('wrapper', 'flex', 'flex-col', 'flex-gap-16')}>
        {/* Button */}
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
        {/* Dialog */}
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>Dialog</h1>
          <Dialog
            trigger={
              <Button size="lg" color="primary">
                Dialog 열기 (제목O / 닫기버튼O)
              </Button>
            }
            title="제목"
          >
            <p>내용</p>
          </Dialog>
          <Dialog
            trigger={
              <Button size="lg" color="primary">
                Dialog 열기 (제목O / 닫기버튼X)
              </Button>
            }
            title="제목"
            close={false}
          >
            <p>내용</p>
          </Dialog>
          <Dialog
            trigger={
              <Button size="lg" color="primary">
                Dialog 열기 (제목X / 닫기버튼O)
              </Button>
            }
          >
            <p>내용</p>
          </Dialog>
          <Dialog
            trigger={
              <Button size="lg" color="primary">
                Dialog 열기 (제목X / 닫기버튼X)
              </Button>
            }
            close={false}
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
          <Dialog
            trigger={
              <Button size="lg" color="primary">
                BottomSheet 열기 (제목O / 닫기버튼X)
              </Button>
            }
            type="bottomsheet"
            title="제목"
            close={false}
          >
            <p>내용</p>
          </Dialog>
          <Dialog
            trigger={
              <Button size="lg" color="primary">
                BottomSheet 열기 (제목X / 닫기버튼O)
              </Button>
            }
            type="bottomsheet"
          >
            <p>내용</p>
          </Dialog>
          <Dialog
            trigger={
              <Button size="lg" color="primary">
                BottomSheet 열기 (제목X / 닫기버튼X)
              </Button>
            }
            type="bottomsheet"
            close={false}
          >
            <p>내용</p>
          </Dialog>
        </section>
        {/* CheckItem */}
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>CheckItem</h1>
          <h2 className={cx('sub-title')}>type="two" 케이스</h2>
          <CheckItem
            items={CheckItemSet1.map(item => ({
              ...item,
              checked: checkItems[item.id] || false,
              onChange: handleCheckboxChange,
            }))}
            type="two"
          />
          <h2 className={cx('sub-title')}>type="three" 케이스</h2>
          <CheckItem
            items={CheckItemSet2.map(item => ({
              ...item,
              checked: checkItems[item.id] || false,
              onChange: handleCheckboxChange,
            }))}
            type="three"
          />
        </section>
        {/* Filter */}
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>Filter</h1>
          <h2 className={cx('sub-title')}>count 없는 케이스</h2>
          <Filter filters={FilterSet1} defaultActiveId="b1" />
          <h2 className={cx('sub-title')}>count 있는 케이스</h2>
          <Filter filters={FilterSet2} defaultActiveId="a2" />
        </section>
        {/* VoteItem */}
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>VoteItem</h1>
          <h2 className={cx('sub-title')}>type="row" 케이스</h2>
          <button onClick={toggleVoteType}>
            {voteType === 'row' ? (
              <>
                <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
                col로 변경
              </>
            ) : (
              <>
                <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
                row로 변경
              </>
            )}
          </button>
          <VoteItem items={VoteItemSet1} type={voteType} />
          <h2 className={cx('sub-title')}>type="col" 케이스</h2>
          <VoteItem items={VoteItemSet2} type="col" />
        </section>
        {/* RankItem */}
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>RankItem</h1>
          <h2 className={cx('sub-title')}>type="col" 케이스</h2>
          <RankItem items={RankItemSet1} />
          <h2 className={cx('sub-title')}>type="row" 케이스</h2>
          <RankItem items={RankItemSet2} type="row" />
          <h2 className={cx('sub-title')}>type="mix" 케이스</h2>
          <RankItem items={RankItemSet3} type="mix" />
        </section>
        {/* Carousel */}
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>Carousel</h1>
          <Carousel items={CarouselItemSet1} />
        </section>
        {/* GraphItem */}
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>GraphItem</h1>
          <GraphItem items={GraphItemSet1} />
        </section>
        {/* TextField */}
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>TextField</h1>
          <TextField
            label="라벨명"
            placeholder="매장코드 입력"
            errorMessage="매장코드를 입력해주세요!"
            isSubmitted={isSubmitted}
          />
          <Button size="lg" color="primary" onClick={TextFieldSubmit}>
            TextField Submit
          </Button>
        </section>
        {/* Dropdown */}
        <section className={cx('flex', 'flex-col', 'flex-gap-8', 'box')}>
          <h1 className={cx('title')}>Dropdown</h1>
          <Dropdown
            label="라벨명"
            placeholder="국가를 선택해주세요"
            errorMessage="국가를 선택해주세요!"
            items={DropdownSet1}
            hasError={hasError}
            setHasError={setHasError}
            onChange={setSelectedValue}
          />
          <Button size="lg" color="primary" onClick={DropdownSubmit}>
            Dropdown Submit
          </Button>
        </section>
      </div>
    </>
  )
}
