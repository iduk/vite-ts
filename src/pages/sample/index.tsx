import styles from './sample.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import Button from '@components/Button/Button'

export default function Sample() {
  return (
    <>
      <h1>버튼</h1>
      <Button color="primary" size="xs">
        버튼버튼
      </Button>
      <Button color="primary" size="sm">
        버튼버튼
      </Button>
      <Button color="primary" size="md">
        버튼버튼
      </Button>
      <Button color="primary" size="lg">
        버튼버튼
      </Button>
      <div className={cx('test')}>
        <div className={cx('bg-primary')}></div>
        <div className={cx('bg-primary')}></div>
        <div className={cx('bg-primary')}></div>
      </div>
    </>
  )
}
