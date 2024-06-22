import { ArrowLeftToLine } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./WikiCard.css";

interface IWikiCard {
    number: string;
    src: string;
    title: string;
    desc: string;
    isFullView?: boolean;
    onClick?: () => void;
    onBack?: () => void;
}

const WikiCard: React.FC<IWikiCard> = ({
    number,
    src,
    title,
    desc,
    isFullView = false,
    onClick,
    onBack,
}) => {
    if (isFullView) {
        return (
            <div className="wiki__card-full-container">
                <div className="back-icon" onClick={onBack}>
                    <ArrowLeftToLine size={48} color="#320064" />
                </div>
                <div className="wiki__card wiki__card-full">
                    <div className="wiki__card-inner">
                        <h1 className="wiki__card-title">{title}</h1>
                        <img
                            className="wiki__card-image"
                            src={src}
                            alt={title}
                        />
                        <div className="wiki__card-desc">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                remarkPlugins={[remarkGfm]}
                            >
                                {desc}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wiki__card" onClick={onClick}>
            <div className="wiki__card-inner">
                <span className="wiki__card-number">{number}</span>
                <img
                    className="wiki__card-image"
                    src={src}
                    alt={title}
                    width={182}
                    height={121}
                />
                <p className="wiki__card-title">{title}</p>
            </div>
            <button className="wiki__card-button" type="button">
                Читать
            </button>
        </div>
    );
};

export default WikiCard;

