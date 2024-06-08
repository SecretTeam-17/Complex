import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


interface ConfigState {
    sound: boolean
}

const initialState: ConfigState = {
    sound: true,
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setSoundOn: state => {
            state.sound = true
        },
        setSoundOff: state => {
            state.sound = false
        }
    },

})

export const getSoundPosition = (state: RootState) => state.config.sound

export const { setSoundOn, setSoundOff } = configSlice.actions

export default configSlice