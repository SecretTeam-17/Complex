import React from "react";

import "./WikiScreen.css";

const WikiScreen: React.FC = () => {
    const changeCategory = (e) => {
        e.preventDefault();
        if (e.target.textContent === "мини игры") {
            e.target.textContent = "модули";
            e.target.parentElement.children[0].src =
                "../../../../public/assets/ui/modules-icon.png";
            e.target.parentElement.children[0].alt = "modules";
        } else {
            e.target.textContent = "мини игры";
            e.target.parentElement.children[0].src =
                "../../../../public/assets/ui/book-icon.png";
            e.target.parentElement.children[0].alt = "mini games";
        }
    };

    return (
        <div className="wiki-container">
            <div className="wiki__wrapper">
                <img
                    src="../../../../public/assets/ui/book-icon.png"
                    className="wiki__icon"
                    alt="game"
                    width={75}
                    height={65}
                />
                <button
                    className="button button--small"
                    type="button"
                    onClick={changeCategory}
                >
                    мини игры
                </button>
            </div>
            <div className="wiki__wrapper">
                <img
                    src="../../../../public/assets/ui/game-icon.png"
                    className="wiki__icon"
                    alt="game"
                    width={85}
                    height={65}
                />
                <button className="button button--small" type="button">
                    обучение
                </button>
            </div>
        </div>
    );
};

export default WikiScreen;
