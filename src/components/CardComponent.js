import "./CardComponent.css";

export default function CardComponent({
    card,
    handleChoice,
    disabled,
    flipped,
}) {
    const handleClick = () => {
        if (!disabled) handleChoice(card);
    };
    return ( <
        div className = "card" > { " " } <
        div className = { flipped ? "flipped" : "" } >
        <
        img className = "front"
        src = { card.src }
        alt = "front-card" / >
        <
        img className = "back"
        src = "/assets/images/card_cover.png"
        onClick = { handleClick }
        alt = "back-card" /
        >
        <
        /div>{" "} <
        /div>
    );
}