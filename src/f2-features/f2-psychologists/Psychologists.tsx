import { allPsych } from '../../f1-main/m2-store/reducers/localState';
import {useAppSelector} from '../../f1-main/m2-store/store';
import {PsychType} from '../../f1-main/m3-API/apiMain';
import s from './Psychologists.module.css'
import React, {useEffect, useState, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {changeListItemsCountAC} from '../../f1-main/m2-store/reducers/psychsRed';


import loadPic from '../../f1-main/m1-ui/u4-common/img/load.svg'

export const Psychologists = ({initialCount = 5}) => {
    let allPsychs = useAppSelector<PsychType[]>(state => state.psychs.allPsychs)
    let loadingState = useAppSelector<String>(state => state.psychs.requestStatus)

    console.log(loadingState);
    // allPsychs = allPsychs.slice(0, 6);

    const formatCommunication = (onlineCommunication: boolean, offlineCommunication: boolean) => {
        if (onlineCommunication && offlineCommunication) return <span className={s.opacityStyle} style={{
            marginTop: 10,
            marginBottom: 10
        }}>онлайн/оффлайн</span>
        if (onlineCommunication && !offlineCommunication) return <span className={s.opacityStyle} style={{
            marginTop: 10,
            marginBottom: 10
        }}>онлайн</span>
        return <span className={s.opacityStyle} style={{marginTop: 10, marginBottom: 10}}>оффлайн</span>
    }
    let counter = -1;

    
    const [itemsCount, addItems] = useState(5);
    const toggleClass = () => {
        addItems(itemsCount + 6);
    };
    const [selectedPsych, setSelectedPsych] = useState(-1);
    const selectPsych = (n: number) => {
        console.log(n);
        setSelectedPsych(n);
    };

    return <div className={s.mainContainer}>
        {selectedPsych >= 0 &&
            <div onClick={
                (e)=>{
                    if((e.target as HTMLInputElement).classList.contains(s.psychPopupContainer))
                        selectPsych(-1);
                }
            } className={[s.psychPopupContainer,selectedPsych >= 0 ? '' : s.hidden].join(' ')}>
                
            <div className={s.psychPopup}>
                <div className={s.popupInfo}>
                    <div className={s.infoFirst}>
                        <img
                            src={allPsychs[selectedPsych].urlPhoto ? allPsychs[selectedPsych].urlPhoto : 'https://benimadimcocuk.com/wp-content/uploads/2016/06/default-310x310.png'}
                            alt="Photo of Psych"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src="https://benimadimcocuk.com/wp-content/uploads/2016/06/default-310x310.png";
                            }}/>
                        <div>
                            <span className={s.name} style={{marginTop: 5}}>{allPsychs[selectedPsych].firstName}</span>
                            <span className={s.name}>{allPsychs[selectedPsych].lastName}</span>
                            <span className={[s.status].join(' ')}>{allPsychs[selectedPsych].status}</span>
                            <div className={s.popupLineV}></div>
                            
                            <span className={s.city}>{allPsychs[selectedPsych].city}</span>
                            
                            {formatCommunication(allPsychs[selectedPsych].onlineCommunication, allPsychs[selectedPsych].offlineCommunication)}
                            
                            <span className={s.aboutMe}>{allPsychs[selectedPsych].aboutMe}</span>
                        </div>
                    </div>
                    <div className={s.infoSecond}>
                        <div>
                            <span className={s.secondTitle}>Образование</span>
                            <span className={s.smallText}>{allPsychs[selectedPsych].education}</span>
                        </div>
                        <div>
                            <span className={s.secondTitle}>С кем работает</span>
                            {
                                allPsychs[selectedPsych].tags.map(t => {
                                    return(
                                        <span className={s.smallText}>{t.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={s.popupBook}>
                    <div className={s.popupPrice}>
                            <span className={s.price}>{allPsychs[selectedPsych].price} ₽</span>
                            <span className={s.opacityStyle}>За 60 минут</span>
                    </div>
                    <button className={s.secondA}>Записаться</button>
                </div>
            </div>
        </div>
        }
        {allPsychs.map(p => {
            counter++;
            return (
                <div key={p.id} className={[s.psychContainer,counter > itemsCount ? s.hidden : ""].join(' ')}>
                    <img
                        src={p.urlPhoto ? p.urlPhoto : 'https://benimadimcocuk.com/wp-content/uploads/2016/06/default-310x310.png'}
                        alt="Photo of Psych"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src="https://benimadimcocuk.com/wp-content/uploads/2016/06/default-310x310.png";
                          }}/>
                    <span className={s.name} style={{marginTop: 5}}>{p.firstName}</span>
                    <span className={s.name}>{p.lastName}</span>
                    <span className={[s.opacityStyle,s.status].join(' ')}>{p.status}</span>
                    <div className={s.line}/>
                    <span style={{marginBottom: 10}} className={s.opacityStyle}>{p.age} лет</span>
                    <span className={s.aboutMe}>{p.aboutMe}</span>
                    <span className={s.epBold}>{p.city}</span>
                    <span className={`${s.opacityStyle} ${s.education}`}>{p.education}</span>
                    {formatCommunication(p.onlineCommunication, p.offlineCommunication)}
                    <div className={s.experiencePriceContainer}>
                        <div className={s.experiencePrice}>
                            <span className={s.epBold}>{p.experience} лет</span>
                            <span className={s.opacityStyle}>Опыт</span>
                        </div>
                        <div className={s.experiencePrice}>
                            <span className={s.epBold}>{p.price} ₽</span>
                            <span className={s.opacityStyle}>За 60 минут</span>
                        </div>
                    </div>
                    <br/>   
                    <button className={s.firstA} value={counter} onClick={(e)=>{selectPsych(parseInt((e.target as HTMLInputElement).value));}}>Подробнее</button>
                    <button className={s.secondA}>Записаться</button>
                </div>
            )
        })}

        {
            allPsychs.length > 0 && itemsCount < allPsychs.length &&
            <div className={s.buttonContainer}>
                <button onClick={toggleClass}>Показать еще</button>
            </div>
        }
        {
            allPsychs.length == 0 && loadingState == 'succeeded' &&
            
            <span className={s.notFound}>Психологи по вашему запросу не найдены.</span>
        }
        {
            allPsychs.length == 0 && loadingState != 'succeeded' &&
            
            <img className={s.loadPic} src={loadPic}/>
        }
    </div>
}