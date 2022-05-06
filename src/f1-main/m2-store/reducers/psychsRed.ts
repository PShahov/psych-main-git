import {apiMain, PsychType, SexType, TagType} from '../../m3-API/apiMain';
import {Dispatch} from 'redux';
import {AppThunk} from '../store';

enum EnumPsychPageActionType {
    setAllPsych = 'PSYCHPAGE/SET-ALL-PSYCH',
    setAllTags = 'PSYCHPAGE/SET-ALL-TAGS',
    changeRequestStatusType = 'CARDS/CHANGE-REQUEST-STATUS-TYPE',
    changeRequestCity = 'CARDS/CHANGE-REQUEST-',
    changeRequestCommunication = 'CARDS/CHANGE-REQUEST-OFFLINE-COMMUNICATION',
    changeRequestSex = 'CARDS/CHANGE-REQUEST-SEX',
    changeRequestTagsId = 'CARDS/CHANGE-REQUEST-TAGS-ID',

    
    changeListItemsCount = 'CARDS/CHANGE-LIST-ITEMS-COUNT',
}

const initialState = {
    allPsychs: [] as PsychType[],
    requestStatus: 'idle' as RequestStatusType,
    request: {
        city: 'other',
        offlineCommunication: false,
        onlineCommunication: false,
        sex: 'Any' as SexType | '',
        tagsIds: [] as number[],
    },
    isRequested: false,
    listItemsCount: 5,
    allTags: [] as TagType[],
}

export const psychsRed = (state: InitialStateType = initialState, action: PsychPageActionType): InitialStateType => {
    switch (action.type) {
        case EnumPsychPageActionType.setAllPsych:
        case EnumPsychPageActionType.setAllTags:
        case EnumPsychPageActionType.changeRequestStatusType:
            return {...state, ...action.payload}
        case EnumPsychPageActionType.changeRequestCity:
        case EnumPsychPageActionType.changeRequestSex:
        case EnumPsychPageActionType.changeRequestTagsId:
        case EnumPsychPageActionType.changeRequestCommunication:
            return {...state, request: {...state.request, ...action.payload}}
        case EnumPsychPageActionType.changeListItemsCount:
            return {...state, ...action.payload}
        default:
            return state
    }
}
//action
const setPsychAC = (allPsychs: PsychType[]) => {
    return {
        type: EnumPsychPageActionType.setAllPsych,
        payload: {allPsychs}
    } as const
}
const setAllTagsAC = (allTags: TagType[]) => {
    return {
        type: EnumPsychPageActionType.setAllTags,
        payload: {allTags}
    } as const
}
const changeRequestStatusAC = (requestStatus: RequestStatusType) => {
    return {
        type: EnumPsychPageActionType.changeRequestStatusType,
        payload: {requestStatus}
    } as const
}
export const changeRequestCityAC = (city: string) => {
    return {
        type: EnumPsychPageActionType.changeRequestCity,
        payload: {city}
    } as const
}
export const changeRequestSexAC = (sex: SexType | '') => {
    return {
        type: EnumPsychPageActionType.changeRequestSex,
        payload: {sex}
    } as const
}
export const changeRequestTagsId = (tagsIds: number[]) => {
    return {
        type: EnumPsychPageActionType.changeRequestTagsId,
        payload: {tagsIds}
    } as const
}
export const changeRequestCommunicationAC = (offlineCommunication: boolean, onlineCommunication: boolean) => {
    return {
        type: EnumPsychPageActionType.changeRequestCommunication,
        payload: {offlineCommunication, onlineCommunication}
    } as const
}
export const changeListItemsCountAC = (count: number) => {
    console.log(count);
    return {
        type: EnumPsychPageActionType.changeListItemsCount,
        payload: {count}
    } as const
}


//thunk
export const setAllPsychTC = (): AppThunk => async dispatch => {
    dispatch(changeRequestStatusAC('loading'))
    try {
        const res = await apiMain.getAllPsychs()
        dispatch(setPsychAC(res))
        dispatch(changeRequestStatusAC('succeeded'))
    } catch (e) {
        dispatch(changeRequestStatusAC('failed'))
    }
}
export const setAllTagsTC = (): AppThunk => async dispatch => {
    dispatch(changeRequestStatusAC('loading'))
    try {
        const res = await apiMain.getTags()
        dispatch(setAllTagsAC(res))
        dispatch(changeRequestStatusAC('succeeded'))
    } catch (e) {
        dispatch(changeRequestStatusAC('failed'))
    }
}
export const setFilteredPsychTC = (): AppThunk => async (dispatch, getState) => {
    dispatch(changeRequestStatusAC('loading'))
    console.log("setFilteredPsychTC");
    const data = getState().psychs.request;
    try {
        const res = await apiMain.getFilteredPsych(data);
        
        console.log(res);
        dispatch(setPsychAC(res));
        dispatch(changeRequestStatusAC('succeeded'))
    } catch (e) {
        dispatch(changeRequestStatusAC('failed'))
    }
}


//type
type InitialStateType = typeof initialState
export type PsychPageActionType =
    | ReturnType<typeof setPsychAC>
    | ReturnType<typeof changeRequestStatusAC>
    | ReturnType<typeof setAllTagsAC>
    | ReturnType<typeof changeRequestCityAC>
    | ReturnType<typeof changeRequestSexAC>
    | ReturnType<typeof changeRequestTagsId>
    | ReturnType<typeof changeRequestCommunicationAC>
    | ReturnType<typeof changeListItemsCountAC>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'