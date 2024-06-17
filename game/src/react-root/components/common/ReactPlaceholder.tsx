import React from "react";

import {
    getAuth,
    getCurrentScene,
    getStuding,
} from "../../../redux/GameConfig/config.slice";
import { useAppSelector } from "../../../redux/hooks";
import AuthScreen from "../screens/AuthScreen";
import GreetingScreen from "../screens/GreetingScreen";
import WikiScreen from "../screens/WikiScreen";
import "./reactPlaceholder.css";

const ReactPlaceholder: React.FC = () => {
    const isAuth = useAppSelector(getAuth);
    const isStuding = useAppSelector(getStuding);

    const currentScene = useAppSelector(getCurrentScene);

    return (
        <div className="react-parent">
            <div className="react-content">
                {!isAuth && currentScene === "MainMenu" && <AuthScreen />}
                {isAuth && currentScene === "MainMenu" && <GreetingScreen />}
                {isStuding && currentScene === "MainMenu" && <WikiScreen />}
            </div>
        </div>
    );
};

export default ReactPlaceholder;

