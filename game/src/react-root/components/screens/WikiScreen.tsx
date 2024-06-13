import React from "react";

import "./WikiScreen.css";

const WikiScreen: React.FC = () => {
    return (
        <div className="wiki-container">
            <div className="wiki__wrapper">
                <img
                    src="../../../../public/assets/ui/book-icon.png"
                    className="wiki__icon"
                    alt="game"
                />
                <button
                    className="button button--small"
                    type="button"
                    onClick={submitData}
                >
                    мини игры
                </button>
            </div>
            <div className="wiki__wrapper">
                <img
                    src="../../../../public/assets/ui/game-icon.png"
                    className="wiki__icon"
                    alt="game"
                />
                <button className="button button--small" type="button">
                    обучение
                </button>
            </div>
        </div>
    );
};

export default WikiScreen;
