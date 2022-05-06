import s from './Header.module.css'
import headerImg from '../u4-common/img/header.svg'
import sferaImg from '../u4-common/img/sferaHeader.svg'

export const Header = () =>{
    return <div className={s.mainContainer}>
        <img className={s.background} src={headerImg}/>
        <div className={s.logo}>
            <img src={sferaImg} alt="Сфера"/>
        </div>
        <span className={s.mainTitle}>Лучшие специалисты собраны в СФЕРЕ!</span>
        <span className={s.subTitle}>Выберите своего – </span>
        <span className={s.subTitle}>сделайте первый шаг на пути к переменам</span>
    </div>
}