import { useState } from "react";
import WikiCard from "./WikiCard";
import "./WikiInner.css";
import { IWikiCard, wikiObject } from "./wiki.types";

const WikiInner: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<IWikiCard | null>(null);

    if (selectedCard) {
        return (
            <div className="wiki__card-content">
                <WikiCard
                    {...selectedCard}
                    isFullView
                    onBack={() => setSelectedCard(null)}
                />
            </div>
        );
    }

    return (
        <section className="wiki__inner">
            {wikiObject.map((card, idx) => (
                <WikiCard
                    key={`card${idx}`}
                    {...card}
                    onClick={() => setSelectedCard(card)}
                />
            ))}
        </section>
    );
};

export default WikiInner;

