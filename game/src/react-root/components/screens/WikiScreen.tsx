import React from "react";
import "./WikiScreen.css";
import WikiScreenHeader from "./WikiScreenHeader";
import WikiInner from "./WikiInner";

const WikiScreen: React.FC = () => {
    return (
        <>
            <div className="wiki__container">
                <WikiScreenHeader />
                <WikiInner />
            </div>
        </>
    );
};

export default WikiScreen;
