import { useEffect, useState } from "react";
import "./AuthForm.css";
import { startConfetti } from "./confetti.tsx";

const AuthForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    //Проверка правильности имени
    const changeName = (e:any) => {
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
    //Проверка правильности почты
    const changeEmail = (e:any) => {
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

    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);

    const [nameError, setNameError] = useState("Имя не может быть пустым");
    const [emailError, setEmailError] = useState("Email не может быть пустым");

    const blurHandler = (e:any) => {
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

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailError || nameError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, emailError]);

    const submitData = (e:any) => {
        e.preventDefault();
        startConfetti(3000, 100, 5000);

        // Что мы делаем дальше с данными формы
        console.log(name, email);
    };

    return (
        <form className="form__greeting">
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
                    onBlur={(e) => blurHandler(e)}
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
                    onBlur={(e) => blurHandler(e)}
                    placeholder="Имя"
                />
            </div>
            <button
                className="button button--big"
                disabled={!formValid}
                type="submit"
                onClick={submitData}
            >
                начать
            </button>
        </form>
    );
};

export default AuthForm;
