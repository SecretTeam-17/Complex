import { Scene } from 'phaser'
import { AUDIO, BACKGROUNDS, INGAMEUI, MASCOTS, UI } from '../constants/assetConstants'
import { GAMEONE, GAMETHREE, GAMETWO } from '../constants/miniGamesConstants'
import { MOODULEFOUR } from '../constants/moduleFourConstants'
import { MOODULEONE } from '../constants/moduleOneConstants'
import { MOODULETHREE } from '../constants/moduleThreeConstants'
import { MOODULETWO } from '../constants/moduleTwoConstants'

export function loadAssets(scene: Scene) {

    // Audio
    scene.load.audio("bgMusic", 'audio/bgMusic.mp3')
    scene.load.audio(AUDIO.BUTTONCLICK, 'audio/knopka_sound.mp3')

    // Pre-images
    scene.load.image(MOODULEONE.PREIMAGE, 'modules/pre-module-one.png')
    scene.load.image(MOODULETWO.PREIMAGE, 'modules/pre-module-two.png')
    scene.load.image(MOODULETHREE.PREIMAGE, 'modules/pre-module-three.png')
    scene.load.image(MOODULEFOUR.PREIMAGE, 'modules/pre-module-four.png')

    scene.load.image(GAMEONE.PREIMAGE, 'games/pre-game-one.png')
    scene.load.image(GAMETWO.PREIMAGE, 'games/pre-game-two.png')
    scene.load.image(GAMETHREE.PREIMAGE, 'games/pre-game-three.png')

    // Backgrounds
    scene.load.image(BACKGROUNDS.STARTSCREEN, 'ui/startScreen-bg.png')

    // UI Main Header
    scene.load.image(UI.MAINLOGO, 'ui/petsitter-logo.png')
    scene.load.image(UI.SETTINGS, 'ui/settings-icon.png')
    scene.load.image(UI.BURGER, 'ui/burger-icon.png')

    scene.load.image(UI.PANEL, 'ui/menu-panel.png')
    scene.load.image(UI.CARDPANEL, 'ui/card-button.png')
    scene.load.image(UI.MODULEPANEL, 'ui/module-card.png')
    scene.load.image(UI.MINIMODULE, 'ui/miniModule.png')

    scene.load.image(UI.VOICEON, 'ui/Voice.png')
    scene.load.image(UI.VOICEOFF, 'ui/VoiceOff.png')
    scene.load.image(UI.SITE, 'ui/exit.png')
    scene.load.image(UI.BOOK, 'ui/book-icon.png')
    scene.load.image(UI.GAME, 'ui/game-icon.png')
    scene.load.image(UI.MODULE, 'ui/modules-icon.png')

    // inGame UI
    scene.load.image(INGAMEUI.BAG, 'ui/bag-icon.png')
    scene.load.image(INGAMEUI.PHONE, 'ui/phone-icon.png')
    scene.load.image(INGAMEUI.BOX, 'ui/box-icon.png')
    scene.load.image(INGAMEUI.TRASH, 'ui/trash-icon.png')
    scene.load.image(INGAMEUI.STAR, 'ui/Star.png')

    // Buttons
    scene.load.image(UI.BUTTON.NORMAL, 'ui/buttonNormal.png')
    scene.load.image(UI.BUTTON.HOVER, 'ui/buttonHover.png')
    scene.load.image(UI.BUTTON.DISABLE, 'ui/buttonDisable.png')

    scene.load.image(UI.ICONBUTTON.NORMAL, 'ui/iconButtonNormal.png')
    scene.load.image(UI.ICONBUTTON.HOVER, 'ui/iconButtonHover.png')
    scene.load.image(UI.ICONBUTTON.DISABLE, 'ui/iconButtonDisable.png')

    // Mascots
    scene.load.image(MASCOTS.MASCOTCAT.BASE, 'ui/mascotCat.png')
    scene.load.image(MASCOTS.MASCOTDOG.BASE, 'ui/mascotDog.png')

    //---------------- Module One
    // Audio
    scene.load.audio(MOODULEONE.AUDIO.KEYBOARD, 'audio/keyboard.mp3')
    scene.load.audio(MOODULEONE.AUDIO.MESSAGE, 'audio/notification_sound_2.mp3')
    scene.load.audio(MOODULEONE.AUDIO.KNOPKA, 'audio/knopka_sound.mp3')
    scene.load.audio(MOODULEONE.AUDIO.COMPLETE, 'audio/level_completed.mp3')
    scene.load.audio(MOODULEONE.AUDIO.CALL, 'audio/callNumber.mp3')
    // Backgrounds
    scene.load.image(MOODULEONE.BACKGROUNDS.ROOMVIEWONE, 'modules/one/roomone.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.ROOMVIEWTWO, 'modules/one/roomtwo.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.KITCHEN, 'modules/one/kitchen.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.COMPUTER1, 'modules/one/nearComputer1.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.COMPUTER2, 'modules/one/nearComputer2.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.HUB, 'modules/one/HUB.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.PHONEONE, 'modules/one/PhoneOne.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.ONSOFA, 'modules/one/onSofa.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.CALLONE, 'modules/one/callOne.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.CALLTWO, 'modules/one/callTwo.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.ROOMRIGHT, 'modules/one/roomRight.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.PHONETWO, 'modules/one/phoneScreen.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.BLURROOM, 'modules/one/blurRoom.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.TOYSGAME, 'modules/one/bgLast.png')
    scene.load.image(MOODULEONE.BACKGROUNDS.BAG, 'modules/one/bag.jpg')
    // UI Elements
    scene.load.image(MOODULEONE.MINCUTE, 'modules/one/mingcute.png')
    scene.load.image(MOODULEONE.BALOON, 'modules/one/instruction.png')
    scene.load.image(MOODULEONE.CHECKBOXOFF, 'modules/one/CheckboxOff.png')
    scene.load.image(MOODULEONE.CHECKBOXON, 'modules/one/CheckboxOn.png')
    scene.load.image(MOODULEONE.LISTFULL, 'modules/one/listFull.png')
    scene.load.image(MOODULEONE.LISTBLANK, 'modules/one/listBlank.png')
    scene.load.image(MOODULEONE.LISTMEMORY, 'modules/one/blankMemory.png')
    scene.load.image(MOODULEONE.INVENTARY, 'modules/one/inventary.png')
    // ------------- Collect Room
    scene.load.image(MOODULEONE.COLLECTONE.title, 'modules/one/collectOne/title.png')
    scene.load.image(MOODULEONE.COLLECTONE.blank, 'modules/one/collectOne/blank.png')
    scene.load.image(MOODULEONE.COLLECTONE.neck, 'modules/one/collectOne/neck.png')
    scene.load.image(MOODULEONE.COLLECTONE.bone, 'modules/one/collectOne/bone.png')
    scene.load.image(MOODULEONE.COLLECTONE.milk, 'modules/one/collectOne/milk.png')
    scene.load.image(MOODULEONE.COLLECTONE.plain, 'modules/one/collectOne/plain.png')
    scene.load.image(MOODULEONE.COLLECTONE.hat, 'modules/one/collectOne/hat.png')
    scene.load.image(MOODULEONE.COLLECTONE.food, 'modules/one/collectOne/food.png')
    scene.load.image(MOODULEONE.COLLECTONE.misk, 'modules/one/collectOne/misk.png')
    scene.load.image(MOODULEONE.COLLECTONE.photo, 'modules/one/collectOne/photo.png')
    scene.load.image(MOODULEONE.COLLECTONE.bag, 'modules/one/collectOne/bag.png')
    scene.load.image(MOODULEONE.COLLECTONE.baloon1, 'modules/one/collectOne/between1.png')
    scene.load.image(MOODULEONE.COLLECTONE.baloon2, 'modules/one/collectOne/between2.png')
    scene.load.image(MOODULEONE.COLLECTONE.trash, 'modules/one/collectOne/trash.png')
    scene.load.image(MOODULEONE.COLLECTONE.scissors, 'modules/one/collectOne/scisors.png')
    scene.load.image(MOODULEONE.COLLECTONE.povodok, 'modules/one/collectOne/povodok.png')
    scene.load.image(MOODULEONE.COLLECTONE.shetka, 'modules/one/collectOne/shetka.png')
    scene.load.image(MOODULEONE.COLLECTONE.tabs, 'modules/one/collectOne/koleso.png')
    // ------------- Toys game
    scene.load.image(MOODULEONE.TOYSGAME.title, 'modules/one/collectTwo/title.png')
    scene.load.image(MOODULEONE.TOYSGAME.frisbitext, 'modules/one/collectTwo/frisbiText.png')
    scene.load.image(MOODULEONE.TOYSGAME.frisbiicon, 'modules/one/collectTwo/frisbiIcon.png')
    scene.load.image(MOODULEONE.TOYSGAME.vorottext, 'modules/one/collectTwo/vorotText.png')
    scene.load.image(MOODULEONE.TOYSGAME.voroticon, 'modules/one/collectTwo/vorotIcon.png')
    scene.load.image(MOODULEONE.TOYSGAME.toytext, 'modules/one/collectTwo/toyText.png')
    scene.load.image(MOODULEONE.TOYSGAME.toyicon, 'modules/one/collectTwo/toyIcon.png')
    scene.load.image(MOODULEONE.TOYSGAME.cunttext, 'modules/one/collectTwo/cuntText.png')
    scene.load.image(MOODULEONE.TOYSGAME.cunticon, 'modules/one/collectTwo/cuntIcon.png')
    scene.load.image(MOODULEONE.TOYSGAME.kongtext, 'modules/one/collectTwo/kongText.png')
    scene.load.image(MOODULEONE.TOYSGAME.kongicon, 'modules/one/collectTwo/kongIcon.png')
}