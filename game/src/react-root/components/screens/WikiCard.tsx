import "./WikiCard.css";
import { FunctionComponent, useState } from "react";
import WikiModal from "./WikiModal";

interface IWikiCard {
    number: string;
    src: string;
    title: string;
    desc: string[];
}

const WikiCard: FunctionComponent<IWikiCard> = ({
    number,
    src,
    title,
    desc,
}) => {
    const [modal, setModal] = useState(false);
    const cardDescItems = desc.map((data, idx) => (
        <li className="wiki__modal-item" key={`data${idx}`}>
            {data}
        </li>
    ));
    return (
        <div className="wiki__card">
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
            <button
                className="wiki__card-button"
                type="button"
                onClick={() => setModal(true)}
            >
                читать
            </button>

            <WikiModal open={modal}>
                <h3 className="wiki__modal-title" key={title}>
                    {title}
                </h3>
                <ul>{cardDescItems}</ul>
                <button
                    style={{ marginTop: "15px" }}
                    className="wiki__card-button"
                    onClick={() => setModal(false)}
                >
                    закрыть
                </button>
            </WikiModal>
        </div>
    );
};

export default WikiCard;
