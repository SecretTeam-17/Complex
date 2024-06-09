import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


interface ConfigState {
    sound: boolean
    soundPlaying: boolean
}

const initialState: ConfigState = {
    sound: true,
    soundPlaying: false,
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
    }
})

export const getSoundOn = (state: RootState) => state.config.sound
export const getSoundPlaying = (state: RootState) => state.config.soundPlaying

export const { setSound, setMusicPlaying } = configSlice.actions

export default configSlice