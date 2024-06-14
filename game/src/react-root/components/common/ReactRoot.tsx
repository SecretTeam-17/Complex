import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
    getReactVisible,
    setAuth,
} from "../../../redux/GameConfig/config.slice";
import { setGame } from "../../../redux/GameSession/session.slice";
import { useGetSessionQuery } from "../../../redux/apiSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "./reactRoot.css";

interface StatsUIProps {
    children: ReactNode | ReactNode[];
}

export const ReactRoot: React.FC<StatsUIProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [rootStyle, setRootStyle] = useState({});
    const uiRootRef = useRef<HTMLDivElement>(null);
    const isReactVisible = useAppSelector(getReactVisible);

    const sessionId = localStorage.getItem("sessionId");

    const { data, isSuccess, isError, error } = useGetSessionQuery(
        sessionId || "",
        {
            skip: !sessionId,
        }
    );

    useEffect(() => {
        if (isSuccess && data) {
            console.log("Сессия успешно получена:", data);
            dispatch(setGame(data));
            dispatch(setAuth(true));
        } else if (isError) {
            console.error("Не удалось создать сессию:", error);
        }
    }, [isSuccess, isError, data, error, dispatch]);

    useEffect(() => {
        const phaserParent = document.getElementById("phaser-parent");
        const copySize = () => {
            window.setTimeout(() => {
                if (phaserParent) {
                    const phaserCanvas =
                        phaserParent.getElementsByTagName("canvas")[0];
                    if (phaserCanvas && uiRootRef.current) {
                        setRootStyle((prev) => ({
                            ...prev,
                            marginLeft: phaserCanvas.style.marginLeft,
                            marginTop: phaserCanvas.style.marginTop,
                            height: phaserCanvas.style.height,
                            width: phaserCanvas.style.width,
                        }));
                    }
                }
            }, 0);
        };
        window.addEventListener("resize", copySize);
        copySize();
        return () => {
            window.removeEventListener("resize", copySize);
        };
    }, []);

    return (
        <div
            className={`${
                isReactVisible ? "react-root-show" : "react-root-hide"
            }`}
            ref={uiRootRef}
            style={rootStyle}
        >
            {children}
        </div>
    );
};

export default ReactRoot;

