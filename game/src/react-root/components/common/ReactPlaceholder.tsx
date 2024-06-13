import React from "react";

import {
    getAuth,
    getCurrentScene,
    getGreeting,
    getStuding,
} from "../../../redux/GameConfig/config.slice";
import { useAppSelector } from "../../../redux/hooks";
import AuthScreen from "../screens/AuthScreen";
import GreetingScreen from "../screens/GreetingScreen";
import WikiScreen from "../screens/WikiScreen";
import ServiceButton from "../ui/ServiceButton";
import "./reactPlaceholder.css";

const ReactPlaceholder: React.FC = () => {
    const isAuth = useAppSelector(getAuth);
    const isGreeting = useAppSelector(getGreeting);
    const isStuding = useAppSelector(getStuding);

    const currentScene = useAppSelector(getCurrentScene);

    return (
        <div className="react-parent">
            <div className="react-content">
                {!isAuth && currentScene === "StartScreen" && <AuthScreen />}
                {isGreeting && currentScene === "StartScreen" && (
                    <GreetingScreen />
                )}
                {isStuding && currentScene === "StartScreen" && <WikiScreen />}

                <ServiceButton />
            </div>
        </div>
    );
};

export default ReactPlaceholder;

