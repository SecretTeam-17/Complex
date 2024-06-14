import React from "react";
import { setReactVisible } from "../../../redux/GameConfig/config.slice";
import {
    getGameState,
    getIsReturned,
    getUsername,
    setIsReturned,
} from "../../../redux/GameSession/session.slice";
import { useUpdateSessionMutation } from "../../../redux/apiSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "./GreetingScreen.css";

const NewPlayerComponent: React.FC<{ onStart: () => void }> = ({ onStart }) => (
    <div className="instruction__wrapper">
        <h2 className="instruction__wrapper-title">Инструкция</h2>
        <p className="instruction__wrapper-text">
            В этой игре вы будете проходить через различные задания и ситуации,
            чтобы улучшить свои навыки догситтера
        </p>
        <button className="button" type="button" onClick={onStart}>
            начать
        </button>
    </div>
);

interface ReturningPlayerComponentProps {
    username: string;
    onContinue: () => void;
}

const ReturningPlayerComponent: React.FC<ReturningPlayerComponentProps> = ({
    username,
    onContinue,
}) => (
    <div className="instruction__wrapper">
        <h2 className="instruction__wrapper-title">
            Добро пожаловать, {username}!
        </h2>
        <p className="instruction__wrapper-text">
            С возвращением! Продолжайте с того места, где вы остановились.
        </p>
        <button className="button" type="button" onClick={onContinue}>
            продолжить
        </button>
    </div>
);

const GreetingScreen: React.FC = () => {
    const dispatch = useAppDispatch();

    const [updateSession] = useUpdateSessionMutation();

    const gameState = useAppSelector(getGameState);
    const isReturned = useAppSelector(getIsReturned);
    const username = useAppSelector(getUsername) || "Игрок";

    const handleStart = () => {
        dispatch(setIsReturned(true));
        dispatch(setReactVisible(false));
        const updatedGameState = {
            ...gameState,
            stats: {
                ...gameState.stats,
                isReturned: true,
            },
        };
        updateSession(updatedGameState);
    };

    const handleContinue = () => {
        dispatch(setReactVisible(false));
    };

    return isReturned ? (
        <ReturningPlayerComponent
            username={username}
            onContinue={handleContinue}
        />
    ) : (
        <NewPlayerComponent onStart={handleStart} />
    );
};

export default GreetingScreen;

