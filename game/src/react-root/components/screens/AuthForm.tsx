import { useEffect, useState } from "react";
import { setAuth } from "../../../redux/GameConfig/config.slice";
import {
    getMinigame,
    getModules,
    getStats,
    setGame,
} from "../../../redux/GameSession/session.slice";
import { useCreateSessionMutation } from "../../../redux/apiSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "./AuthForm.css";

const AuthForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameError, setNameError] = useState("Имя не может быть пустым");
    const [emailError, setEmailError] = useState("Email не может быть пустым");
    const [formValid, setFormValid] = useState(false);

    const dispatch = useAppDispatch();
    const [createSession, { data, isSuccess, isError, error }] =
        useCreateSessionMutation();

    const stats = useAppSelector(getStats);
    const modules = useAppSelector(getModules);
    const minigames = useAppSelector(getMinigame);

    useEffect(() => {
        if (isSuccess && data) {
            console.log("Сессия успешно создана:", data);
            dispatch(setGame(data));
            localStorage.setItem("sessionId", data.id ?? "");
            dispatch(setAuth(true));
        } else if (isError) {
            console.error("Не удалось создать сессию:", error);
        }
    }, [isSuccess, data, isError, error, dispatch]);

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        const re = /^([а-яА-Я]{1}[а-яё]{1,23}|[a-zA-Z]{1}[a-z]{1,23})$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            e.target.style.backgroundColor = "var(--color-secondary-red-error)";
            setNameError("Некорректное имя");
        } else {
            e.target.style.backgroundColor = "white";
            setNameError("");
        }
    };

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const re = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            e.target.style.backgroundColor = "var(--color-secondary-red-error)";
            setEmailError("Некорректный email");
        } else {
            e.target.style.backgroundColor = "white";
            setEmailError("");
        }
    };

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "name":
                setNameDirty(true);
                break;
            case "email":
                setEmailDirty(true);
                break;
            default:
        }
    };

    useEffect(() => {
        if (emailError || nameError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, emailError]);

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const request = {
            username: name,
            email: email,
            stats: stats,
            modules: modules,
            minigames: minigames,
        };
        createSession(request);
    };

    return (
        <form className="form__greeting" onSubmit={submitData}>
            <div className="user-box">
                {emailDirty && emailError && (
                    <div className="error1">{emailError}</div>
                )}
                <input
                    className="form__greeting-input"
                    required
                    type="email"
                    value={email}
                    name="email"
                    onChange={changeEmail}
                    onBlur={blurHandler}
                    placeholder="Электронная почта"
                />
            </div>
            <div className="user-box">
                {nameDirty && nameError && (
                    <div className="error2">{nameError}</div>
                )}
                <input
                    className="form__greeting-input"
                    required
                    type="text"
                    value={name}
                    name="name"
                    onChange={changeName}
                    onBlur={blurHandler}
                    placeholder="Имя"
                />
            </div>
            <button
                className="button button--big"
                disabled={!formValid}
                type="submit"
            >
                начать
            </button>
        </form>
    );
};

export default AuthForm;

