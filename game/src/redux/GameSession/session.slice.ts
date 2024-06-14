import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IMinigames, IModules, IStats, Minigames, Modules, Stats } from './game.types'


export interface GameState {
    id?: string
    username?: string
    email?: string
    created_at?: string
    updated_at?: string
    stats: IStats
    modules: IModules
    minigames: IMinigames
}

const initialState: GameState = {
    id: undefined,
    username: undefined,
    email: undefined,
    created_at: undefined,
    updated_at: undefined,
    stats: Stats,
    modules: Modules,
    minigames: Minigames,
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGame: (state, action: PayloadAction<GameState>) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.email = action.payload.email
            state.created_at = action.payload.created_at
            state.updated_at = action.payload.updated_at
            state.stats = action.payload.stats
            state.modules = action.payload.modules
            state.minigames = action.payload.minigames
        },
        setIsReturned: (state, action: PayloadAction<boolean>) => {
            state.stats.isReturned = action.payload
        },
    }
})

export const getGameState = (state: RootState) => state.game

export const getStats = (state: RootState) => state.game.stats
export const getModules = (state: RootState) => state.game.modules
export const getMinigame = (state: RootState) => state.game.minigames

export const getIsReturned = (state: RootState) => state.game.stats.isReturned
export const getUsername = (state: RootState) => state.game.username

export const { setGame, setIsReturned } = gameSlice.actions

export default gameSlice