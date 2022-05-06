import s from '../Request.module.css'
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import React, {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import {Theme, useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useAppSelector} from '../../../f1-main/m2-store/store';
import {TagType} from '../../../f1-main/m3-API/apiMain';
import {log} from 'util';
import {useDispatch} from 'react-redux';
import {changeRequestTagsId} from '../../../f1-main/m2-store/reducers/psychsRed';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const Theme1 = () => {
    const dispatch = useDispatch()
    const tags = useAppSelector<TagType[]>(state => state.psychs.allTags)
    const theme = useTheme();
    const [tag, setTag] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof tag>) => {
        const {
            target: {value},
        } = event;
        setTag(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const [isInitial, setIsInitial] = useState<1 | null>(null)
    useEffect(() => {
        if (isInitial) {
            dispatch(changeRequestTagsId(tag.map(t => +t)))
        }
        setIsInitial(1)
    }, [tag])
    // console.log(tags);
    return <div className={s.request}>
        <div className={s.inputName}>Тема</div>
        <FormControl fullWidth size="small">
            <Select
                style={{
                    borderRadius: 30,
                    borderColor:'#c2c2eb'
                }}
                id="demo-multiple-name"
                multiple
                value={tag}
                onChange={handleChange}
                // input={<OutlinedInput label="Name"/>}
                MenuProps={MenuProps}

                // sx={{
                //     color:'red',
                //     '.MuiMenuItem-root': {
                //       color: 'red',
                //     },
                //   }}
            >
                {tags.map(t => {
                    return <MenuItem className="MenuItem" key={t.id} value={t.id}
                                     style={getStyles(t.name, tag, theme)}>{t.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    </div>
}