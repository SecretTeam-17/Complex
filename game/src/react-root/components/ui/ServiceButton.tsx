import React from "react";

import {
    getAuth,
    getStuding,
    setAuth,
    setStuding,
} from "../../../redux/GameConfig/config.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "./ServiceButton.css";

const ServiceButton: React.FC = () => {
    const isAuth = useAppSelector(getAuth);
    const isStuding = useAppSelector(getStuding);

    const dispatch = useAppDispatch();

    return (
        <div className="service-button">
            <button
                className="button-toggler"
                onClick={() => {
                    dispatch(setAuth(!isAuth));
                }}
            >
                {`Auth ${isAuth ? "Yes" : "No"}`}
            </button>
            <button
                className="button-toggler"
                onClick={() => {
                    dispatch(setStuding(!isStuding));
                }}
            >
                {`Lessons ${isStuding ? "Yes" : "No"}`}
            </button>
        </div>
    );
};

export default ServiceButton;

