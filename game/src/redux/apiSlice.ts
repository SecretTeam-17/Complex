import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GameState } from './GameSession/session.slice'


// const API_URL = 'http://95.164.3.230/api'
const API_URL = 'https://gameapi.esoraine.online/api'

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        createSession: builder.mutation<GameState, Partial<GameState>>({
            query: ({ username, email, stats, modules, minigames }) => ({
                url: '/session',
                method: 'POST',
                body: { username, email, stats, modules, minigames }
            }),
        }),
        updateSession: builder.mutation<void, GameState>({
            query: (gameState: GameState) => ({
                url: '/session',
                method: 'PUT',
                body: gameState
            }),
        }),
        getSession: builder.query<GameState, string>({
            query: (gameId: string) => `/session/id/${gameId}`,
        })
    })
})

export const { useCreateSessionMutation, useGetSessionQuery, useUpdateSessionMutation } = apiSlice
