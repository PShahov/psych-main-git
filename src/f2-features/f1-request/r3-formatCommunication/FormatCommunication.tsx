import s from '../Request.module.css';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import {makeStyles , useTheme} from '@mui/material/styles';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeRequestCommunicationAC} from '../../../f1-main/m2-store/reducers/psychsRed';

export const FormatCommunication = () => {
    const dispatch = useDispatch()
    const [formatCommunication, setFormatCommunication] = React.useState('other');

    const handleChange = (event: SelectChangeEvent) => {
        setFormatCommunication(event.target.value as string)
    };
    const [isInitial, setIsInitial] = useState<1 | null>(null)
    useEffect(() => {
        if (isInitial) {
            if(formatCommunication == 'other')
                dispatch(changeRequestCommunicationAC(false, false));
            else
                formatCommunication === 'onlineCommunication' ? dispatch(changeRequestCommunicationAC(false, true)) : (changeRequestCommunicationAC(true, false))
        }
        setIsInitial(1)
    }, [formatCommunication])


    return <div className={s.request}>
        <div className={s.inputName}>Формат общения</div>
        <FormControl fullWidth size="small">
            <Select style={{borderRadius: 30}}
                    labelId="RequestCity"
                    id="RequestCity"
                    value={formatCommunication}
                    onChange={handleChange}
            >
                <MenuItem value="onlineCommunication">Онлайн</MenuItem>
                <MenuItem value="offlineCommunication">Оффлайн</MenuItem>
                <MenuItem value="other">Не важно</MenuItem>
            </Select>
        </FormControl>
    </div>
}