import styles from './home.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import SvgImg from 'assets/images/react.svg'
import PersonalColorDetector from 'components/PersonalColorDetector'

export default function Home() {
    return (
        <>
            <div className={cx('home-layout')}>
                <h1 className={cx('test')}>Home입니당!</h1>
                <PersonalColorDetector />
                <img src={SvgImg} style={{ width: 100 }} alt="sample image" />
            </div>
        </>
    )
}
