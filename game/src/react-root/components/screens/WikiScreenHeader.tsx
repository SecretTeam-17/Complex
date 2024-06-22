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
                <button
                    type="button"
                    className="wiki__header-button"
                    onClick={handleSettingsClick}
                >
                    <img
                        src="../../../../public/assets/ui/settings-icon-dark.png"
                        width="40"
                        height="40"
                        alt="settings button"
                    />
                </button>
                <button type="button" className="wiki__header-button">
                    <img
                        src="../../../../public/assets/ui/burger-icon-dark.png"
                        width="40"
                        height="40"
                        alt="burger button"
                    />
                </button>
            </div>
        </header>
    );
};

export default WikiScreenHeader;

