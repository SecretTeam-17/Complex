import { configureStore } from '@reduxjs/toolkit'
import configSlice from './GameConfig/config.slice'
import gameSlice from './GameSession/session.slice'
import { apiSlice } from './apiSlice'

export type RootState = {
  [configSlice.name]: ReturnType<typeof configSlice.reducer>;
  [gameSlice.name]: ReturnType<typeof gameSlice.reducer>;
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>
}

export const store = configureStore({
  reducer: {
    [configSlice.name]: configSlice.reducer,
    [gameSlice.name]: gameSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: process.env.NODE_ENV !== 'production',
})

// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
