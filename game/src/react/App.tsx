import React from "react";
import { Provider } from "react-redux";

import "../../public/style.css";
import PhaserRoot from "../game/PhaserRoot";
import { store } from "../redux/store";
import ReactPlaceholder from "./components/ReactPlaceholder";
import ReactRoot from "./components/ReactRoot";

const App: React.FC = () => {
    return (
        <Provider store={store}>
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

