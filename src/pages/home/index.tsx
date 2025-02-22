import styles from './home.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
import SvgImg from 'assets/images/react.svg'
import ImageAnalyzer from 'components/ImageAnalyzer'

export default function Home() {
    return (
        <>
            <div className={cx('home-layout')}>
                <h1 className={cx('test')}>Home입니당!</h1>
                {/* divider */}
                <hr
                    style={{
                        width: '100%',
                        margin: '20px 0',
                        border: '0.5px solid #eaeaea',
                    }}
                />

                <h3>Ollama3.0 api를 활용한 이미지 무드 분석기</h3>
                <ImageAnalyzer />
                <hr
                    style={{
                        width: '100%',
                        margin: '20px 0',
                        border: '0.5px solid #eaeaea',
                    }}
                />
                <h3>SVG 이미지</h3>
                <img src={SvgImg} style={{ width: 100 }} alt="sample image" />
            </div>
        </>
    )
}
