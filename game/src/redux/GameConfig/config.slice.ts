import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


interface ConfigState {
    sound: boolean
    soundPlaying: boolean

    ReactVisible: boolean
    isAuth: boolean
    isStuding: boolean

    currentScene: string

    score: number
    phone: number
    bag: number
    savePoint: string
}

const initialState: ConfigState = {
    sound: true,
    soundPlaying: false,
    ReactVisible: false,
    isAuth: false,
    isStuding: false,
    currentScene: 'StartScreen',

    score: 0,
    phone: 0,
    bag: 0,
    savePoint: 'intro'
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setSound: (state, action: PayloadAction<boolean>) => {
            state.sound = action.payload
        },
        setMusicPlaying: (state, action: PayloadAction<boolean>) => {
            state.soundPlaying = action.payload
        },
        setReactVisible: (state, action: PayloadAction<boolean>) => {
            state.ReactVisible = action.payload
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setStuding: (state, action: PayloadAction<boolean>) => {
            state.isStuding = action.payload
        },
        setCurrentScene: (state, action: PayloadAction<string>) => {
            state.currentScene = action.payload
        },
        setScore: (state, action: PayloadAction<number>) => {
            state.score = action.payload
        },
        setPhone: (state, action: PayloadAction<number>) => {
            state.phone = action.payload
        },
        setBag: (state, action: PayloadAction<number>) => {
            state.bag = action.payload
        },
        setSavePoint: (state, action: PayloadAction<string>) => {
            state.savePoint = action.payload
        },
    }
})

export const getSoundOn = (state: RootState) => state.config.sound
export const getSoundPlaying = (state: RootState) => state.config.soundPlaying

export const getReactVisible = (state: RootState) => state.config.ReactVisible

export const getAuth = (state: RootState) => state.config.isAuth
export const getStuding = (state: RootState) => state.config.isStuding
export const getCurrentScene = (state: RootState) => state.config.currentScene

export const { setSound, setMusicPlaying, setAuth, setStuding, setCurrentScene, setReactVisible, setPhone, setBag, setScore, setSavePoint } = configSlice.actions

export default configSlice