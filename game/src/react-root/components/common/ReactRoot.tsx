import React, { ReactNode, useEffect, useRef, useState } from "react";
import "./reactRoot.css";
import { useAppSelector } from '../../../redux/hooks'
import { getReactVisible } from '../../../redux/GameConfig/config.slice'

interface StatsUIProps {
    children: ReactNode | ReactNode[];
}

export const ReactRoot: React.FC<StatsUIProps> = ({ children }) => {
    const [rootStyle, setRootStyle] = useState({});
    const uiRootRef = useRef<HTMLDivElement>(null);

    const isReactVisible = useAppSelector(getReactVisible)

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
        <div className={`${isReactVisible ? 'react-root-show' : 'react-root-hide'}`} ref={uiRootRef} style={rootStyle}>
            {children}
        </div>
    );
};

export default ReactRoot;

