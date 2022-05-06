import s from '../Request.module.css'
import React, {useEffect, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useDispatch} from 'react-redux';
import {changeRequestCityAC} from '../../../f1-main/m2-store/reducers/psychsRed';

export const City = () => {
    const dispatch = useDispatch()

    const [city, setCity] = React.useState('other');

    const handleChange = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };
    const [isInitial, setIsInitial] = useState<1 | null>(null)
    useEffect(() => {
        if (isInitial) {
            dispatch(changeRequestCityAC(city))
        }
        setIsInitial(1)
    }, [city])
    return <div className={s.request}>
        <div className={s.inputName}>Город</div>
        <FormControl fullWidth size="small">
            <Select style={{borderRadius: 30}}
                    labelId="RequestCity"
                    id="RequestCity"
                    value={city}
                    onChange={handleChange}
            >
                <MenuItem value="spb">Санкт-Петербург</MenuItem>
                <MenuItem value="other">Другой город</MenuItem>
            </Select>
        </FormControl>
    </div>
}