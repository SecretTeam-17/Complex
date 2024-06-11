import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


interface ConfigState {
    sound: boolean
    soundPlaying: boolean

    ReactVisible: boolean
    isAuth: boolean
    isGreeting: boolean
    isStuding: boolean

    currentScene: string
    inModuleScene: string
}

const initialState: ConfigState = {
    sound: true,
    soundPlaying: false,
    ReactVisible: false,
    isAuth: false,
    isGreeting: false,
    isStuding: false,
    currentScene: 'StartScreen',
    inModuleScene: ''
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setSound: (state, action) => {
            state.sound = action.payload
        },
        setMusicPlaying: (state, action) => {
            state.soundPlaying = action.payload
        },
        setReactVisible: (state, action) => {
            state.ReactVisible = action.payload
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setGreeting: (state, action) => {
            state.isGreeting = action.payload
        },
        setStuding: (state, action) => {
            state.isStuding = action.payload
        },
        setCurrentScene: (state, action) => {
            state.currentScene = action.payload
        },
        setModuleScene: (state, action) => {
            state.inModuleScene = action.payload
        },
    }
})

export const getSoundOn = (state: RootState) => state.config.sound
export const getSoundPlaying = (state: RootState) => state.config.soundPlaying

export const getReactVisible = (state: RootState) => state.config.ReactVisible

export const getAuth = (state: RootState) => state.config.isAuth
export const getGreeting = (state: RootState) => state.config.isGreeting
export const getStuding = (state: RootState) => state.config.isStuding
export const getCurrentScene = (state: RootState) => state.config.currentScene

export const getInModuleScene = (state: RootState) => state.config.inModuleScene

export const { setSound, setMusicPlaying, setAuth, setGreeting, setStuding, setCurrentScene, setReactVisible, setModuleScene } = configSlice.actions

export default configSlice