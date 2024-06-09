import React from "react";

import {
    getSoundOn,
    setMusicPlaying,
    setSound,
} from "../../redux/GameConfig/config.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./reactPlaceholder.css";

const ReactPlaceholder: React.FC = () => {
    const SoundState = useAppSelector(getSoundOn);
    const dispatch = useAppDispatch();
    return (
        <div className="react-parent">
            <div className="react-content">
                <div className="html-root-tag">
                    React Container (padding: 5%)
                </div>
                <div>React Button</div>
                <button
                    className="music-toggler"
                    onClick={() => {
                        dispatch(setSound(!SoundState));
                        dispatch(setMusicPlaying(!SoundState));
                    }}
                >
                    {`Sound ${SoundState ? "On" : "Off"}`}
                </button>
            </div>
        </div>
    );
};

export default ReactPlaceholder;

