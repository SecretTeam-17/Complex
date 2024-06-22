import { Boot } from "./Boot.ts"
import { MainMenu } from './MainMenu.ts'
import { ModuleOne } from './ModuleOne/ModuleOne.ts'
import { Preloader } from './Preloader.ts'
import { StartScreen } from './StartScreen.ts'

export const scenes = [
    Boot,
    Preloader,
    StartScreen,
    MainMenu,
    ModuleOne,
]

