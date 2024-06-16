import React from "react";
import { Provider } from "react-redux";

import PhaserRoot from "../phaser-root/PhaserRoot";
import { store } from "../redux/store";
import ReactPlaceholder from "./components/common/ReactPlaceholder";
import ReactRoot from "./components/common/ReactRoot";

import "./App.css";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="overlay">
                <div className="imgRotatePhone">
                    <img src="/rotate-phone.png" />
                    <p className="imgRotatePhoneText">Переверните экран.</p>
                    <p className="imgRotatePhoneRecommend">
                        Убедитесь что у вас включён автоповорот экрана.
                    </p>
                </div>
            </div>
            <div className="app-root">
                <ReactRoot>
                    <ReactPlaceholder />
                </ReactRoot>
                <PhaserRoot />
            </div>
        </Provider>
    );
};

export default App;

