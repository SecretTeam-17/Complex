import React from "react";

import "./GreetingScreen.css";

const GreetingScreen: React.FC = () => {
    return (
        <div className="instruction__wrapper">
            <h2 className="instruction__wrapper-title">Инструкция</h2>
            <p className="instruction__wrapper-text">
                В этой игре вы будете проходить через различные задания и
                ситуации, чтобы улучшить свои навыки догситтера
            </p>
            <button className="button" type="button">
                начать
            </button>
        </div>
    );
};

export default GreetingScreen;

