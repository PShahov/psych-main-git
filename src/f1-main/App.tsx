import React, {useEffect} from 'react';
import {Header} from './m1-ui/u1-header/Header';
import {useAppSelector} from '../f1-main/m2-store/store';
import {Psychologists} from '../f2-features/f2-psychologists/Psychologists';
import s from './App.module.css'
import {Footer} from './m1-ui/u2-footer/Footer';
import {Request} from '../f2-features/f1-request/Request';
import {setAllPsychTC, setAllTagsTC} from './m2-store/reducers/psychsRed';
import {useAppDispatch} from './m2-store/store';


function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setAllTagsTC())
        dispatch(setAllPsychTC())
    }, [])
    // console.log(this.state);
    // console.log(dispatch);
    return (
        <div className={s.mainContainer}>
            <Header/>
            <Request/>
            <Psychologists/>
            <Footer/>
        </div>
    );
}

export default App;


