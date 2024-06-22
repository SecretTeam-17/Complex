import { Minimize2 } from "lucide-react";
import {
    setReactVisible,
    setStuding,
} from "../../../redux/GameConfig/config.slice";
import { useAppDispatch } from "../../../redux/hooks";
import "./WikiScreenHeader.css";

const WikiScreenHeader: React.FC = () => {
    const dispatch = useAppDispatch();

    // Функция обработки нажатия на кнопку
    const handleSettingsClick = () => {
        dispatch(setReactVisible(false));
        dispatch(setStuding(false));
    };

    return (
        <header className="wiki__header">
            <h2 className="wiki__header-title">Обучение</h2>
            <div className="wiki__header-control">
                <Minimize2
                    color="#320064"
                    size={32}
                    onClick={handleSettingsClick}
                />
            </div>
        </header>
    );
};

export default WikiScreenHeader;

