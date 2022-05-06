import s from './Footer.module.css'
import sfera from '../u4-common/img/sfera.png'

export const Footer = () => {
    return <div className={s.mainContainer}>
        <div className={s.firstLine}>
            {/*<div className={s.label}>Сфера</div>*/}
            <div className={s.label}>
                <img src={sfera} alt="Логотип фирмы"/>
            </div>
            <div className={s.aboutInformationMainContainer}>
                <div className={s.aboutInformationContainer}>
                    <div>Работодателям</div>
                    <div className={s.linkContainer}>
                        <a href="">Пользовательское соглашение</a>
                        <a href="">Политика обработки персональных данных</a>
                        <a href="">Согласие на обработку персональных данных</a>
                    </div>
                </div>
                <div className={s.aboutInformationContainer}>
                    <div>Кандидатам</div>
                    <div className={s.linkContainer}>
                        <a href="">Пользовательское соглашение</a>
                        <a href="">Согласие на обработку персональных данных соискателя</a>
                    </div>
                </div>
                <div className={s.aboutInformationContainer}>
                    <div>О проекте</div>
                    <div className={s.linkContainer}>
                        <a href="">Контакты</a>
                        <a href="">Мероприятия</a>
                        <a href="">СМИ о нас</a>
                        <a href="">Описание и документы</a>
                    </div>
                </div>
            </div>
        </div>
        <div className={s.socialNetworkLinks}>
            <a href="">FB</a>
            <a href="">I</a>
            <a href="">Vk</a>
            <a href="">M</a>
        </div>
        {/*<div className={s.footerContainer}>*/}
        {/*    <span>Сфера</span>*/}
        {/*    <span>made by Katya F</span>*/}
        {/*    <span>2022</span>*/}
        {/*</div>*/}
    </div>
}