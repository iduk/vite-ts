import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import classNames from 'classnames/bind'
import styles from './Carousel.module.scss'
import sampleIcon from '@/assets/react.svg'

const cx = classNames.bind(styles)

interface CarouselProps {
  items: React.ReactNode[]
}

export default function Carousel({ items }: CarouselProps) {
  return (
    <div className={cx('carousel-container')}>
      <div className={cx('carousel-pagination')}></div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => console.log(swiper)}
        loop={true}
        className={cx('carousel')}
        navigation={{
          prevEl: `.${cx('carousel-nav-prev')}`,
          nextEl: `.${cx('carousel-nav-next')}`,
        }}
        pagination={{
          clickable: true,
          el: `.${cx('carousel-pagination')}`,
          bulletClass: cx('carousel-pagination-bullet'),
          bulletActiveClass: cx('carousel-pagination-active'),
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className={cx('carousel-item')}>
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={cx('carousel-nav-prev')}>
        <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
      </button>
      <button className={cx('carousel-nav-next')}>
        <img src={sampleIcon} alt="Sample Icon" width={16} height={16} />
      </button>
    </div>
  )
}
