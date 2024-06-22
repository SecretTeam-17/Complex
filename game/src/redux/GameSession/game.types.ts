export interface IMiniGame {
    score: number
}

export interface IModule {
    savePoint: string
    lastPoint: string
    score: number
    isAvailable: boolean
    answers?: [
        {
            question: string
            answer: string
            isCorrect: boolean
        }
    ]
}

export interface IStats {
    isReturned: boolean
    isComplete: boolean
    totalScore: number
}

export interface IModules {
    moduleOne: IModule
    moduleTwo: IModule
    moduleThree: IModule
    moduleFour: IModule
}

export interface IMinigames {
    gameOne: IMiniGame
    gameTwo: IMiniGame
    gameThree: IMiniGame
}

export const Stats: IStats = {
    isReturned: false,
    isComplete: false,
    totalScore: 0
}

export const Modules: IModules = {
    moduleOne: {
        savePoint: 'intro',
        lastPoint: 'intro',
        score: 0,
        isAvailable: true
    },
    moduleTwo: {
        savePoint: 'intro',
        lastPoint: 'intro',
        score: 0,
        isAvailable: false
    },
    moduleThree: {
        savePoint: 'intro',
        lastPoint: 'intro',
        score: 0,
        isAvailable: false
    },
    moduleFour: {
        savePoint: 'intro',
        lastPoint: 'intro',
        score: 0,
        isAvailable: false
    }
}

export const Minigames: IMinigames = {
    gameOne: {
        score: 0
    },
    gameTwo: {
        score: 0
    },
    gameThree: {
        score: 0
    }
}

