import React from "react";

import { getSoundPosition, setSoundOff } from "../../redux/GameConfig/config.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./reactPlaceholder.css";

const ReactPlaceholder: React.FC = () => {
    const SoundState = useAppSelector(getSoundPosition);
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
                        dispatch(setSoundOff());
                    }}
                >
                    {`Sound ${SoundState ? "On" : "Off"}`}
                </button>
            </div>
        </div>
    );
};

export default ReactPlaceholder;

