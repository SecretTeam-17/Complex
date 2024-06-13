import { configureStore } from '@reduxjs/toolkit'
import configSlice from './GameConfig/config.slice'

export const store = configureStore({
  reducer: {
    [configSlice.name]: configSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<(typeof store)['getState']>
export type AppDispatch = (typeof store)['dispatch']
