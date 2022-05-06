import s from '../Request.module.css'
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {SexType} from '../../../f1-main/m3-API/apiMain';
import { changeRequestSexAC } from '../../../f1-main/m2-store/reducers/psychsRed';

export const Sex = () => {
    const dispatch = useDispatch()
    const [sex, setSex] = React.useState<SexType|''>('Any');

    const handleChange = (event: SelectChangeEvent) => {
        setSex(event.target.value as SexType);
    };
    const [isInitial, setIsInitial] = useState<1 | null>(null)
    useEffect(() => {
        if (isInitial) {
            dispatch(changeRequestSexAC(sex))
        }
        setIsInitial(1)
    }, [sex])
    
    return <div className={s.request}>
        <div className={s.inputName}>Пол</div>
        <FormControl fullWidth size="small">
            <Select style={{borderRadius: 30}}
                    labelId="RequestCity"
                    id="RequestCity"
                    value={sex}
                    onChange={handleChange}
            >
                <MenuItem value="Male">Мужской</MenuItem>
                <MenuItem value="Female">Женский</MenuItem>
                <MenuItem value="Any">Не важно</MenuItem>
            </Select>
        </FormControl>
    </div>
}