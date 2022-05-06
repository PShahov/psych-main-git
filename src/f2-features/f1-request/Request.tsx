import {City} from './r1-city/City'
import {Sex} from './r2-sex/Sex';
import {FormatCommunication} from './r3-formatCommunication/FormatCommunication';
import s from './Request.module.css'
import React from 'react';
import {Theme1} from './r4-Theme/Theme';
import {setFilteredPsychTC} from '../../f1-main/m2-store/reducers/psychsRed';
import {useAppDispatch} from '../../f1-main/m2-store/store';


import arrowPic from '../../f1-main/m1-ui/u4-common/img/showPsyc.svg'

export const Request = () => {
    const dispatch = useAppDispatch()
    const filterPsychHandler = () => {
        dispatch(setFilteredPsychTC())
    }
    return <div className={s.requestMainContainer}>
        <div className={s.requestContainer}>
            <City/>
            <Sex/>
            <FormatCommunication/>
            <Theme1/>
        </div>
        <div className={s.line}/>
        <div className={s.button} onClick={filterPsychHandler}>
            <img src={arrowPic}/>
            {/* <span className={s.arrow}>→</span> */}
            <span>показать психологов</span>
        </div>
    </div>
}