import React from "react";

import AuthForm from "./AuthForm";
import "./AuthScreen.css";

const AuthScreen: React.FC = () => {
    return (
        <div className="container">
            <div className="wrapper__form">
                <div className="wrapper__form-greeting">
                    <h1 className="wrapper__form-greeting-title">
                        Приветствую!
                    </h1>
                    <p className="wrapper__form-greeting-desc">
                        Здесь ты узнаешь секреты ухода за собаками и научишься
                        распознавать их потребности. Готов начать это
                        захватывающее приключение?
                    </p>
                </div>
                <AuthForm />
            </div>
        </div>
    );
};

export default AuthScreen;
