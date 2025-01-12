import MorphTargets from 'components/MorphTargets'
import styles from './home.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
// import SvgImg from '@assets/images/react.svg'

export default function Home() {
    return (
        <>
            <h1 className={cx('test')}>Home입니당!</h1>

            <div className={cx('home-layout')}>
                <MorphTargets />
                {/* <img src={SvgImg} style={{ width: 100 }} alt="sample image" /> */}
            </div>
        </>
    )
}
