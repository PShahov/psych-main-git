import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {psychsRed, PsychPageActionType} from './reducers/psychsRed'

const rootReducer = combineReducers({
    psychs: psychsRed
})
export const store = createStore(rootReducer, applyMiddleware(thunk))


//type

//Типизация санок

export type AppActionType = PsychPageActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = ()=>{
    return useDispatch() as ThunkDispatch<AppRootStateType, unknown, AppActionType>
}

//Типизация стора
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store