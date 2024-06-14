import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


interface ConfigState {
    sound: boolean
    soundPlaying: boolean

    ReactVisible: boolean
    isAuth: boolean
    isStuding: boolean

    currentScene: string
    inModuleScene: string
}

const initialState: ConfigState = {
    sound: true,
    soundPlaying: false,
    ReactVisible: false,
    isAuth: false,
    isStuding: false,
    currentScene: 'StartScreen',
    inModuleScene: ''
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
        setModuleScene: (state, action: PayloadAction<string>) => {
            state.inModuleScene = action.payload
        },
    }
})

export const getSoundOn = (state: RootState) => state.config.sound
export const getSoundPlaying = (state: RootState) => state.config.soundPlaying

export const getReactVisible = (state: RootState) => state.config.ReactVisible

export const getAuth = (state: RootState) => state.config.isAuth
export const getStuding = (state: RootState) => state.config.isStuding
export const getCurrentScene = (state: RootState) => state.config.currentScene

export const getInModuleScene = (state: RootState) => state.config.inModuleScene

export const { setSound, setMusicPlaying, setAuth, setStuding, setCurrentScene, setReactVisible, setModuleScene } = configSlice.actions

export default configSlice